module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  setupFilesAfterEnv: ['<rootDir>/setup-test.js'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  moduleNameMapper: {
    '^.+\\.svg$': 'jest-svg-transformer',
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  },
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx,ts,tsx}']
};
