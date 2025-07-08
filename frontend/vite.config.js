import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/', // ✅ This tells Vite to load assets from the root (Netlify serves from /)
  plugins: [react(), tailwindcss()],
});
