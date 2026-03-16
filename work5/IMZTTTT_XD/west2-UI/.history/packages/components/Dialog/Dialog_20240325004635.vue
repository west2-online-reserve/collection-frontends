<template>
  <!--transition组件可以给任何元素和组件添加进入/离开过渡-->
  <!--after-enter、after-leave是对应的钩子-->
  <teleport :to="appendTo">
    <transition name="dialog-fade" @after-enter="afterEnter" @after-leave="afterLeave">
      <div v-show="visible" class="zt-dialog__wrapper" @click.self="handleWrapperClick">
        <div role="dialog" ref="dialog" :style="style">
          <el-dialog-content
            v-if="rendered"
            ref="dialogContentRef"
            v-bind="$attrs"
            :center="center"
            :align-center="alignCenter"
            :close-icon="closeIcon"
            :draggable="draggable"
            :overflow="overflow"
            :fullscreen="fullscreen"
            :show-close="showClose"
            :title="title"
            :aria-level="headerAriaLevel"
            @close="handleClose"
          >
            <template #header>
              <slot
                v-if="!$slots.title"
                name="header"
                :close="handleClose"
                :title-id="titleId"
                :title-class="bem.e('title')"
              />
              <slot v-else name="title" />
            </template>
            <slot />
            <template v-if="$slots.footer" #footer>
              <slot name="footer" />
            </template>
          </el-dialog-content>
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
