/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        lavender: {
          bg: '#d7cbf5',
          light: '#e2d9f7',
        },
        limebtn: {
          DEFAULT: '#bdf567',
          hover: '#aeef4b',
        }
      }
    },
  },
  plugins: [],
}
