import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as dotenv from 'dotenv';

export default ({ mode }) => {
  // access config with process.env.{configName}
  dotenv.config({ path: `./.env.${mode}` });

  // https://vitejs.dev/config/
  return defineConfig({
    plugins: [react()],
    // proxy settings
    server: {
      proxy: {
        '/api/todos': {
          target: 'http://localhost:5500',
          changeOrigin: true,
          secure: false,
        },
        '/api/users': {
          target: 'http://localhost:5500',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  });
};
