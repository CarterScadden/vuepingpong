module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': [2, "always"],
    "@typescript-eslint/ban-ts-ignore": "off",
    "comma-dangle": ["error", {
      "arrays": "never",
      "objects": "always",
      "imports": "never",
      "exports": "never",
      "functions": "never"
    }],
    "padded-blocks": [2, "never"],
    "no-trailing-spaces": [0, "never"],
    "@typescript-eslint/no-empty-interface": [0, "always"],
    "space-before-function-paren": [2, "never"],
  }
}
