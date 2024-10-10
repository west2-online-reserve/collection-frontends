<template>
  <teleport :to="appendTo">
    <transition name="dialog-fade">
      <div v-show="visible" class="zt-dialog__wrapper">
        <div role="dialog" ref="dialog" :class="`${bem.namespace.value}-overlay-dialog`">
          <ZTDialogContent
            v-if="rendered"
            ref="dialogContentRef"
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
import { ref, useSlots, watch, onMounted } from 'vue'
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
// const visible = ref(false)
const closed = ref(false)
const rendered = ref(true) // when desctroyOnClose is true, we initialize it as false vise versa

const emit = defineEmits(['update:modelValue'])

// 使用一个ref跟踪modelValue的状态，这样我们就可以在模板中控制显示或隐藏对话框
const visible = ref(props.modelValue)

// 监听modelValue prop的变化，以便更新visible的状态
watch(
  () => props.modelValue,
  (newValue) => {
    visible.value = newValue
  }
)

// 监听visible的变化，当它改变时，发出一个事件来更新父组件的modelValue
watch(visible, (newValue) => {
  emit('update:modelValue', newValue)
})

// 关闭对话框的函数现在只需要改变visible的状态
function handleClose() {
  visible.value = false // 这会触发watcher，从而发出update:modelValue事件
}

// onMounted(() => {
//   if (props.modelValue) {
//     visible.value = true
//     rendered.value = true // enables lazy rendering
//   }
// })

defineOptions({
  name: 'zt-dialog'
})
</script>
