import { defineConfig, presetUno } from 'unocss'
import presetWebFonts from '@unocss/preset-web-fonts'
import presetIcons from '@unocss/preset-icons'

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Open Sans',
      },
    }),
    presetIcons(),
  ],
  preflights: [
    {
      getCSS: () => `
        .border {
            border-color: rgba(0,0,0,0.25); 
          }
      `,
    },
  ],
})
