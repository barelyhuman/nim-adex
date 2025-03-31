import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import { adex } from 'adex'
import { providers } from 'adex/fonts'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: { alias: { '@': resolve(__dirname, './src') } },
  plugins: [
    tailwindcss(),
    adex({
      islands: false,
      fonts: {
        providers: [providers.bunny],
        families: [
          {
            name: 'Inter',
            styles: ['normal', 'italic', 'oblique'],
            weights: ['variable', 'tight'],
          },
        ],
      },
    }),
    preact(),
  ],
})
