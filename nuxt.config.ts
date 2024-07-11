// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-10',

  app: {
    head: {
      title: 'Dashuxt',
      charset: 'utf-8',
      htmlAttrs: { lang: 'fr', class: 'custom-scrollbar' },
      bodyAttrs: {
        class: 'bg-dark text-secondary font-satoshi min-h-svh overflow-x-clip',
      },
      viewport: 'width=device-width, initial-scale=1, user-scalable=no',
      meta: [
        { name: 'description', content: 'Dashuxt, your unique dashboard.' },
      ],
    },
  },
  css: ['@/assets/styles/main.scss'],

  imports: {
    dirs: ['types/*.d.ts', 'store/*.ts', 'types/**/*.ts'],
  },
  devtools: { enabled: true },

  modules: [
    '@nuxt/image',
    '@nuxt/eslint',
    // '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/ui',
  ],
  colorMode: {
    preference: 'dark',
  },
  // eslint: {
  //   config: {
  //     stylistic: true,
  //   },
  // },
  image: {
    quality: 100,
    format: ['webp', 'png', 'jpg', 'jpeg'],
    densities: [1, 2],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      xxxl: 1800,
    },
  },
})
