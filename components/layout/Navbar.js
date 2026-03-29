'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { strings } from '@/lib/strings'
import MobileMenu from './MobileMenu'
import Button from '@/components/ui/Button'
import BrandLogo from '@/components/ui/BrandLogo'

const navItems = [
  {
    label: 'Who We Are',
    href: '/who-we-are',
    children: [
      { label: 'About ADGH', href: '/who-we-are' },
      { label: 'Leadership', href: '/who-we-are/leadership' },
      { label: 'Partners', href: '/who-we-are/partners' },
    ],
  },
  {
    label: 'Our Work',
    href: '/our-work',
    children: [
      { label: 'All Programmes', href: '/our-work' },
      { label: 'Democratic Principles', href: '/our-work/democratic-principles' },
      { label: 'Institutional Capacity', href: '/our-work/institutional-capacity' },
      { label: 'Civic Engagement', href: '/our-work/civic-engagement' },
      { label: 'Conflict Prevention', href: '/our-work/conflict-prevention' },
      { label: 'Governance & Accountability', href: '/our-work/governance-accountability' },
      { label: 'Information Exchange', href: '/our-work/information-exchange' },
    ],
  },
  { label: 'Publications', href: '/publications' },
  {
    label: 'News & Events',
    href: '/news',
    children: [
      { label: 'News', href: '/news' },
      { label: 'Events', href: '/events' },
      { label: 'Media', href: '/media' },
    ],
  },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl transition-all duration-300',
          scrolled
            ? 'border-gold/15 bg-white/92 shadow-[0_18px_40px_-26px_rgba(14,26,20,0.35)] dark:border-gold/15 dark:bg-deep/92'
            : 'border-gold/10 bg-white/80 shadow-[0_10px_30px_-24px_rgba(14,26,20,0.25)] dark:border-gold/10 dark:bg-deep/80'
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex flex-shrink-0 items-center overflow-visible rounded-md focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="African Democracy & Governance Hub Home"
            >
              <div className="w-[108px] overflow-visible sm:w-[132px] lg:w-[188px]">
                <BrandLogo priority className="w-[172%] max-w-none sm:w-[176%] lg:w-[182%]" />
              </div>
            </Link>

            {/* Desktop nav */}
            <ul className="hidden lg:flex items-center gap-1" role="list">
              {navItems.map((item) => (
                <li key={item.href} className="relative">
                  {item.children ? (
                    <div
                      onMouseEnter={() => setOpenDropdown(item.href)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <button
                        className={cn(
                          'flex items-center gap-1 px-3 py-2 rounded-md text-sm font-sans font-medium transition-colors focus-visible:ring-2 focus-visible:ring-gold',
                          'text-body hover:text-gold dark:text-cream/80 dark:hover:text-gold',
                          pathname.startsWith(item.href) && 'text-gold'
                        )}
                        aria-expanded={openDropdown === item.href}
                        aria-haspopup="true"
                      >
                        {item.label}
                        <ChevronDown className="w-3 h-3" aria-hidden="true" />
                      </button>
                      {openDropdown === item.href && (
                        <div className="absolute top-full left-0 pt-1 min-w-[220px]">
                          <ul
                            className="overflow-hidden rounded-xl border border-gold/20 bg-white py-2 shadow-xl dark:bg-forest"
                            role="list"
                          >
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className={cn(
                                    'block px-4 py-2.5 text-sm font-sans transition-colors hover:bg-warm dark:hover:bg-sage/30 hover:text-gold',
                                    pathname === child.href ? 'text-gold font-medium' : 'text-body dark:text-cream/80'
                                  )}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'px-3 py-2 rounded-md text-sm font-sans font-medium transition-colors focus-visible:ring-2 focus-visible:ring-gold block',
                        'text-body hover:text-gold dark:text-cream/80 dark:hover:text-gold',
                        pathname === item.href && 'text-gold'
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className={cn(
                    'rounded-full border border-transparent p-2 text-body transition-colors hover:text-gold focus-visible:ring-2 focus-visible:ring-gold dark:text-cream/70'
                  )}
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <Moon className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>
              )}

              {/* Get Involved CTA */}
              <div className="hidden lg:block">
                <Button href="/get-involved" variant="primary" size="sm">
                  {strings.navGetInvolved}
                </Button>
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className={cn(
                  'lg:hidden p-2 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-gold',
                  'text-body hover:text-gold dark:text-cream'
                )}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navItems={navItems}
        pathname={pathname}
      />
    </>
  )
}
