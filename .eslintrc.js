module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-param-reassign': ['off'],
    'no-plusplus': ['off'],
    'max-len': ['off'],
    'object-curly-newline': ['off'],
    radix: ['off'],
    'sort-imports': ['error', {
      allowSeparatedGroups: true,
    }],
    'import/extensions': ['error', 'never'],
    'arrow-body-style': ['off'],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
    {
      files: ['*.vue'],
      rules: {
        'vue/no-mutating-props': 'off',
        'vue/max-attributes-per-line': ['off'],
        'vue/max-len': ['error', {
          code: 120,
          template: 150,
        }],
        'vue/html-self-closing': [
          'error',
          {
            html: {
              void: 'always',
            },
          },
        ],
      },
    },
  ],
};
