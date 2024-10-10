import type { ExtractPropTypes , PropType} from 'vue'
import type checkboxGroup from './CheckboxGroup.vue'

export const checkboxGroupProps = {
  modelValue: {
    type: String[] as PropType<string>,
    default: () => []
  },
  disabled: Boolean,
  min: Number,
  max: Number
} as const

export const checkboxGroupEmits = {
  'update:modelValue': (value: string[]) => value
  change: (value: string[]) => value
}

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>
export type CheckboxGroupEmits = typeof checkboxGroupEmits
export type CheckboxGroupInstance = InstanceType<typeof checkboxGroup>
