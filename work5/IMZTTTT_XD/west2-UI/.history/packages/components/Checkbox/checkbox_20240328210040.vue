<template>
  <label>
    <input
      :class="bem.e('original')"
      type="checkbox"
      :disabled="disabled"
      :class="[bem.b(), bem.is('disabled', disabled), bem.is('checked', checked)]"
    />
    <span :class="bem.e('label')">
      <slot />
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script setup lang="ts">
import { useNamespace } from '../../hooks/use-namespace'
defineOptions({
  name: 'zt-checkbox'
})
const bem = useNamespace('checkbox')
const props = defineProps({
  model: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  label: {
    type: String
  },
  checked: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['update:modelValue', 'change'])
const handleChange = (e: event) => {
  const value = e.target.checked
  emits('update:modelValue', value)
  emits('change', value)
}
</script>
