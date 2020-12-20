module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: '__test__',
  setupFiles: [
    '<rootDir>/setupTests.ts',
  ],
  moduleNameMapper: {
    "\\.css$": "<rootDir>/__mocks__/styleMock.ts"
  },
};