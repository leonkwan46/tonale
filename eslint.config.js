// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    rules: {
      // Enforce no semicolons
      'semi': ['error', 'never'],
      // Enforce single quotes
      'quotes': ['error', 'single'],
      // Enforce trailing commas
      'comma-dangle': ['error', 'never'],
      // Warn about any types
      '@typescript-eslint/no-explicit-any': 'warn',
      // Prevent React namespace usage for hooks
      'react/jsx-no-undef': 'error',
      'react/react-in-jsx-scope': 'off',
      // Custom rule to prevent React namespace usage
      'no-restricted-syntax': [
        'error',
        {
          selector: 'MemberExpression[object.name="React"][property.name=/use[A-Z]/]',
          message: 'Import React hooks directly instead of using React.useState, React.useEffect, etc.',
        },
        {
          selector: 'TSTypeReference[typeName.name="React"]',
          message: 'Import React types directly instead of using React.ComponentType, React.ReactElement, etc.',
        },
        {
          selector: 'MemberExpression[object.name="React"][property.name=/^[A-Z]/]',
          message: 'Import React types directly instead of using React.ComponentType, React.ReactElement, etc.',
        },
      ],
    },
  },
])
