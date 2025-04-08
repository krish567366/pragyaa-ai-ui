/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        particle1: {
          '0%': { transform: 'translate(-50%, 0) scale(0.2)', opacity: '0.3' },
          '100%': { transform: 'translate(-50%, 80px) scale(1)', opacity: '0' },
        },
        particle2: {
          '0%': { transform: 'translate(0, 0) scale(0.2)', opacity: '0.3' },
          '100%': { transform: 'translate(-15px, 70px) scale(1)', opacity: '0' },
        },
        particle3: {
          '0%': { transform: 'translate(0, 0) scale(0.2)', opacity: '0.3' },
          '100%': { transform: 'translate(15px, 70px) scale(1)', opacity: '0' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'particle-1': 'particle1 2s ease-in infinite',
        'particle-2': 'particle2 2.2s ease-in infinite',
        'particle-3': 'particle3 1.8s ease-in infinite',
      },
      boxShadow: {
        'glow': '0 0 8px 2px rgba(255, 255, 255, 0.7)',
      },
    },
  },
  plugins: [],
} 