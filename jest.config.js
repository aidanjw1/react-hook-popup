module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: 'test',
  setupFiles: [
    '<rootDir>/setupTests.ts',
  ],
  moduleNameMapper: {
    "\\.css$": "<rootDir>/__mocks__/styleMock.ts"
  },
};