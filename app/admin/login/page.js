import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AdminLoginForm from '@/components/admin/AdminLoginForm'
import { ADMIN_SESSION_COOKIE, isAdminConfigured, verifyAdminSession } from '@/lib/admin/auth'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
}

export default function AdminLoginPage({ searchParams }) {
  const session = verifyAdminSession(cookies().get(ADMIN_SESSION_COOKIE)?.value)
  if (session) {
    redirect('/admin')
  }

  const configured = isAdminConfigured()
  const error =
    searchParams?.error === 'invalid'
      ? 'Invalid username or password.'
      : searchParams?.error === 'config'
        ? 'Admin login is not configured.'
        : ''

  return (
    <div className="bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(245,248,246,0.98))] px-4 pt-24 sm:pt-28">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl items-center justify-center pb-10 sm:min-h-[calc(100vh-7rem)] sm:pb-14">
        <div className="w-full max-w-md rounded-[2rem] border border-forest/15 bg-white p-8 shadow-[0_40px_90px_-60px_rgba(14,26,20,0.45)]">
          <p className="text-xs font-sans uppercase tracking-[0.28em] text-gold">Content Admin</p>
          <h1 className="mt-3 font-serif text-3xl text-deep">Sign in</h1>
          <p className="mt-3 text-sm font-sans leading-relaxed text-muted">
            Manage publications, news, events, and media content from a single in-app dashboard.
          </p>

          {!configured && (
            <div className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-sans leading-relaxed text-red-700">
              Admin login is not configured. Set <code>ADMIN_USERNAME</code>, <code>ADMIN_PASSWORD</code>, and <code>ADMIN_SESSION_SECRET</code>.
            </div>
          )}

          <div className="mt-6">
            <AdminLoginForm configured={configured} error={error} />
          </div>
        </div>
      </div>
    </div>
  )
}
