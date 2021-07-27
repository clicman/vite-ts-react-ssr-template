module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'prettier', '@typescript-eslint', 'import', 'react-hooks'],
  extends: ['plugin:react/recommended', 'plugin:prettier/recommended', 'airbnb-base'],
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'class-methods-use-this': 'off',
    'function-paren-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'object-curly-newline': 'off',
    'max-classes-per-file': 'off',
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [['builtin', 'external'], ['internal'], ['sibling', 'parent', 'index', 'object'], ['type']],
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'max-len': [
      'error',
      120,
      2,
      {
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
        moduleDirectory: ['node_modules', 'src'],
      },
      typescript: {},
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.js', '.ts', '.tsx'],
    },
    react: {
      version: 'detect',
    },
  },
};
