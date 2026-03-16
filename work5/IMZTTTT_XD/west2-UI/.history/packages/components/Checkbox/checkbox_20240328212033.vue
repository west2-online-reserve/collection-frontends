<template>
  <label>
    <input
      v-model="model"
      :class="[bem.b(), bem.is('disabled', disabled), bem.is('checked', checked)]"
      type="checkbox"
      :disabled="disabled"
      @change="handleChange"
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
const checkedValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    // 当本地变量变化时，通知父组件更新
    emits('update:modelValue', val)
  }
})

function handleChange(event) {
  // 更新本地的响应式变量，它会触发 set 函数
  checkedValue.value = event.target.checked
}
</script>
