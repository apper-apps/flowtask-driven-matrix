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
          DEFAULT: '#6366F1',
          50: '#F0F2FF',
          100: '#E4E7FF',
          500: '#6366F1',
          600: '#5B5EF0',
          700: '#4F52D9'
        },
        secondary: {
          DEFAULT: '#8B5CF6',
          50: '#F4F0FF',
          100: '#E9DFFF',
          500: '#8B5CF6',
          600: '#7C4DEF',
          700: '#6D3EE8'
        },
        accent: {
          DEFAULT: '#EC4899',
          50: '#FDF2F8',
          100: '#FCE7F3',
          500: '#EC4899',
          600: '#E7308C',
          700: '#E21880'
        },
        surface: '#F8FAFC',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444'
      },
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'sans-serif'],
        'body': ['Inter', 'sans-serif']
      },
      animation: {
        'pulse-soft': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-soft': 'bounce 0.5s ease-out',
        'scale-up': 'scale-up 0.2s ease-out forwards',
        'celebration': 'celebration 0.6s ease-out forwards'
      },
      keyframes: {
        'scale-up': {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1.05)' }
        },
        'celebration': {
          '0%': { 
            transform: 'scale(1) rotate(0deg)',
            opacity: '1'
          },
          '50%': { 
            transform: 'scale(1.2) rotate(180deg)',
            opacity: '0.8'
          },
          '100%': { 
            transform: 'scale(0.8) rotate(360deg)',
            opacity: '0'
          }
        }
      }
    },
  },
  plugins: [],
}