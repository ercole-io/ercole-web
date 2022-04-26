module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js', // No need to cover bootstrap file
  ],
  verbose: true,
}
