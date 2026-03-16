import Button from './Button'
import Input from './Input'

const components = [Input, Button]

const install = (app) => {
  components.forEach((component) => {
    app.component(component.name, component)
  })
}

export default {
  install
}
