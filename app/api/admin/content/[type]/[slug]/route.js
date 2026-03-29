import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from '@/lib/admin/auth'
import { getAdminContentConfig } from '@/lib/admin/content-config'
import { revalidateAdminContent } from '@/lib/admin/revalidate'
import {
  deleteAdminContent,
  getAdminContentEntry,
  saveAdminContent,
} from '@/lib/admin/content-store'

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

  try {
    const item = await getAdminContentEntry(params.type, params.slug)
    return NextResponse.json({ item })
  } catch {
    return NextResponse.json({ error: 'Content item not found.' }, { status: 404 })
  }
}

export async function PUT(request, { params }) {
  const unauthorized = assertSession()
  if (unauthorized) return unauthorized
  if (!getAdminContentConfig(params.type)) {
    return NextResponse.json({ error: 'Unsupported content type.' }, { status: 404 })
  }

  try {
    const payload = await request.json()
    const item = await saveAdminContent(params.type, payload, params.slug)
    revalidateAdminContent(params.type, [params.slug, item.slug])
    return NextResponse.json({ item })
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Unable to update content.' }, { status: 400 })
  }
}

export async function DELETE(_request, { params }) {
  const unauthorized = assertSession()
  if (unauthorized) return unauthorized
  if (!getAdminContentConfig(params.type)) {
    return NextResponse.json({ error: 'Unsupported content type.' }, { status: 404 })
  }

  try {
    await deleteAdminContent(params.type, params.slug)
    revalidateAdminContent(params.type, [params.slug])
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Unable to delete content item.' }, { status: 404 })
  }
}
