module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@types$': '<rootDir>/types',
    '^@leonkwan46/music-notation$': '<rootDir>/tests/unit/__mocks__/music-notation.ts',
    '^expo-crypto$': '<rootDir>/tests/unit/__mocks__/expo-crypto.ts',
  },
  collectCoverageFrom: [
    'src/theory/exercises/**/*.ts',
    '!src/theory/exercises/**/*.d.ts',
    '!src/theory/exercises/**/index.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: {
        jsx: 'react',
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
      },
    }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
}

