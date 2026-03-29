'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { strings } from '@/lib/strings'
import Button from '@/components/ui/Button'
import BrandLogo from '@/components/ui/BrandLogo'

export default function MobileMenu({ isOpen, onClose, navItems, pathname }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] lg:hidden" aria-modal="true" role="dialog" aria-label="Mobile navigation">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-body/20 backdrop-blur-sm dark:bg-deep/80"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="absolute right-0 top-0 bottom-0 flex w-full max-w-sm flex-col border-l border-gold/15 bg-white shadow-2xl dark:bg-forest">
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-gold/15 px-6">
          <Link
            href="/"
            onClick={onClose}
            className="w-[118px] focus-visible:ring-2 focus-visible:ring-gold sm:w-[132px]"
            aria-label="African Democracy & Governance Hub Home"
          >
            <BrandLogo />
          </Link>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-body/70 hover:text-gold focus-visible:ring-2 focus-visible:ring-gold dark:text-cream/70"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-6 px-6" aria-label="Mobile navigation">
          <ul className="space-y-1" role="list">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.children ? (
                  <div>
                    <div className="text-gold/70 text-xs font-sans font-medium tracking-widest uppercase px-2 pt-4 pb-1">
                      {item.label}
                    </div>
                    <ul className="space-y-0.5" role="list">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={onClose}
                            className={cn(
                              'flex items-center gap-2 px-2 py-2.5 rounded-lg text-sm font-sans transition-colors',
                              pathname === child.href
                                ? 'bg-gold/10 font-medium text-gold'
                                : 'text-body/80 hover:bg-warm hover:text-gold dark:text-cream/80 dark:hover:bg-sage/20'
                            )}
                          >
                            <ChevronRight className="w-3 h-3 text-gold/50" aria-hidden="true" />
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center px-2 py-3 rounded-lg text-sm font-sans font-medium transition-colors',
                      pathname === item.href
                        ? 'bg-gold/10 text-gold'
                        : 'text-body/80 hover:bg-warm hover:text-gold dark:text-cream/80 dark:hover:bg-sage/20'
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-gold/15 px-6 py-6">
          <Button href="/get-involved" variant="primary" size="md" className="w-full justify-center">
            {strings.navGetInvolved}
          </Button>
          <p className="text-center text-muted text-xs font-sans mt-4">{strings.tagline}</p>
        </div>
      </div>
    </div>
  )
}
