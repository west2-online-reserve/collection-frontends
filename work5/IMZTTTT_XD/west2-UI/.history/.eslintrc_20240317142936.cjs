// 在.eslintrc.cjs中进行配置
/* eslint-env node */ // 指定 ESLint 运行在 Node.js 环境中
require('@rushstack/eslint-patch/modern-module-resolution')
const stylistic = require('@stylistic/eslint-plugin')

// 使用 '@stylistic/eslint-plugin' 插件的 'customize' 方法来定制一些规则
const customized = stylistic.configs.customize({
  // 下面的选项是默认值
  indent: 2, // 缩进使用 2 个空格
  quotes: 'single', // 字符串使用单引号
  semi: true, // 语句末尾不使用分号
  jsx: true, // 支持 JSX
})

// 导出 ESLint 配置
module.exports = {
  root: true, // 这个配置文件是 ESLint 配置的根，ESLint 将停止在父级目录中查找更多的配置文件
  plugins: ['@stylistic'], // 使用 '@stylistic' 插件
  extends: [
    'plugin:vue/vue3-essential', // 扩展 Vue.js 3 的基本配置
    'eslint:recommended', // 扩展 ESLint 推荐的配置
    '@vue/eslint-config-prettier/skip-formatting', // 扩展 Prettier 的配置，并跳过格式化
  ],
  rules: {
    ...customized.rules, // 使用上面定制的规则
  },
  parserOptions: {
    ecmaVersion: 'latest', // 使用最新的 ECMAScript 版本进行解析
  },
}
