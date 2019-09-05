module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'react/prop-types': 0,
    'prettier/prettier': 2,
    '@typescript-eslint/no-unused-vars': 2
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  }
}
