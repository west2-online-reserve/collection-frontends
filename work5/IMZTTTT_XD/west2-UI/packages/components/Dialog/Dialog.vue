<template>
  <teleport :to="appendTo">
    <transition name="dialog-fade">
      <div v-show="modelValue" class="zt-dialog__wrapper">
        <div ref="dialog" :class="`${bem.namespace.value}-overlay-dialog`">
          <div :class="bem.b()" tabindex="-1">
            <header :class="[bem.e('header')]">
              <slot name="title">
                <span :class="bem.e('title')">{{ title }}</span>
              </slot>
              <button :class="bem.e('headerbtn')" type="button" @click="handleClose">
                <img src="../../assets/取消.png" alt="" />
              </button>
            </header>
            <div :class="bem.e('body')">
              <slot />
            </div>
            <footer v-if="$slots.footer" :class="bem.e('footer')">
              <slot name="footer" />
            </footer>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useNamespace } from '../../hooks/use-namespace'
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  appendTo: {
    type: String,
    default: 'body'
  },
  beforeClose: {
    type: Function
  }
})
const modelValue = defineModel({ type: Boolean })
const bem = useNamespace('dialog')
const emit = defineEmits(['close', 'open'])
function done() {
  modelValue.value = false
}
function handleClose() {
  if (!props.beforeClose) {
    done()
    return
  }
  props.beforeClose(done)
}
watch(modelValue, (newValue) => {
  if (newValue == true) {
    emit('open')
  } else {
    emit('close')
  }
})

defineOptions({
  name: 'zt-dialog'
})
</script>
