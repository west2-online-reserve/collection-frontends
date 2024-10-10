<template>
  <label :class="[bem.b(), bem.is('checked', isChecked), bem.is('disabled', isDisabled)]">
    <span :class="bem.e('input')">
      <input
        :checked="isChecked"
        type="checkbox"
        :disabled="isDisabled"
        @click="handleChange"
        class="real-checkbox"
      />
      <span :class="bem.e('inner')"></span>
    </span>
    <span v-if="$slots.default || label" :class="bem.e('label')">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script lang="ts" setup>
import { useNamespace } from '../../hooks/use-namespace'
import { inject, computed, ref, watch, onMounted } from 'vue'
defineOptions({
  name: 'zt-checkbox'
})
const bem = useNamespace('checkbox')
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: undefined
  },
  disabled: Boolean,
  checked: {
    type: Boolean,
    default: false
  },
  label: {
    type: String
  }
})
const emit = defineEmits(['change'])

const internalChecked = ref(props.checked)
const modelValue = ref(props.modelValue)
const isChecked = computed({
  get() {
    return modelValue.value !== undefined ? modelValue.value : internalChecked.value
  },
  set(val) {
    if (modelValue.value !== undefined) {
      modelValue.value = val
    } else {
      emit('change', val)
      internalChecked.value = val
    }
  }
})
watch(isChecked, () => {
  emit('change', isChecked.value)
})
function handleChange(e) {
  const checked = e.target.checked
  isChecked.value = checked
  if (isChecked.value) {
    addLabel(props.label)
  } else {
    removeLabel(props.label)
  }
}

onMounted(() => {
  if (labelArray.value.includes(props.label)) {
    internalChecked.value = true
  }
})

const isDisabled = computed(() => {
  return (
    props.disabled ||
    (isMinReached.value && labelArray.value.includes(props.label)) ||
    (isMaxReached.value && !labelArray.value.includes(props.label)) ||
    allDisabled
  )
})

const { addLabel, removeLabel, isMaxReached, isMinReached, labelArray, allDisabled } = inject(
  'checkboxGroup',
  {
    labelArray: ref([]),
    addLabel: () => {},
    removeLabel: () => {},
    isMaxReached: computed(() => false),
    isMinReached: computed(() => false),
    allDisabled: undefined
  }
)
</script>
