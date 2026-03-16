<template>
  <!--transition组件可以给任何元素和组件添加进入/离开过渡-->
  <!--after-enter、after-leave是对应的钩子-->
  <teleport :to="appendTo" :disabled="appendTo !== 'body' ? false : !appendToBody">
    <transition name="dialog-fade" @after-enter="afterEnter" @after-leave="afterLeave">
      <div v-show="visible" class="zt-dialog__wrapper" @click.self="handleWrapperClick">
        <div
          role="dialog"
          :key="key"
          aria-modal="true"
          :aria-label="title || 'dialog'"
          :class="[
            'zt-dialog',
            { 'is-fullscreen': fullscreen, 'zt-dialog--center': center },
            customClass
          ]"
          ref="dialog"
          :style="style"
        ></div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref } from 'vue'
const visible = ref(true)
defineOptions({
  name: 'zt-dialog'
})
</script>
