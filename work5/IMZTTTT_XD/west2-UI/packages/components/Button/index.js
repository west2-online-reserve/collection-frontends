import Button from './Button.vue'

Button.install = (app) => {
  // 注册组件
  app.component(Button.name, Button)
}

export default Button
