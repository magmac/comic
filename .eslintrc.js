module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'alloy',
    'alloy/vue',
    'eslint-config-prettier'
    // '@vue/prettier'
    // 'alloy/typescript',
  ],
  plugins: ['prettier', 'vue'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['/@', './src']],
        extensions: ['.ts', '.js', '.json', '.vue']
      }
    }
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    complexity: 'off',
    'prettier/prettier': 'error',
    'vue/no-multiple-template-root': 'off',
    'vue/no-v-for-template-key': 'off',
    'vue/no-reserved-component-names': [
      'error',
      {
        disallowVueBuiltInComponents: false,
        disallowVue3BuiltInComponents: false
      }
    ]
  }
}
