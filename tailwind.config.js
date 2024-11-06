/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      textColor: {
        primary: '#132c6b',
      },
      colors: {},
      gridTemplateColumns: {
        'auto-fill-100': 'repeat(auto-fill, minmax(20rem, 1fr))',
        'auto-fit-100': 'repeat(auto-fit, minmax(20rem, 1fr))',
      },
    },
  },
  plugins: [],
};
