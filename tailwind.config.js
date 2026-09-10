/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lavender: {
          50: "#F7F5FF",
          100: "#ECE8FF",
          200: "#E5DFFF",
          300: "#DCD4FF",
          400: "#C9BAFF",
          500: "#B096FF",
          dark: "#1A0F35",
          text: "#1D103A",
          muted: "#6B5A94"
        },
        scanLime: {
          DEFAULT: "#BFFF47",
          bright: "#B5FE33",
          hover: "#ACFA1A",
          dark: "#0F2600"
        },
        crtGreen: {
          DEFAULT: "#00FF66",
          bright: "#33FF77",
          glow: "rgba(0, 255, 102, 0.4)",
          dark: "#003A17"
        }
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      maxWidth: {
        'site': '1440px',
      },
      boxShadow: {
        'input-pill': '0 12px 35px -5px rgba(123, 63, 242, 0.18), 0 4px 15px -2px rgba(123, 63, 242, 0.1)',
        'lime-btn': '0 4px 20px rgba(191, 255, 71, 0.4)',
        'crt-glow': '0 0 25px rgba(0, 255, 102, 0.4)',
        'computer-shadow': '0 30px 60px -15px rgba(123, 63, 242, 0.25), 0 15px 30px -10px rgba(29, 16, 58, 0.15)'
      }
    },
  },
  plugins: [],
}
