module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/'],
  testTimeout: 10000, // 10 seconds
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true
}; 