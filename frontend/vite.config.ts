import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import WindiCSS from 'vite-plugin-windicss';

export default defineConfig({
  plugins: [createVuePlugin(), WindiCSS()],
});
