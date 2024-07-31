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
    dirs: ['types/*.d.ts', 'store/*.ts', 'types/**/*.ts', 'utils/**/*.ts'],
  },
  devtools: { enabled: false },

  modules: [
    '@nuxt/image',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/ui',
    '@sidebase/nuxt-pdf',
    '@nuxtjs/supabase',
  ],

  colorMode: {
    preference: 'dark',
  },

  // eslint: {
  //   config: {
  //     stylistic: true,
  //   },
  // },

  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
  },

  redirectOptions: {
    login: '/login',
    callback: '/confirm',
    include: undefined,
    exclude: [],
    cookieRedirect: false,
  },

  pinia: {
    storesDirs: ['./stores/**'],
  },

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
