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
  test('renders correctly', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click Me'
      }
    })
    expect(wrapper.text()).toContain('Click Me')
  })

  test('handles click when not disabled', async () => {
    const handleClick = vi.fn()
    const wrapper = mount(Button, {
      slots: {
        default: 'Click Me'
      },
      props: {
        disabled: false
      },
      listeners: {
        click: handleClick
      }
    })
    await wrapper.trigger('click')
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('does not handle click when disabled', async () => {
    const handleClick = vi.fn()
    const wrapper = mount(Button, {
      slots: {
        default: 'Click Me'
      },
      props: {
        disabled: true
      },
      listeners: {
        click: handleClick
      }
    })
    await wrapper.trigger('click')
    expect(handleClick).not.toHaveBeenCalled()
  })

  test('has correct type class', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary'
      }
    })
    expect(wrapper.classes()).toContain('zt-button--primary')
  })
})
