import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from '@/lib/admin/auth'
import { getAdminContentConfig } from '@/lib/admin/content-config'
import { revalidateAdminContent } from '@/lib/admin/revalidate'
import { listAdminContent, saveAdminContent } from '@/lib/admin/content-store'

function assertSession() {
  const session = verifyAdminSession(cookies().get(ADMIN_SESSION_COOKIE)?.value)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}

export async function GET(_request, { params }) {
  const unauthorized = assertSession()
  if (unauthorized) return unauthorized
  if (!getAdminContentConfig(params.type)) {
    return NextResponse.json({ error: 'Unsupported content type.' }, { status: 404 })
  }

  const items = await listAdminContent(params.type)
  return NextResponse.json({ items })
}

export async function POST(request, { params }) {
  const unauthorized = assertSession()
  if (unauthorized) return unauthorized
  if (!getAdminContentConfig(params.type)) {
    return NextResponse.json({ error: 'Unsupported content type.' }, { status: 404 })
  }

  try {
    const payload = await request.json()
    const item = await saveAdminContent(params.type, payload)
    revalidateAdminContent(params.type, [item.slug])
    return NextResponse.json({ item }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Unable to create content.' }, { status: 400 })
  }
}
