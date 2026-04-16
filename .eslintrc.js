module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'no-console': 'warn',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'semi': ['error', 'never'],
    'quotes': ['error', 'single']
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}