module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'quotes': ['error', 'single'],
    'semi': ['off'],
    'no-trailing-spaces': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'linebreak-style': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['dist/', 'node_modules/', 'build/', 'test-results/', 'playwright-report/'],
}