module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: {
    enabled: true,
    content: ['./**/*.html', './**/*.css', './**/*.jsx', './**/*.js', './**/*.ts', './**/*.tsx'],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
