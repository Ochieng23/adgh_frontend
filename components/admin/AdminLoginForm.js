import Button from '@/components/ui/Button'

export default function AdminLoginForm({ configured, error = '' }) {
  return (
    <form action="/api/admin/login" method="post" className="space-y-5" noValidate>
      <div>
        <label htmlFor="admin-username" className="mb-1.5 block text-sm font-sans font-medium text-body">
          Username
        </label>
        <input
          id="admin-username"
          type="text"
          name="username"
          autoComplete="username"
          className="w-full rounded-xl border border-body/15 bg-white px-4 py-3 text-sm font-sans text-body focus:outline-none focus:ring-2 focus:ring-gold"
          placeholder="Admin username"
          disabled={!configured}
        />
      </div>

      <div>
        <label htmlFor="admin-password" className="mb-1.5 block text-sm font-sans font-medium text-body">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          name="password"
          autoComplete="current-password"
          className="w-full rounded-xl border border-body/15 bg-white px-4 py-3 text-sm font-sans text-body focus:outline-none focus:ring-2 focus:ring-gold"
          placeholder="Password"
          disabled={!configured}
        />
      </div>

      {error && <p className="text-sm font-sans text-red-600">{error}</p>}

      <Button type="submit" variant="primary" size="lg" className="w-full justify-center" disabled={!configured}>
        Sign in
      </Button>
    </form>
  )
}
