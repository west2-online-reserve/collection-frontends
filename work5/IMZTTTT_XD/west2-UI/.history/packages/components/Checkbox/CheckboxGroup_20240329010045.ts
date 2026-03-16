import type { ExtractPropTypes , PropType} from 'vue'
import type checkboxGroup from './CheckboxGroup.vue'

export type CheckboxGroupValueType = Exclude<CheckboxValueType, boolean>[]

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
  'update:modelValue': (val: CheckboxGroupValueType) => isArray(val),
  change: (val: CheckboxValueType[]) => isArray(val)
}

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>
export type CheckboxGroupEmits = typeof checkboxGroupEmits
export type CheckboxGroupInstance = InstanceType<typeof checkboxGroup>
