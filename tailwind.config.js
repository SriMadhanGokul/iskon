/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        saffron: { DEFAULT: '#FF9B33', dark: '#E0620A' },
        maroon: '#4A1A08',
        cream: '#FFF5E6',
        gold: '#FFD27A',
        teal: '#0E7C7B',
        krishna: '#1F5FA8',
      },
      fontFamily: {
        heading: ['Lora', 'Georgia', 'serif'],
        body: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: { soft: '0 2px 12px rgba(74,26,8,0.08)' },
    },
  },
  plugins: [],
};
