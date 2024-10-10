import ElMessageBox from './index.vue'

ElMessageBox.install = (app) => {
  // 注册组件
  app.component(ElMessageBox.name, ElMessageBox)
}

export default ElMessageBox
