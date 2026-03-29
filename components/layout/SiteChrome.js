'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function SiteChrome({ children }) {
  const pathname = usePathname()
  const isAdminRoute = pathname === '/admin' || pathname?.startsWith('/admin/')

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main id="main-content" tabIndex={-1} className="relative">
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </>
  )
}
