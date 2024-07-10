import type { Config } from 'tailwindcss'

export default {
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
        primary: '#5DBE74',
        secondary: '#E6E6E6',
        light: '#E6E6E6',
        dark: {
          DEFAULT: '#1D1D1D',
          100: '#2C2C2C',
          200: '#212121',
        },
        green: '#00E39D',
        red: '#DB785E',
        yellow: '#E3D45A',
        orange: '#FF5722',
        purple: '#A798E8',
        grey: '#818181',
        blue: '#3377FE',
      },
      opacity: {
        '1': '.01',
      },
      fontSize: {
        xxxs: '9px',
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
} satisfies Config
