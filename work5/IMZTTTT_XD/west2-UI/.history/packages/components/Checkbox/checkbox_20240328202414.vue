<template>
  <label>
    <input
      :class="bem.e('original')"
      type="checkbox"
      :disabled="disabled"
      @change="handleChange"
      @click.stop
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
</script>
