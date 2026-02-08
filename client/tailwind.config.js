/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f59e0b', // amber-500
          dark: '#d97706', // amber-600
        },
      },
    },
  },
  plugins: [],
};