import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AdminDashboard from '@/components/admin/AdminDashboard'
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from '@/lib/admin/auth'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Admin Dashboard',
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  const session = verifyAdminSession(cookies().get(ADMIN_SESSION_COOKIE)?.value)
  if (!session) {
    redirect('/admin/login')
  }

  return <AdminDashboard username={session.username} />
}
