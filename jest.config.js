module.exports = {
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}'], // Adjust this to match your source files
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'text', 'lcov'], // Adjust as needed
  coveragePathIgnorePatterns: [
    '/node_modules/', // Ignore node_modules directory
    '/src/server.js' // Ignore specific file
  ],
};
