/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          container: '#1E40AF',
        },
        secondary: {
          DEFAULT: '#7C3AED',
          container: '#5B21B6',
        },
        accent: {
          DEFAULT: '#06B6D4',
        },
        surface: {
          DEFAULT: '#0F172A',
        },
        card: {
          DEFAULT: '#1E293B',
        },
        'on-surface': '#F8FAFC',
        'on-surface-variant': '#94A3B8',
        outline: '#334155',
        'surface-container': '#1E293B',
        'surface-container-high': '#334155',
      }
    },
  },
  plugins: [],
}
