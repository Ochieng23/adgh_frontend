/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        deep:        '#0E1A14',
        forest:      '#1B3326',
        sage:        '#2E5E41',
        gold:        '#C9973A',
        'gold-light':'#E8C46A',
        cream:       '#F4EFE4',
        warm:        '#FAF7F2',
        muted:       '#7A8C7F',
        body:        '#3A4A3E',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:  ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body':     theme('colors.body'),
            '--tw-prose-headings': theme('colors.deep'),
            '--tw-prose-links':    theme('colors.gold'),
            '--tw-prose-bold':     theme('colors.deep'),
            fontFamily: '"DM Sans", system-ui, sans-serif',
            h1: { fontFamily: '"Cormorant Garamond", serif' },
            h2: { fontFamily: '"Cormorant Garamond", serif' },
            h3: { fontFamily: '"Cormorant Garamond", serif' },
          },
        },
        invert: {
          css: {
            '--tw-prose-body':     theme('colors.cream'),
            '--tw-prose-headings': theme('colors.cream'),
          },
        },
      }),
      animation: {
        'fade-in':  'fadeIn 0.6s ease-out both',
        'slide-up': 'slideUp 0.6s ease-out both',
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { transform: 'translateY(24px)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
