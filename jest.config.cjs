/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts', 'vue'],
  moduleNameMapper: {
    "^@stores(.*)$": "<rootDir>/src/stores$1",
    "^@shared(.*)$": "<rootDir>/src/shared$1",
    "^@utils(.*)$": "<rootDir>/src/shared/utils$1",
    "^@helpers(.*)$": "<rootDir>/src/shared/helpers$1",
    "^@entities(.*)$": "<rootDir>/src/shared/entities$1",
    "^@app-types(.*)$": "<rootDir>/src/shared/types$1",
  },
  collectCoverage: true
}
