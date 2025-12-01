/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: '#8b5cf6',
      },
      animation: {
        swing: 'swing .6s infinite ease-in-out alternate',
      },
    },
  },
  plugins: [],
}