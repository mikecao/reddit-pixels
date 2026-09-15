import { defineConfig } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

export default defineConfig([
  ...nextVitals,
  {
    rules: {
      'react/prop-types': 'off',
      'import/no-anonymous-default-export': 'off',
    },
  },
]);
