import type { ExtractPropTypes } from 'vue'
import type checkboxGroup from './CheckboxGroup.vue'

export type CheckboxGroupValueType = Exclude<CheckboxValueType, boolean>[]

export const checkboxGroupProps = buildProps({
  modelValue: {
    type: definePropType<CheckboxGroupValueType>(Array),
    default: () => []
  },
  disabled: Boolean,
  min: Number,
  max: Number
} as const)

export const checkboxGroupEmits = {
  [UPDATE_MODEL_EVENT]: (val: CheckboxGroupValueType) => isArray(val),
  change: (val: CheckboxValueType[]) => isArray(val)
}

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>
export type CheckboxGroupEmits = typeof checkboxGroupEmits
export type CheckboxGroupInstance = InstanceType<typeof checkboxGroup>
