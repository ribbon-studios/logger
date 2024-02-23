import type { Config } from 'jest';

const jestConfig: Config = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },

  collectCoverageFrom: ['<rootDir>/src/**/*'],

  /*
   * What is going on with jest where this is necessary to have the collectCoverageFrom config?
   * Relevant Issue: https://github.com/jestjs/jest/issues/9324
   */
  coverageProvider: 'v8',

  modulePaths: ['<rootDir>'],
};

export default jestConfig;
