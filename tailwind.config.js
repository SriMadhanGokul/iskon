/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#f93', dark: '#b83c00' },
        saffron: { DEFAULT: '#f93', dark: '#b83c00' },
        maroon: '#4A1A08',
        cream: '#FFF8F1',
        gold: '#FFD1A3',
        teal: '#0E7C7B',
      },
      fontFamily: {
        heading: ['Lora', 'Georgia', 'serif'],
        body: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: { soft: '0 2px 12px rgba(74,26,8,0.08)' },
      // Offer-a-diya widget animations, matched to guptvrindavandham.org.
      keyframes: {
        'diya-in': {
          '0%': { opacity: '0', transform: 'translateX(100%) rotate(14deg)', animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' },
          '73.6%': { opacity: '1', transform: 'translateX(-3%) rotate(-3deg)', animationTimingFunction: 'cubic-bezier(0.45, 0, 0.55, 1)' },
          '100%': { opacity: '1', transform: 'translateX(0) rotate(0deg)' },
        },
        'diya-aarti': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
          '25%': { transform: 'translate(-1.6%, -1.8%) rotate(-2deg) scale(1.01)' },
          '50%': { transform: 'translate(0, -3.2%) rotate(0deg) scale(1.02)' },
          '75%': { transform: 'translate(1.2%, -1.6%) rotate(1.5deg) scale(1.01)' },
        },
        'diya-glow': {
          '0%, 100%': { opacity: '0.8' },
          '25%': { opacity: '1' },
          '45%': { opacity: '0.7' },
          '70%': { opacity: '0.95' },
        },
        'mesh-drift': {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '100%': { transform: 'translate(6%, 8%) scale(1.12)' },
        },
        'diya-ember': {
          '0%': { opacity: '0', transform: 'translate(-50%, 0) scale(1)' },
          '12%': { opacity: '1' },
          '50%': { transform: 'translate(calc(-50% + var(--dx) * 0.4), -9cqw) scale(0.8)' },
          '100%': { opacity: '0', transform: 'translate(calc(-50% + var(--dx)), -20cqw) scale(0.2)' },
        },
      },
      animation: {
        'diya-in': 'diya-in 5s ease 0.6s 1 both',
        'diya-aarti': 'diya-aarti 6s ease-in-out infinite',
        'diya-glow': 'diya-glow 3.2s ease-in-out infinite',
        'diya-ember': 'diya-ember 2.8s ease-out infinite both',
        'mesh-drift': 'mesh-drift 28s ease-in-out infinite alternate',
        'mesh-drift-reverse': 'mesh-drift 34s ease-in-out infinite alternate-reverse',
      },
    },
  },
  plugins: [],
};
