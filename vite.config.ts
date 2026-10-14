import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import path from 'node:path'

// The SPA is embedded in the easyblobs binary and served by the "system" admin
// adapter, whose mount is /artifacts/system — so the page lives at
// /artifacts/system/ui/ and `base` must match for asset URLs to resolve (the
// data endpoint /artifacts/system/downloads is absolute and same-origin).
//
// This repo is the standalone source. By default it builds into ./dist; set
// OUT_DIR to build straight into the server repo's go:embed directory, e.g.
//   OUT_DIR=../easyblobs/system/ui/dist npm run build
const outDir = process.env.OUT_DIR || 'dist'

export default defineConfig({
  base: '/artifacts/system/ui/',
  plugins: [tailwindcss(), svelte()],
  resolve: { alias: { $lib: path.resolve('./src/lib') } },
  build: {
    outDir,
    emptyOutDir: true,
    target: 'es2022',
  },
})
