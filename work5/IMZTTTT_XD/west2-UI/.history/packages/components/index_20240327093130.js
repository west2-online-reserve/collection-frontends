import Button from './Button'
import Input from './Input'
import Dialog from './Dialog'
import MessageBox from './MessageBox'

const components = [Input, Button, Dialog, MessageBox]

const install = (app) => {
  components.forEach((component) => {
    app.component(component.name, component)
  })
}

export default {
  install
}
