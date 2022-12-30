/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ink': '#0E0E10',
        'starlight': '#EDEAE0',
      },
      boxShadow: {
        'md': '0 0 15px -5px rgba(255, 255, 255, 1)'
      }
    },
  },
  plugins: [],
}
