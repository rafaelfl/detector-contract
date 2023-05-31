import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.(js)$': 'babel-jest',
  },
  transformIgnorePatterns: ['./node_modules/'],
  setupFilesAfterEnv: ['./src/setupTests.ts'],
  setupFiles: ['dotenv/config'],
};

export default config;
