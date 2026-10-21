import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // BẮT BUỘC: base: './' để file .exe khi chạy offline đọc được file assets trong thư mục dist
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
