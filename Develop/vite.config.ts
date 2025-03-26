import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './environment',
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173, // Default Vite port, change if needed
  },
  preview: {
    host: "0.0.0.0",
    port: 4173, // Default preview port
    allowedHosts: ["candidate-search-app-lr96.onrender.com"],
  },
});
