const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, './'),
  testEnvironment: 'node',
  coverageDirectory: './coverage',
  collectCoverage: true,
  collectCoverageFrom: ['**/models/*.js', '**/services/*.js', '**/schema/**/*.js'],
};
