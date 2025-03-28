import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import { adex } from 'adex'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: { alias: { '@': resolve(__dirname, './src') } },
  plugins: [tailwindcss(), adex({ islands: false }), preact()],
})
