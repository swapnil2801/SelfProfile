/** @type {import('tailwindcss').Config} */

// ============================================================
// Cinematic signal theme — premium black/white editorial
// with a single electric-lime "signal" accent.
//
// NOTE: the legacy token names (void.*, neon.*) are kept but
// remapped to the new palette so every existing component
// class renders in the new aesthetic without churn.
// ============================================================

const ink = {
  50: '#f6f6f3',
  100: '#efefea',
  200: '#e2e2dc',
  300: '#c6c6bf',
  400: '#a0a099',
  500: '#78786f',
  600: '#54544d',
  700: '#3a3a35',
  800: '#232320',
  900: '#141412',
}

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Near-black paper
        void: {
          950: '#030303',
          900: '#060606',
          850: '#0a0a09',
          800: '#0e0e0d',
          700: '#151514',
          600: '#1d1d1b',
        },
        // Signal accent — electric lime (all legacy accent names collapse
        // into the monochrome + lime system)
        neon: {
          cyan: '#ccff00',
          blue: '#e0ff5c',
          violet: '#f6f6f3',
          magenta: '#ccff00',
          green: '#ccff00',
        },
        signal: {
          DEFAULT: '#ccff00',
          soft: '#e0ff5c',
          faint: '#a8d40a',
        },
        // Neutral editorial greys (override tailwind's blue-tinted slate)
        slate: ink,
        // Legacy `cyan-*` utilities map into the lime signal tints
        cyan: {
          100: '#f4ffd6',
          200: '#eaffad',
          300: '#e0ff5c',
          400: '#ccff00',
          500: '#a8d40a',
        },
        // Code-string green in terminal mocks becomes lime tint
        emerald: {
          300: '#e0ff5c',
          400: '#ccff00',
          500: '#a8d40a',
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 24px -8px rgba(204, 255, 0, 0.4)',
        'glow-violet': '0 0 24px -10px rgba(246, 246, 243, 0.25)',
        'glow-soft': '0 0 40px -14px rgba(204, 255, 0, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'orbit-slow': 'spin 28s linear infinite',
        'orbit-slower': 'spin 45s linear infinite reverse',
        'scanline': 'scanline 9s linear infinite',
        'float-dot': 'floatDot 9s ease-in-out infinite',
        'pulse-dot': 'pulseDot 2.2s ease-in-out infinite',
        'ticker': 'ticker 1.2s steps(2) infinite',
        'signal-sweep': 'signalSweep 5.5s ease-in-out infinite',
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
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(204, 255, 0, 0.4)' },
          '50%': { opacity: '0.6', boxShadow: '0 0 0 5px rgba(204, 255, 0, 0)' },
        },
        ticker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        signalSweep: {
          '0%': { transform: 'translateX(-100%)' },
          '55%, 100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
