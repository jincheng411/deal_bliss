/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: 'var(--color-navy-50)',
          100: 'var(--color-navy-100)',
          200: 'var(--color-navy-200)',
          300: 'var(--color-navy-300)',
          400: 'var(--color-navy-400)',
          500: 'var(--color-navy-500)',
          600: 'var(--color-navy-600)',
          700: 'var(--color-navy-700)',
          800: 'var(--color-navy-800)',
          900: 'var(--color-navy-900)',
        },
        coral: {
          50: 'var(--color-coral-50)',
          100: 'var(--color-coral-100)',
          200: 'var(--color-coral-200)',
          300: 'var(--color-coral-300)',
          400: 'var(--color-coral-400)',
          500: 'var(--color-coral-500)',
          600: 'var(--color-coral-600)',
          700: 'var(--color-coral-700)',
          800: 'var(--color-coral-800)',
          900: 'var(--color-coral-900)',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': {
            opacity: 0.2,
          },
          '50%': {
            opacity: 0.15,
          },
        },
      },
    },
  },
  plugins: [],
};