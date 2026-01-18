module.exports = {
  root: true,
  env: {
    es2022: true,
    browser: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  ignorePatterns: ['dist/', 'node_modules/', '.astro/', 'src/env.d.ts'],
  overrides: [
    {
      files: ['*.js', '*.mjs'],
      parserOptions: {
        sourceType: 'module'
      }
    }
  ]
};
