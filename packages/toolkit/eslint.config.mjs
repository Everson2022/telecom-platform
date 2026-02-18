// @ts-check
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist/'] },

  // Base: parser + recommended rules para todos os .ts
  ...tseslint.configs.recommended,

  // src/ (exceto spec) — regras com type-info
  {
    files: ['src/**/*.ts'],
    ignores: ['src/**/*.spec.ts', 'src/**/*.test.ts'],
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

  // spec files em src/ — sem type-info (excluidos do tsconfig), any permitido em mocks
  {
    files: ['src/**/*.spec.ts', 'src/**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
);
