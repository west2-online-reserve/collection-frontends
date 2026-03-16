<template>
  <label :class="bem.b()">
    <span :class="bem.e('input')">
      <input
        ref="inputRef"
        v-model="model"
        type="checkbox"
        :disabled="disabled"
        :value="label"
        @change="handleChange"
        :class="[
          bem.b(),
          bem.m(type),
          bem.m(size),
          bem.is('disabled', disabled),
          bem.is('round', round)
        ]"
      />
    </span>

    <span v-if="$slots.default || label" :class="bem.e('label')">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script lang="ts" setup>
import { useNamespace } from '../../hooks/use-namespace'
import { onMounted, watch, ref, computed } from 'vue'
import { checkboxEmits, checkboxProps } from './Checkbox'
const bem = useNamespace('checkbox')
const props = defineProps(checkboxProps)
const emit = defineEmits(checkboxEmits)

defineOptions({
  name: 'zt-checkbox'
})
const model = computed<any>({
  get() {
    return props.modelValue
  },
  set(val) {
    return emit('update:modelValue', val)
  }
})
const inputRef = ref<HTMLInputElement>()

function indeterminate(val: boolean) {
  inputRef.value!.indeterminate = val
}
function handleChange(e: Event) {
  const target = e.target as HTMLInputElement
  const value = target.checked ? true : false
  emit('change', value)
}

watch(() => props.indeterminate, indeterminate)

onMounted(() => {
  indeterminate(props.indeterminate)
})
</script>
