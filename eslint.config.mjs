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
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 4,
        },
        multiline: {
          max: 1,
        },
      },
    ],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-indent': [
      'error',
      // @ts-ignore
      type,
      {
        attribute: 2,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
      },
    ],
  },
})
