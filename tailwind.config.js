/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      colors: {
        dark: {
          950: '#020408',
          900: '#050d1a',
          800: '#0a1628',
          700: '#0f2040',
          600: '#162952',
          500: '#213547',
          400: '#2d4a6e',
          300: '#3a5d8a',
          200: '#4771a6',
          100: '#5484c3',
          50:  '#6197df',
        },
        light: {
          900: '#f8f8f8',
          800: '#f0f0f0',
          600: '#e0e0e0',
          400: '#b0b0b0',
          300: '#808080',
          200: '#505050',
          100: '#262626',
        },
        border: '#e5e5e5',
        input: '#e5e5e5',
        ring: 'rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'border-beep': 'borderBeep 2s ease-in-out infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        borderBeep: {
          '0%, 100%': { borderColor: 'rgba(0, 0, 0, 0.15)' },
          '50%': { borderColor: 'rgba(0, 0, 0, 0.3)' },
        },
      },
    },
  },
  plugins: [],
}