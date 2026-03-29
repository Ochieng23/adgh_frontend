import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE, isAdminConfigured, verifyAdminSession } from '@/lib/admin/auth'

export async function GET() {
  const session = verifyAdminSession(cookies().get(ADMIN_SESSION_COOKIE)?.value)

  return NextResponse.json({
    configured: isAdminConfigured(),
    authenticated: Boolean(session),
    username: session?.username || null,
  })
}
