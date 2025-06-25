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
          50: '#eff6ff',
          500: '#1A237E',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        gray: {
          50: '#FBFAF9',
          100: '#F8F8F7',
          200: '#E8E8E8',
          400: '#949494',
          800: '#0A0A0A',
        },
        blue: {
          500: '#284CFF',
          600: '#1e3ccc',
        },
        green: {
          50: '#E6F4EA',
          700: '#1B5E20',
        },
        yellow: {
          50: '#FFF8E1',
          600: '#A5B969',
        },
        red: {
          50: '#FFEBEE',
          700: '#9F1414',
        },
        purple: {
          100: '#D4DBFF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '25': '6.25rem',
      }
    },
  },
  plugins: [],
} 