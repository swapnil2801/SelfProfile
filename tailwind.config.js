/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        void: {
          950: '#04060d',
          900: '#05070f',
          850: '#080b16',
          800: '#0a0e1a',
          700: '#101527',
          600: '#161d33',
        },
        neon: {
          cyan: '#22d3ee',
          blue: '#38bdf8',
          violet: '#a78bfa',
          magenta: '#e879f9',
          green: '#34d399',
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 24px -6px rgba(34, 211, 238, 0.45)',
        'glow-violet': '0 0 24px -6px rgba(167, 139, 250, 0.45)',
        'glow-soft': '0 0 40px -12px rgba(34, 211, 238, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'orbit-slow': 'spin 28s linear infinite',
        'orbit-slower': 'spin 45s linear infinite reverse',
        'scanline': 'scanline 7s linear infinite',
        'float-dot': 'floatDot 9s ease-in-out infinite',
        'pulse-dot': 'pulseDot 2.2s ease-in-out infinite',
        'ticker': 'ticker 1.2s steps(2) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        floatDot: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.35' },
          '50%': { transform: 'translateY(-18px)', opacity: '0.9' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(52, 211, 153, 0.5)' },
          '50%': { opacity: '0.6', boxShadow: '0 0 0 5px rgba(52, 211, 153, 0)' },
        },
        ticker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
