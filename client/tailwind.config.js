module.exports = {
  purge: ['./src/**/*.html', './src/**/*.tsx', './src/**/*.jsx'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        '2xs': '.625rem',
        '3xs': '.5rem',
        '4xs': '.375rem',
      },
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
      },
      fontFamily: {
        sans: ["Roboto"],
        mono: ["RobotoMono"]
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
