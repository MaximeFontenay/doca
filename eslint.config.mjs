// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'no-console': 'off',
    'vue/first-attribute-linebreak': [
      'error',
      {
        singleline: 'ignore',
        multiline: 'ignore',
      },
    ],
    'vue/multi-word-component-names': 'off',
  },
})
