/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d6ff',
          300: '#a4b8ff',
          400: '#7c91ff',
          500: '#6366f1',
          600: '#5b57d9',
          700: '#4f46b8',
          800: '#423c96',
          900: '#39377a'
        }
      }
    },
  },
  plugins: [],
}

