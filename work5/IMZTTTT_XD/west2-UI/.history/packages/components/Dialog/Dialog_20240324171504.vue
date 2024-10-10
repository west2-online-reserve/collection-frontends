<template>
  <!--transition组件可以给任何元素和组件添加进入/离开过渡-->
  <!--after-enter、after-leave是对应的钩子-->
  <teleport :to="appendTo">
    <transition name="dialog-fade" @after-enter="afterEnter" @after-leave="afterLeave">
      <div v-show="visible" class="zt-dialog__wrapper" @click.self="handleWrapperClick">
        <div
          role="dialog"
          :key="key"
          aria-modal="true"
          :aria-label="title || 'dialog'"
          :class="['zt-dialog', { 'is-fullscreen': fullscreen, 'zt-dialog--center': center }]"
          ref="dialog"
          :style="style"
        >
          <div :ref="composedDialogRef" :class="dialogKls" :style="style" tabindex="-1">
            <header ref="headerRef" :class="[ns.e('header'), { 'show-close': showClose }]">
              <slot name="header">
                <span role="heading" :aria-level="ariaLevel" :class="ns.e('title')">
                  {{ title }}
                </span>
              </slot>
              <button
                v-if="showClose"
                :aria-label="t('el.dialog.close')"
                :class="ns.e('headerbtn')"
                type="button"
                @click="$emit('close')"
              >
                <!-- <el-icon :class="ns.e('close')">
                  <component :is="closeIcon || Close" />
                </el-icon> -->
              </button>
            </header>
            <div :id="bodyId" :class="ns.e('body')">
              <slot />
            </div>
            <footer v-if="$slots.footer" :class="ns.e('footer')">
              <slot name="footer" />
            </footer>
          </div>
        </div>
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
