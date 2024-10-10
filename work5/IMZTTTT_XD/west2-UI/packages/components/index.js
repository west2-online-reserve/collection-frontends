import Button from './Button'
import Input from './Input'
import Dialog from './Dialog'
import Checkbox from './Checkbox'
import CheckboxGroup from './CheckboxGroup'
import Pagination from './Pagination'

const components = [Input, Button, Dialog, Checkbox, CheckboxGroup,Pagination]

const install = (app) => {
  components.forEach((component) => {
    app.component(component.name, component)
  })
}

export default {
  install
}
