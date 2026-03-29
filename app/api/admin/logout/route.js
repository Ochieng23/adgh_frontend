import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE, getAdminCookieOptions } from '@/lib/admin/auth'

export async function POST() {
  cookies().set(ADMIN_SESSION_COOKIE, '', { ...getAdminCookieOptions(), maxAge: 0 })
  return NextResponse.json({ ok: true })
}
