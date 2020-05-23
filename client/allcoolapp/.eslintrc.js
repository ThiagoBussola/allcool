module.exports = {
  extends: ['prettier', 'react-app'],
  plugins: ['prettier', 'import', 'react-hooks'],
  parser: 'babel-eslint',
  env: {
    jest: true,
  },
  rules: {
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
};
