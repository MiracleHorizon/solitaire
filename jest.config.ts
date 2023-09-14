import type { Config } from 'jest'

const jestConfig: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts', 'vue'],
  collectCoverage: true,
  resetMocks: false,
  cache: true,
  setupFiles: ['jest-localstorage-mock'],
  setupFilesAfterEnv: ['./src/__setup__/configs/jest.setup.ts'],
  moduleNameMapper: {
    '^__setup__(.*)$': '<rootDir>/src/__setup__$1',
    '^@stores(.*)$': '<rootDir>/src/stores$1',
    '^@shared(.*)$': '<rootDir>/src/shared$1',
    '^@utils(.*)$': '<rootDir>/src/shared/utils$1',
    '^@helpers(.*)$': '<rootDir>/src/shared/helpers$1',
    '^@entities(.*)$': '<rootDir>/src/shared/entities$1',
    '^@app-types(.*)$': '<rootDir>/src/shared/types$1',
    '.+\\.(png|jpg|jpeg|mp3)$': 'identity-obj-proxy'
  }
}

export default jestConfig
