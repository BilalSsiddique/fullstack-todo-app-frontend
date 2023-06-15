import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const port = process.env.PORT || 3001;
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: port,
  },
  plugins: [react()],
});
