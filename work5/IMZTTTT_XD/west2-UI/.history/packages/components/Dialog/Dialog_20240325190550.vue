<template>
  <teleport :to="appendTo">
    <transition name="dialog-fade">
      <div v-show="visible" class="zt-dialog__wrapper">
        <div role="dialog" ref="dialog">
          <ZTDialogContent
            v-if="rendered"
            ref="dialogContentRef"
            v-bind="$attrs"
            :title="title"
            @close="handleClose"
          >
            <template #header>
              <slot
                v-if="!$slots.title"
                name="header"
                :close="handleClose"
                :title-class="bem.e('title')"
              />
              <slot v-else name="title" />
            </template>
            <slot />
            <template v-if="$slots.footer" #footer>
              <slot name="footer" />
            </template>
          </ZTDialogContent>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { ref, useSlots } from 'vue'
import ZTDialogContent from './DiglogContent.vue'
import { useNamespace } from '../../hooks/use-namespace'
const slots = useSlots()
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
  },
  modal: {
    type: Boolean,
    default: true
  },
  modelValue: Boolean
})
const bem = useNamespace('dialog')

const dialogRef = ref<HTMLElement>()
const headerRef = ref<HTMLElement>()
const dialogContentRef = ref()
const visible = ref(false)
const closed = ref(false)
const rendered = ref(false) // when desctroyOnClose is true, we initialize it as false vise versa
function handleClose() {
  function hide(shouldCancel?: boolean) {
    if (shouldCancel) return
    closed.value = true
    visible.value = false
  }

  if (props.beforeClose) {
    props.beforeClose(hide)
  } else {
    close()
  }
}

defineOptions({
  name: 'zt-dialog'
})
</script>
