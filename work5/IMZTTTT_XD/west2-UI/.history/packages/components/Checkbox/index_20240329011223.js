import Checkbox from './Checkbox.vue'
import CheckboxGroup from './CheckboxGroup.vue'
Checkbox.install = (app) => {
  // 注册组件
  app.component(Checkbox.name, Checkbox)
}
CheckboxGroup.install = (app) => {
  // 注册组件
  app.component(CheckboxGroup.name, CheckboxGroup)
}

export default Checkbox
export default CheckboxGroup
