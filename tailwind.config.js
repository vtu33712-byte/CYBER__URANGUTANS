/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          emerald: '#10b981',
          emeraldLight: '#34d399',
          emeraldDark: '#047857',
          mint: '#6ee7b7',
          jade: '#059669',
          forest: '#064e3b',
          cyan: '#06b6d4',
          cyanLight: '#22d3ee',
          cyanDark: '#0891b2',
          turquoise: '#14b8a6',
          turquoiseLight: '#2dd4bf',
          lime: '#84cc16',
          limeLight: '#a3e635',
          navy: '#052216',
          navyDark: '#02130b',
          navyLight: '#093623',
          purple: '#10b981',
          purpleLight: '#34d399',
          purpleSoft: '#6ee7b7',
          glass: 'rgba(5, 34, 22, 0.75)',
          glassBorder: 'rgba(52, 211, 153, 0.25)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Orbitron', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'neon-emerald': '0 0 25px -2px rgba(16, 185, 129, 0.6), 0 0 10px -1px rgba(52, 211, 153, 0.4)',
        'neon-cyan': '0 0 25px -2px rgba(52, 211, 153, 0.6), 0 0 10px -1px rgba(16, 185, 129, 0.4)',
        'neon-purple': '0 0 25px -2px rgba(16, 185, 129, 0.5), 0 0 8px -2px rgba(52, 211, 153, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'glass-glow': '0 8px 32px 0 rgba(16, 185, 129, 0.25), inset 0 0 16px 0 rgba(52, 211, 153, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        'scanline': 'scanline 3s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(6,182,212,0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 25px rgba(16,185,129,0.8))' },
        }
      }
    },
  },
  plugins: [],
}
