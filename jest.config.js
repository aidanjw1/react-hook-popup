module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: 'test',
  setupFiles: [
    '<rootDir>/setupTests.ts',
  ],
};