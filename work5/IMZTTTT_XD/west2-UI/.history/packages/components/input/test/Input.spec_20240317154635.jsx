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
  // 测试创建 Input 组件
  test('创建', async () => {
    const input = ref('input') // 创建一个 ref，用于存储输入值
    const handleFocus = vi.fn() // 创建一个模拟的焦点处理函数
    // 挂载 Input 组件
    const wrapper = mount(() => (
      <Input placeholder="请输入内容" onFocus={handleFocus} modelValue={input.value} />
    ))

    const inputElm = wrapper.find('input') // 找到 input 元素
    const nativeInput = inputElm.element // 获取原生的 input 元素

    await inputElm.trigger('focus') // 触发 focus 事件

    // 断言 input 元素存在
    expect(inputElm.exists()).toBe(true)
    // 断言焦点处理函数被调用
    expect(handleFocus).toHaveBeenCalled()
    // 断言 placeholder 属性的值
    expect(nativeInput.placeholder).toMatchInlineSnapshot(`"请输入内容"`)
    // 断言 value 属性的值
    expect(nativeInput.value).toMatchInlineSnapshot(`"input"`)

    input.value = 'text' // 修改 ref 的值
    await nextTick() // 等待下一个 tick
    // 断言 input 元素的值
    expect(inputElm.element.value).toMatchInlineSnapshot(`"text"`)
  })
})
