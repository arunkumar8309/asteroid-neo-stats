/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'focus-ring': '0 0 0 2px rgba(59, 130, 246, 0.5)', // Custom focus ring
      },
      outline: {
        none: 'none', // Custom outline utility
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.outline-none': {
          outline: 'none',
        },
      }, ['responsive', 'hover']);
    },
  ],
}
