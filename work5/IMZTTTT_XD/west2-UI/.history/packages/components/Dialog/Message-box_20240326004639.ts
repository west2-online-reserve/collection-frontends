// MessageBoxService.ts
import { createApp } from 'vue'
import MessageBox from './packages/components/Dialog/Message-box.vue'

// MessageBox 函数接受一个配置对象，并返回一个 Promise
export function MessageBox(options: { message: string; title?: string }) {
  return new Promise((resolve, reject) => {
    const messageBoxApp = createApp({
      ...MessageBoxt,
      props: {
        message: options.message,
        title: options.title || 'Confirm'
      },
      mounted() {
        this.$on('confirm', () => {
          resolve(true)
          messageBoxApp.unmount()
          document.body.removeChild(div)
        })
        this.$on('cancel', () => {
          reject(new Error('cancel'))
          messageBoxApp.unmount()
          document.body.removeChild(div)
        })
      }
    })

    const div = document.createElement('div')
    document.body.appendChild(div)
    messageBoxApp.mount(div)
  })
}

// 一个方便的方法来调用确认对话框
MessageBox.confirm = function (message: string, title?: string) {
  return MessageBox({ message, title })
}
