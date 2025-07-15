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
          DEFAULT: '#155BC8',
          hover: '#1247A3',
        },
        accent: {
          DEFAULT: '#293241',
        },
        base: {
          white: '#FFFFFF',
          black: '#000000',
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 