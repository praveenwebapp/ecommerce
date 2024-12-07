import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      'react-router-dom': 'react-router-dom/umd/react-router-dom.min.js',
    },
  },
});
