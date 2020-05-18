/** @format */

module.exports = {
  extends: ['plugin:react/recommended'],
  rules: {
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'eol-last': ['error', 'always'],
  },
  parserOptions: {
    ecmaVersion: 6,
  },
}
