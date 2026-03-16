<template>
  <div :ref="composedDialogRef" :class="dialogKls" :style="style" tabindex="-1">
    <header ref="headerRef" :class="[bem.e('header')]">
      <slot name="header">
        <span role="heading" :aria-level="ariaLevel" :class="bem.e('title')">
          {{ title }}
        </span>
      </slot>
      <button
        v-if="showClose"
        :aria-label="t('el.dialog.close')"
        :class="bem.e('headerbtn')"
        type="button"
        @click="$emit('close')"
      ></button>
    </header>
    <div :id="bodyId" :class="bem.e('body')">
      <slot />
    </div>
    <footer v-if="$slots.footer" :class="bem.e('footer')">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'

import { useNamespace } from '../../hooks/use-namespace'
const bem = useNamespace('dialog')
defineOptions({ name: 'zt-dialog-content' })

const dialogKls = computed(() => [
  bem.b(),
  bem.is('draggable', props.draggable),
  { [bem.m('center')]: props.center }
])
</script>
