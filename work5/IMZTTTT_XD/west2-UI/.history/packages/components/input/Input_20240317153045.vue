<template>
  <div
    class="w-input"
    :class="{
      'w-input--small': size === 'small',
      'w-input--medium': size === 'medium',
      'w-input--large': size === 'large'
    }"
  >
    <input
      class="w-input__inner"
      :value="modelValue"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineOptions({
  name: 'WInput'
})
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  placeholder: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue', 'change', 'focus', 'blur'])

const inputValue = ref(props.value)

const handleInput = (event) => {
  inputValue.value = event.target.value
  emit('update:modelValue', inputValue.value)
}

const handleChange = (event) => {
  emit('change', event.target.value)
}

const handleFocus = (event) => {
  emit('focus', event)
}

const handleBlur = (event) => {
  emit('blur', event)
}
</script>
