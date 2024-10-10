import { ref, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import Input from '../Input.vue'

// 描述 Input.vue 组件的测试
describe('Input.vue', () => {
  // 每个测试结束后，恢复所有的模拟函数
  afterEach(() => {
    vi.restoreAllMocks()
  })
})
