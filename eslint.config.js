const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin');
const prettierPlugin = require('eslint-plugin-prettier');
const filenamesPlugin = require('eslint-plugin-filenames');

module.exports = [
  {
    files: ['src/**/*.ts', '*.tsx'],
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      prettier: prettierPlugin,
      filenames: filenamesPlugin,
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'no-public' },
      ],
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/member-delimiter-style': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/camelcase': 'off',
      '@typescript-eslint/ban-types': 'off',
      'prettier/prettier': 'error',
      complexity: ['off', 4],
      eqeqeq: 'error',
      //'filenames/match-regex': ['error', '^[a-zA-Z-\\d\\.]+$', true],
      //'filenames/match-regex': [2, '^[a-z_]+$', true],
      /*'filenames/match-regex': [
        'error',
        { pattern: '^[a-zA-Z-\\d\\.]+$', caseSensitive: true },
      ],*/
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
      'new-cap': 'off',
      'guard-for-in': 'off',
      camelcase: 'off',
    },
  },
];
