/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{tsx,ts,jsx,js}',
    './components/**/*.{tsx,ts,jsx,js}',
  ],
  plugins: [require('@tailwindcss/typography')],
}
