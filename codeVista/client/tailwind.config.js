/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/features/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out',
      },
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          container: '#312e81',
        },
        'on-primary': '#ffffff',
        secondary: {
          DEFAULT: '#2dd4bf',
        },
        tertiary: {
          DEFAULT: '#34d399',
          container: '#064e3b',
        },
        'on-tertiary-container': '#d1fae5',
        error: {
          DEFAULT: '#f87171',
        },
        'on-surface-variant': '#94a3b8',
        'on-surface': '#f1f5f9',
        surface: '#070b13',
        'on-primary-container': '#e0e7ff',
        'inverse-primary': '#818cf8',
        card: '#0b0f19',
        outline: '#64748b',
        'surface-container': '#0e1422',
        'surface-container-low': '#0a0e18',
        'surface-container-lowest': '#060910',
        'surface-container-high': '#111625',
        background: {
          DEFAULT: '#070b13',
          card: '#0b0f19',
          sidebar: '#0b0f19',
        },
        accent: {
          purple: '#6366f1',
          teal: '#2dd4bf',
          indigo: '#4f46e5',
        }
      }
    },
  },
  plugins: [],
}