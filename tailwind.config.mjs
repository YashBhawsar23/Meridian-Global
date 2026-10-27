/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f5ff',
          100: '#e0ebfe',
          200: '#c2d8fd',
          300: '#94bdfb',
          400: '#5e9bf7',
          500: '#3477ef',
          600: '#214995', // Horizon Exim Signature Royal Navy Blue (#214995)
          700: '#1b3d7d',
          800: '#163165',
          900: '#11254e',
          950: '#0a1631', // Deep Dark Navy
        },
        trade: {
          gold: '#f59e0b',
          amber: '#d97706',
          emerald: '#059669',
          green: '#10b981',
          crimson: '#dc2626',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'Noto Sans Devanagari', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
