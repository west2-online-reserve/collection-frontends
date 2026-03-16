import Checkbox from './Checkbox.vue'
import Checkbox from './CheckboxGroup.vue'
Checkbox.install = (app) => {
  // 注册组件
  app.component(Checkbox.name, Checkbox)
}

export default Checkbox
