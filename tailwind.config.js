/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          darkest: "#05030D",
          deep: "#090616",
          violet: "#110724",
          card: "rgba(13, 8, 26, 0.65)",
        },
        brand: {
          violetDeep: "#261046",
          purpleDark: "#391464",
          purple: "#7B3FF2",
          purpleBright: "#A95CFF",
          purpleLight: "#C778FF",
          greenNeon: "#00F58A",
          greenMint: "#32F5A6",
          greenLight: "#73FFC1",
          greenHighlight: "#8AFFB7",
        }
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      maxWidth: {
        'site': '1520px',
      },
      boxShadow: {
        'neon-green': '0 0 35px -5px rgba(0, 245, 138, 0.5), 0 0 15px -2px rgba(0, 245, 138, 0.3)',
        'neon-purple': '0 0 35px -5px rgba(123, 63, 242, 0.5), 0 0 15px -2px rgba(123, 63, 242, 0.3)',
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%': { opacity: '0.4' },
          '100%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
}
