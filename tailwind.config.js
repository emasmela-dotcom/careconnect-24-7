/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        senior: {
          // Soft blues - calming, trustworthy, familiar
          blue: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6', // Primary button color - WCAG AA compliant
            600: '#2563eb', // Hover state
            700: '#1e40af', // Active/pressed state
            800: '#1e3a8a', // Dark blue for text/headings
            900: '#1e3a5f', // Darkest blue for headings
          },
          // Muted greens - calming, health-related
          green: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#22c55e', // Primary green - WCAG AA compliant
            600: '#16a34a',
            700: '#15803d',
            800: '#166534',
            900: '#14532d',
          },
          // Warm grays - familiar, calming, high contrast
          gray: {
            50: '#f9fafb', // Lightest - for subtle backgrounds
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db', // Borders, dividers
            400: '#9ca3af', // Muted borders
            500: '#6b7280', // Secondary text
            600: '#4b5563', // Body text alternative
            700: '#374151', // Dark text
            800: '#1f2937', // Very dark text
            900: '#111827', // Darkest - headings
          },
          // Off-white backgrounds - familiar, easy on aging eyes
          offwhite: {
            50: '#fefefe', // Pure off-white - main background
            100: '#fafafa',
            200: '#f5f5f5',
            300: '#f0f0f0',
          },
        },
      },
      fontSize: {
        'base': '1.125rem', // 18px
        'lg': '1.25rem', // 20px
        'xl': '1.5rem', // 24px
        '2xl': '2rem', // 32px
        '3xl': '2.5rem', // 40px
        '4xl': '3rem', // 48px
        '5xl': '3.5rem', // 56px
      },
      spacing: {
        '18': '4.5rem', // 72px
        '22': '5.5rem', // 88px
      },
      minHeight: {
        'touch': '3.5rem', // 56px - minimum touch target
      },
      minWidth: {
        'touch': '3.5rem', // 56px - minimum touch target
      },
    },
  },
  plugins: [],
}

