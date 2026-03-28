import Link from 'next/link'
import { cn } from '@/lib/utils'

const variants = {
  primary: 'bg-gold text-deep hover:bg-gold-light font-medium shadow-sm',
  secondary: 'bg-forest text-cream hover:bg-sage font-medium',
  ghost: 'bg-transparent text-gold hover:bg-gold/10 border border-transparent hover:border-gold/30',
  outline: 'bg-transparent border border-gold text-gold hover:bg-gold hover:text-deep',
}

const sizes = {
  sm:  'px-4 py-2 text-sm',
  md:  'px-6 py-2.5 text-sm',
  lg:  'px-8 py-3.5 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  children,
  className,
  disabled = false,
  loading = false,
  type = 'button',
  ...props
}) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-full font-sans transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variants[variant],
    sizes[size],
    className
  )

  const content = loading ? (
    <>
      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      Loading…
    </>
  ) : children

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      {...props}
    >
      {content}
    </button>
  )
}
