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

