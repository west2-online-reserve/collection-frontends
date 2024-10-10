import Button from './Button'
import Input from './Input'
import Dialog from './Dialog'
import { Checkbox, CheckboxGroup } from './Checkbox'

const components = [Input, Button, Dialog, Checkbox, CheckboxGroup]

const install = (app) => {
  components.forEach((component) => {
    app.component(component.name, component)
  })
}

export default {
  install
}
