import { ref, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import Button from '../Button.vue'

// 描述 Button.vue 组件的测试
describe('Button.vue', () => {
  // 每个测试结束后，恢复所有的模拟函数
  afterEach(() => {
    vi.restoreAllMocks()
  })

  // 测试点击事件
  test('测试点击事件', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click Me'
      },
      props: {
        disabled: false
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
    expect(wrapper.emitted('click')).toHaveLength(1) // 检查'click'事件被触发了1次
  })

  // 测试 disabled 属性
  test('测试 disabled', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click Me'
      },
      props: {
        disabled: true
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy() // 检查'click'事件没有被触发
  })
  // 测试 type 属性
  test('测试 type', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary'
      }
    })
    expect(wrapper.classes()).toContain('zt-button--primary')
  })
})
