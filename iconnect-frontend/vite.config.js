import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode (development or production)
  dotenv.config({ path: `./.env.${mode}` });
  return {
    plugins: [react()],
  };
});
