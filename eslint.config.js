import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // Esta regla es OBLIGATORIA por la rúbrica del Sprint 2
      '@typescript-eslint/no-explicit-any': 'error',
    },
  }
);