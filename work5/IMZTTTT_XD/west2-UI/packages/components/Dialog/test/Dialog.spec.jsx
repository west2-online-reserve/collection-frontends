import { ref, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import Dialog from '../Dialog.vue'

const AXIOM = '文字文字'

describe('Dialog.vue', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  test('创建', async () => {
    const teleportTarget = document.createElement('div')
    teleportTarget.id = 'teleport-target'
    document.body.appendChild(teleportTarget)

    const dialogVisible = ref(true)
    const wrapper = mount(() => (
      <Dialog modelValue={dialogVisible.value} appendTo="#teleport-target">
        {AXIOM}
      </Dialog>
    ))
    await nextTick()
    expect(teleportTarget.innerHTML).toContain(AXIOM)
    wrapper.unmount()
    teleportTarget.remove()
  })

  test('测试modelValue属性', async () => {
    const teleportTarget = document.createElement('div')
    teleportTarget.id = 'teleport-target'
    document.body.appendChild(teleportTarget)

    const dialogVisible = ref(false)
    const wrapper = mount(() => (
      <Dialog modelValue={dialogVisible.value} appendTo="#teleport-target">
        {AXIOM}
      </Dialog>
    ))
    await nextTick()
    const dialogWrapper = teleportTarget.querySelector('.zt-dialog__wrapper')
    expect(dialogWrapper.style.display).toBe('none')

    dialogVisible.value = true
    await nextTick()
    expect(dialogWrapper.style.display).not.toBe('none')

    wrapper.unmount()
    teleportTarget.remove()
  })

  test('测试关闭', async () => {
    const teleportTarget = document.createElement('div')
    teleportTarget.id = 'teleport-target'
    document.body.appendChild(teleportTarget)
    const dialogVisible = ref(true)
    const wrapper = mount(() => (
      <Dialog modelValue={dialogVisible.value} appendTo="#teleport-target">
        {AXIOM}
      </Dialog>
    ))
    await nextTick()
    wrapper.unmount()
    teleportTarget.remove()
  })

  test('测试title', async () => {
    const teleportTarget = document.createElement('div')
    teleportTarget.id = 'teleport-target'
    document.body.appendChild(teleportTarget)

    const dialogVisible = ref(true)
    const wrapper = mount(() => (
      <Dialog modelValue={dialogVisible.value} appendTo="#teleport-target" title="wula">
        {AXIOM}
      </Dialog>
    ))
    await nextTick()
    expect(teleportTarget.innerHTML).toContain('wula')
    wrapper.unmount()
    teleportTarget.remove()
  })
})
