import 'server-only'

import crypto from 'crypto'

export const ADMIN_SESSION_COOKIE = 'adgh_admin_session'
const SESSION_TTL_SECONDS = 60 * 60 * 12

function getAdminConfig() {
  const username = process.env.ADMIN_USERNAME || ''
  const password = process.env.ADMIN_PASSWORD || ''
  const secret = process.env.ADMIN_SESSION_SECRET || ''

  return {
    username,
    password,
    secret,
    configured: Boolean(username && password && secret),
  }
}

function safeCompare(a, b) {
  const aBuffer = Buffer.from(a)
  const bBuffer = Buffer.from(b)
  if (aBuffer.length !== bBuffer.length) return false
  return crypto.timingSafeEqual(aBuffer, bBuffer)
}

function sign(value, secret) {
  return crypto.createHmac('sha256', secret).update(value).digest('hex')
}

export function isAdminConfigured() {
  return getAdminConfig().configured
}

export function validateAdminCredentials(username, password) {
  const config = getAdminConfig()
  if (!config.configured) return false
  return safeCompare(String(username).trim(), config.username.trim()) && safeCompare(String(password), config.password)
}

export function createAdminSession(username) {
  const { secret } = getAdminConfig()
  const payload = {
    username,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  }
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = sign(encoded, secret)
  return `${encoded}.${signature}`
}

export function verifyAdminSession(token) {
  if (!token) return null

  const { secret, configured } = getAdminConfig()
  if (!configured) return null

  const [encoded, signature] = token.split('.')
  if (!encoded || !signature) return null
  if (!safeCompare(signature, sign(encoded, secret))) return null

  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8'))
    if (!payload?.username || !payload?.exp) return null
    if (payload.exp < Math.floor(Date.now() / 1000)) return null
    return payload
  } catch {
    return null
  }
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  }
}
