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
          DEFAULT: '#a855f7', // Soft Purple
          light: '#c084fc',
          dark: '#7e22ce',
        },
        secondary: {
          DEFAULT: '#3b82f6', // Soft Blue
          light: '#60a5fa',
          dark: '#1d4ed8',
        },
        darkbg: {
          DEFAULT: '#030014', // Deep Black / Navy
          light: '#0b072c',
          card: 'rgba(3, 0, 20, 0.5)',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 6s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'glow-pulse': 'glow 3s ease-in-out infinite',
        'spin-slow': 'spin 15s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-12px) scale(1.02)' },
        },
        glow: {
          '0%, 100%': { opacity: 0.6, filter: 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.3))' },
          '50%': { opacity: 1, filter: 'drop-shadow(0 0 25px rgba(59, 130, 246, 0.5))' },
        }
      }
    },
  },
  plugins: [],
}
