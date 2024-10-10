<template>
  <teleport to="body">
    <!-- 使用这个 modal 组件，传入 prop -->
    <modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3>custom header</h3>
      </template>
    </modal>
  </teleport>
  <!--transition组件可以给任何元素和组件添加进入/离开过渡-->
  <!--after-enter、after-leave是对应的钩子-->
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
      >
        <!--dialog_header包含：标题、关闭按钮-->
        <div class="zt-dialog__header">
          <!--标题-->
          <slot name="title">
            <span class="zt-dialog__title">{{ title }}</span>
          </slot>
          <!--关闭按钮-->
          <button
            type="button"
            class="zt-dialog__headerbtn"
            aria-label="Close"
            v-if="showClose"
            @click="handleClose"
          >
            <i class="zt-dialog__close zt-icon zt-icon-close"></i>
          </button>
        </div>
        <!--中间的内容-->
        <div class="zt-dialog__body" v-if="rendered"><slot></slot></div>
        <!--底部内容-->
        <div class="zt-dialog__footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
const visible = ref(true)
defineOptions({
  name: 'zt-dialog'
})
</script>
