import MessageBox from './MessageBox.vue'

MessageBox.install = (app) => {
  // 注册组件
  app.component(MessageBox.name, MessageBox)
}

export default MessageBox
