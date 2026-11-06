import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  // Root custom domain (incominganalyst.com) — not a /repo subpath.
  base: '/',
  plugins: [react()],
  test: {
    environment: 'node',
  },
})
