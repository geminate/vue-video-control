module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
  },
  extends: [
    'plugin:vue/essential',
    'standard',
  ],
  plugins: [
    'html',
    'vue',
  ],
  rules: {
    'no-async-promise-executor': 'off',
    'one-var': 'off',
    'prefer-promise-reject-errors': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'generator-star-spacing': 'off',
    'no-return-await': 'off',
    'vue/script-indent': ['error', 2, {
      'baseIndent': 1,
      'switchCase': 0,
      'ignores': []
    }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  overrides: [
    {
      'files': ['*.vue'],
      'rules': {
        'indent': 'off',
      }
    }
  ],
}
