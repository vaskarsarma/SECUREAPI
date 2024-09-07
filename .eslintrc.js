module.exports = {
    env: {
      node: true,
      es6: true,
      jest: true
    },
    extends: [
      'eslint:recommended',
      'plugin:node/recommended',
      'plugin:prettier/recommended',
    ],
    parserOptions: {
      ecmaVersion: 2020
    },
    rules: {
    // Customize ESLint rules here
    'indent': ['error', 2], // Enforce 2-space indentation
    'linebreak-style': ['error', 'unix'], // Enforce Unix linebreaks
    'semi': ['error', 'always'], // Enforce semicolons
    //'no-console': 'warn', // Warn on console statements
    'no-unused-vars': 'warn'
    }
  };
  