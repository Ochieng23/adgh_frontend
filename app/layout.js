import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
  preload: true,
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
})

export const metadata = {
  title: {
    default: 'ADGH — African Democracy and Governance Hub',
    template: '%s | ADGH',
  },
  description:
    'Empowering citizens, strengthening democratic institutions, and promoting accountability through evidence-based advocacy across Africa.',
  keywords: [
    'African democracy',
    'governance',
    'rule of law',
    'ACDEG',
    'AU Agenda 2063',
    'civic engagement',
    'accountability Africa',
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://adgh.org'),
  openGraph: {
    title: 'ADGH — African Democracy and Governance Hub',
    description:
      'Empowering citizens, strengthening democratic institutions, and promoting accountability through evidence-based advocacy across Africa.',
    url: '/',
    siteName: 'African Democracy and Governance Hub',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'ADGH — African Democracy and Governance Hub' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ADGH — African Democracy and Governance Hub',
    description: 'Empowering democratic governance across Africa.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
  icons: { icon: '/brand/ADGH_favicon.ico' },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${cormorant.variable} ${dmSans.variable}`}
    >
      <body className="bg-white font-sans antialiased text-body">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {/* Skip to content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-gold focus:text-deep focus:rounded-full focus:font-sans focus:text-sm focus:font-medium"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" tabIndex={-1} className="relative">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
