import { ExtractPropTypes, PropType } from 'vue'

export const checkboxProps = {
  modelValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>
  },
  indeterminate: Boolean,
  disabled: Boolean,
  label: {
    type: String as PropType<string>
  },
  checked: Boolean
} as const

export type CheckboxProps = Partial<ExtractPropTypes<typeof checkboxProps>>

export const checkboxEmits = {
  'update:modelValue': (value: boolean | string | number) => typeof value === 'boolean',
  change: (value: boolean) => typeof value === 'boolean'
}

export type CheckboxEmits = typeof checkboxEmits
