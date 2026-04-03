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
        neon: {
          blue: '#00d4ff',
          purple: '#b829ff',
          cyan: '#00fff7',
          pink: '#ff2d9f',
          green: '#00ff88',
        },
        dark: {
          950: '#020408',
          900: '#050d1a',
          800: '#0a1628',
          700: '#0f2040',
          600: '#162952',
        },
      },
      animation: {
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'orbit': 'orbit 12s linear infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { textShadow: '0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 40px #00d4ff' },
          '50%': { textShadow: '0 0 20px #b829ff, 0 0 40px #b829ff, 0 0 80px #b829ff' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
