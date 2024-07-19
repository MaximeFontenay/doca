import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './src/**/*.{vue,ts,tsx}',
    './pages/**/*.vue',
    './components/**/*.vue',
    './layouts/**/*.vue',
    './plugins/**/*.ts',
    './nuxt.config.ts',
  ],
  theme: {
    extend: {
      colors: {
        light: '#E6E6E6',
        dark: {
          DEFAULT: '#1D1D1D',
          100: '#2C2C2C',
          200: '#212121',
          300: '#808080',
        },
        custom: {
          50: '#eef0ff',
          100: '#e0e3ff',
          200: '#c7ccfe',
          300: '#a5adfc',
          400: '#818cf8',
          500: '#6370f1',
          600: '#4655e5',
          700: '#3845ca',
          800: '#303ba3',
          900: '#2e3681',
          950: '#1b1f4b',
        },
        green: {
          50: '#EFFDF5',
          100: '#D9FBE8',
          200: '#B3F5D1',
          300: '#75EDAE',
          400: '#00DC82',
          500: '#00C16A',
          600: '#00A155',
          700: '#007F45',
          800: '#016538',
          900: '#0A5331',
          950: '#052e16',
        },
        orange: {
          50: '#fff5ed',
          100: '#ffe8d5',
          200: '#fed0aa',
          300: '#fdb274',
          400: '#fb923c',
          500: '#f97c16',
          600: '#ea700c',
          700: '#c25e0c',
          800: '#9a4f12',
          900: '#7c4212',
          950: '#432207',
        },
      },
      opacity: {
        1: '.01',
      },
      fontSize: {
        xxxs: ['0.6rem', '0.65rem'],
        xxs: ['0.75rem', '0.85rem'],
      },
      fontFamily: {
        satoshi: ['satoshi', 'system-ui', 'sans-serif'],
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
}
