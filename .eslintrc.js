module.exports = {
  extends: ['plugin:react/recommended'],
  rules: {
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true
      }
    ]
  },
  parserOptions: {
    ecmaVersion: 6
  }
}
