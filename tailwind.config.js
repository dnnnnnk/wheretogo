export default {/** @type {import('tailwindcss').Config} */
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#64748b',  // slate-500
        accent: '#4f6a39',   // blue-400
        surface: '#f9fafb',  // gray-50
        muted: '#e5e7eb',    // gray-200
        text: '#1f2937',     // gray-800
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        dots: "radial-gradient(circle, theme('colors.muted') 1px, transparent 1px)",
      },
      backgroundSize: {
        dots: '20px 20px',
      },
    },
  },
  plugins: [],
};
