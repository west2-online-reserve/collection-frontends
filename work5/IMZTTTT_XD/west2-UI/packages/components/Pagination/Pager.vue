<template>
  <ul :class="bemPager.b()" class="vp-raw">
    <li
      v-if="pageCount > 0"
      :class="[bemPager.is('active', currentPage === 1), bemPager.is('disabled', disabled)]"
      @click="changePager(1)"
      class="vp-raw"
    >
      1
    </li>
    <li
      v-if="showPrevMore"
      @mouseenter="onMouseEnter(true)"
      @mouseleave="quickPrevHover = false"
      class="vp-raw"
    >
      <el-icon
        v-if="(quickPrevHover || quickPrevFocus) && !disabled"
        @click="changePager(currentPage - 5)"
        ><DArrowLeft
      /></el-icon>
      <el-icon v-else><MoreFilled /></el-icon>
    </li>
    <li
      v-for="pager in pagers"
      :key="pager"
      :class="[bemPager.is('active', currentPage === pager), bemPager.is('disabled', disabled)]"
      @click="changePager(pager)"
      class="vp-raw"
    >
      {{ pager }}
    </li>
    <li
      v-if="showNextMore"
      @mouseenter="onMouseEnter()"
      @mouseleave="quickNextHover = false"
      class="vp-raw"
    >
      <el-icon
        v-if="(quickNextHover || quickNextFocus) && !disabled"
        @click="changePager(currentPage + 5)"
        ><DArrowRight
      /></el-icon>
      <el-icon v-else><MoreFilled /></el-icon>
    </li>
    <li
      v-if="pageCount > 1"
      :class="[bemPager.is('active', currentPage === pageCount), bemPager.is('disabled', disabled)]"
      @click="changePager(pageCount)"
      class="vp-raw"
    >
      {{ pageCount }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useNamespace } from '../../hooks/use-namespace'
defineOptions({
  name: 'zt-pager'
})
const props = defineProps({
  currentPage: {
    type: Number,
    default: 1
  },
  pageCount: {
    type: Number
  },
  disabled: {
    type: Boolean,
    default: false
  },
  pagerCount: {
    type: Number,
    default: 7
  }
})

const quickPrevHover = ref(false)
const quickNextHover = ref(false)
const quickPrevFocus = ref(false)
const quickNextFocus = ref(false)
const currentPage = ref(props.currentPage)
const halfPagerCount = (props.pagerCount - 1) / 2
const showNextMore = computed(() => {
  return props.pageCount > props.pagerCount && props.currentPage < props.pageCount! - halfPagerCount
})
const showPrevMore = computed(() => {
  return props.pageCount > props.pagerCount && props.currentPage > props.pagerCount - halfPagerCount
})

// pagers的计算借鉴了element-plus的源码QAQ
const pagers = computed(() => {
  const pagerCount = props.pagerCount
  const currentPage = props.currentPage
  const pageCount = props.pageCount
  const array: number[] = []
  if (showPrevMore.value && !showNextMore.value) {
    const startPage = pageCount - (pagerCount - 2)
    for (let i = startPage; i < pageCount; i++) {
      array.push(i)
    }
  } else if (!showPrevMore.value && showNextMore.value) {
    for (let i = 2; i < pagerCount; i++) {
      array.push(i)
    }
  } else if (showPrevMore.value && showNextMore.value) {
    const offset = Math.floor(pagerCount / 2) - 1
    for (let i = currentPage - offset; i <= currentPage + offset; i++) {
      array.push(i)
    }
  } else {
    for (let i = 2; i < pageCount; i++) {
      array.push(i)
    }
  }
  return array
})

const emit = defineEmits(['change'])
function changePager(pager: number) {
  if (pager === props.currentPage || props.disabled) {
    return
  }
  if (pager < 1) {
    pager = 1
  } else if (pager > props.pageCount) {
    pager = props.pageCount
  }
  currentPage.value = pager
  emit('change', pager)
}

watchEffect(() => {
  currentPage.value = props.currentPage
})

const bemPager = useNamespace('pager')
function onMouseEnter(forward = false) {
  if (props.disabled) return
  if (forward) {
    quickPrevHover.value = true
  } else {
    quickNextHover.value = true
  }
}
</script>
