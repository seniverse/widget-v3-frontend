module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: ['standard', 'standard-react', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    AMap: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['babel', 'react', 'standard', 'prettier'],
  rules: {
    'prettier/prettier': 'error'
  },
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        'prettier/prettier': 'error'
      }
    }
  ]
}
