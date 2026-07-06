// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "@typescript-eslint/no-explicit-any": "warn",
    "vue/singleline-html-element-content-newline": "off",
    "vue/html-closing-bracket-newline": "off",
    "@stylistic/spaced-comment": "off",
  },
});
