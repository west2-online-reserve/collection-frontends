import Button from './Button'
import Input from './Input'
import Dialog from './Dialog'
import MessageBox from './MessageBox'
import ElMessageBox from './ElMessageBox'

const components = [Input, Button, Dialog, MessageBox, ElMessageBox]

const install = (app) => {
  components.forEach((component) => {
    app.component(component.name, component)
  })
}

export default {
  install
}
