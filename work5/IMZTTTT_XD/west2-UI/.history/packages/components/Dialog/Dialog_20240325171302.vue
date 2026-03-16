<template>
  <teleport :to="appendTo">
    <transition name="dialog-fade" @after-enter="afterEnter" @after-leave="afterLeave">
      <div v-show="visible" class="zt-dialog__wrapper" @click.self="handleWrapperClick">
        <div role="dialog" ref="dialog" :style="style">
          <zt-dialog-content
            v-if="rendered"
            ref="dialogContentRef"
            v-bind="$attrs"
            :center="center"
            :close-icon="closeIcon"
            :show-close="showClose"
            :title="title"
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
          </zt-dialog-content>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref, useSlots } from 'vue'
import ZTDialogContent from './DiglogContent.vue'
import { useNamespace } from '../../hooks/use-namespace'
const slots = useSlots()
const props = defineProps({})
const bem = useNamespace('dialog')

// const dialogRef = ref<HTMLElement>()
// const headerRef = ref<HTMLElement>()
const dialogContentRef = ref()
const visible = ref(true)
defineOptions({
  name: 'zt-dialog'
})
</script>
