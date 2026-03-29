import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import {
  ADMIN_SESSION_COOKIE,
  createAdminSession,
  getAdminCookieOptions,
  isAdminConfigured,
  validateAdminCredentials,
} from '@/lib/admin/auth'

async function parseCredentials(request) {
  const contentType = request.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    const payload = await request.json()
    return {
      mode: 'json',
      username: String(payload?.username || ''),
      password: String(payload?.password || ''),
    }
  }

  const formData = await request.formData()
  return {
    mode: 'form',
    username: String(formData.get('username') || ''),
    password: String(formData.get('password') || ''),
  }
}

export async function POST(request) {
  const { mode, username, password } = await parseCredentials(request)

  if (!isAdminConfigured()) {
    if (mode === 'form') {
      return NextResponse.redirect(new URL('/admin/login?error=config', request.url), { status: 303 })
    }

    return NextResponse.json({
      error: 'Admin authentication is not configured. Set ADMIN_USERNAME, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET.',
    }, { status: 503 })
  }

  if (!validateAdminCredentials(String(username), String(password))) {
    if (mode === 'form') {
      return NextResponse.redirect(new URL('/admin/login?error=invalid', request.url), { status: 303 })
    }

    return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 })
  }

  cookies().set(ADMIN_SESSION_COOKIE, createAdminSession(String(username)), getAdminCookieOptions())

  if (mode === 'form') {
    return NextResponse.redirect(new URL('/admin', request.url), { status: 303 })
  }

  return NextResponse.json({ ok: true })
}
