// @ts-check
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist/', 'generated/'] },

  // Base: parser + recommended rules para todos os .ts
  ...tseslint.configs.recommended,

  // src/ — regras com type-info (no-floating-promises, require-await, etc.)
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: false },
      ],
      '@typescript-eslint/require-await': 'error',
    },
  },

  // test/ — sem type-info (excluido do tsconfig), any permitido em mocks
  {
    files: ['test/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
);
