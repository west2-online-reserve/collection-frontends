import { ref, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import Checkbox from '../Checkbox.vue'

describe('Checkbox.vue', () => {
    // 每个测试结束后，恢复所有的模拟函数
  afterEach(() => {
    vi.restoreAllMocks()
  })
//   测试创建
test('创建checkbox',async()=>{
    const checked = ref(false)
    const wrapper = mount(<Checkbox v-model={checked.value} label="a" />)
    expect(wrapper.classes()).toContain('zt-checkbox')
})
// 测试disabled属性
test('测试disabled属性 ',async()=>{
    const checked = ref(false)
    const wrapper = mount(<Checkbox v-model={checked.value} label="a" disabled />)
    const checkbox = wrapper.findComponent(Checkbox)
    expect(checkbox.classes()).toContain('is-disabled')
    expect(checked.value).toBe(false)
    await checkbox.trigger('click')
    await nextTick()
    expect(checkbox.classes()).toContain('is-disabled')
    expect(checked.value).toBe(false)
})
// 测试label属性
test('测试label属性 ',async()=>{
    const wrapper = mount(() => <Checkbox label={'wula'} />)
    expect(wrapper.find('.zt-checkbox__label').text()).toBe('wula')
})
// 测试非受控状态
test('测试非受控状态', async () => {
    const checked = ref(false)
    const wrapper = mount(<Checkbox checked={checked.value} />)
    expect(wrapper.classes()).not.toContain('is-disabled')
    await wrapper.trigger('click')
    expect(wrapper.classes()).toContain('is-checked')
    await wrapper.trigger('click')
    expect(wrapper.classes('is-checked')).toBe(false)
})
// 测试受控状态
test('测试受控状态', async () => {
    const checked = ref(false)
    const wrapper = mount(() => <Checkbox v-model={checked.value} />)
    expect(wrapper.classes()).not.toContain('is-disabled')
    await wrapper.trigger('click')
    expect(wrapper.classes()).toContain('is-checked')
    await wrapper.trigger('click')
    expect(wrapper.classes('is-checked')).toBe(false)
})

})