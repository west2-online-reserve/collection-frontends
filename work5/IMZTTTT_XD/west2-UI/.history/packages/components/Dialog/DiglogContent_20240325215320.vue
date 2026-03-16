<template>
  <div :ref="composedDialogRef" :class="dialogKls" tabindex="-1">
    <header ref="headerRef" :class="[bem.e('header')]">
      <slot name="header">
        <span role="heading" :class="bem.e('title')">
          {{ title }}
        </span>
      </slot>
      <button v-if="showClose" :class="bem.e('headerbtn')" type="button" @click="$emit('close')">
        <!-- <X></X> -->
      </button>
    </header>
    <div :class="bem.e('body')">
      <slot />
    </div>
    <footer v-if="$slots.footer" :class="bem.e('footer')">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
// import X from '../../assets/取消.svg'
import { useNamespace } from '../../hooks/use-namespace'
const bem = useNamespace('dialog')
defineOptions({ name: 'ZTDialogContent' })

const dialogKls = computed(() => [bem.b(), bem.is('draggable', props.draggable)])
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  draggable: {
    type: Boolean,
    default: false
  },
  showClose: {
    type: Boolean,
    default: true
  }
})
</script>
