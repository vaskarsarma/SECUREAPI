module.exports = {
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'text', 'lcov'],
  coveragePathIgnorePatterns: [
    '/node_modules/', // Ignore node_modules directory
    '/src/server.js', // Ignore specific file
    '/src/swaggerConfig.js'
  ],
};
