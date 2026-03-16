<template>
  <div :class="[bem.b(), bem.is('disabled', disabled)]">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { useNamespace } from '../../hooks/use-namespace'
import { provide, ref, watch, computed } from 'vue'
const bem = useNamespace('checkboxgroup')
defineOptions({
  name: 'zt-checkgroup'
})

const labelArray = defineModel({ type: Array, default: ref([]) })
const props = defineProps({
  disabled: Boolean,
  min: {
    type: Number,
    default: 0
  },
  max: { type: Number, default: undefined }
})

const emit = defineEmits(['change'])
watch(labelArray.value, (newValue) => {
  emit('change', newValue)
})
// 判断是否达到最大选择数
const isMaxReached = computed(() => {
  return props.max !== undefined && labelArray.value.length >= props.max
})
// 判断是否达到最小选择数
const isMinReached = computed(() => {
  return props.min !== undefined && labelArray.value.length <= props.min
})

// 添加标签
const addLabel = (label: string) => {
  if (
    labelArray.value.indexOf(label) === -1 &&
    (!props.max || labelArray.value.length <= props.max)
  ) {
    labelArray.value.push(label)
    emit('change', labelArray.value)
  }
  if (labelArray.value.length === props.max && props.max !== undefined) {
  }
}

// 移除标签
const removeLabel = (label: string) => {
  const index = labelArray.value.indexOf(label)
  if (index !== -1 && (!props.min || labelArray.value.length >= props.min)) {
    labelArray.value.splice(index, 1)
    emit('change', labelArray.value)
  }
}

provide('checkboxGroup', {
  labelArray,
  addLabel,
  removeLabel,
  isMaxReached,
  isMinReached,
  allDisabled: props.disabled
})
</script>
