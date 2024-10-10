<template>
  <teleport to="body">
    <transition name="message-fade">
      <div v-if="visible" class="message-box-backdrop" @click="handleCancel">
        <div class="message-box" @click="stopPropagation">
          <div class="message-box-content">
            <p>{{ message }}</p>
          </div>
          <div class="message-box-footer">
            <zt-button @click="handleCancel">Cancel</zt-button>
            <zt-button @click="handleConfirm">Confirm</zt-button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'
const message = ref('')

export type Action = 'confirm' | 'close' | 'cancel'
export type MessageBoxType = '' | 'prompt' | 'alert' | 'confirm'
export type MessageBoxData = MessageBoxInputData & Action
export interface MessageBoxInputData {
  value: string
  action: Action
}

export interface MessageBoxInputValidator {
  (value: string): boolean | string
}

export declare interface MessageBoxState {
  message: string
  action: Action
}

export interface ElMessageBoxOptions {
  /**
   * auto focus when open message-box
   */
  autofocus?: boolean

  /** Callback before MessageBox closes, and it will prevent MessageBox from closing */
  beforeClose?: (action: Action, instance: MessageBoxState, done: () => void) => void

  /** Custom class name for MessageBox */
  customClass?: string

  /** Custom inline style for MessageBox */
  customStyle?: CSSProperties

  /** MessageBox closing callback if you don't prefer Promise */
  callback?: Callback

  /** Text content of cancel button */
  cancelButtonText?: string

  /** Text content of confirm button */
  confirmButtonText?: string

  /** Custom class name of cancel button */
  cancelButtonClass?: string

  /** Custom class name of confirm button */
  confirmButtonClass?: string

  /** Whether to align the content in center */
  center?: boolean

  /** Whether MessageBox can be drag */
  draggable?: boolean

  /** Draggable MessageBox can overflow the viewport */
  overflow?: boolean

  /** Content of the MessageBox */
  message?: string | VNode | (() => VNode)

  /** Title of the MessageBox */
  title?: string | ElMessageBoxOptions

  /** Message type, used for icon display */
  type?: MessageType

  /** Message box type */
  boxType?: MessageBoxType

  /** Custom icon component */
  icon?: string | Component

  /** Whether message is treated as HTML string */
  dangerouslyUseHTMLString?: boolean

  /** Whether to distinguish canceling and closing */
  distinguishCancelAndClose?: boolean

  /** Whether to lock body scroll when MessageBox prompts */
  lockScroll?: boolean

  /** Whether to show a cancel button */
  showCancelButton?: boolean

  /** Whether to show a confirm button */
  showConfirmButton?: boolean

  /** Whether to show a close button */
  showClose?: boolean

  /** Whether to use round button */
  roundButton?: boolean

  /** Whether MessageBox can be closed by clicking the mask */
  closeOnClickModal?: boolean

  /** Whether MessageBox can be closed by pressing the ESC */
  closeOnPressEscape?: boolean

  /** Whether to close MessageBox when hash changes */
  closeOnHashChange?: boolean

  /** Whether to show an input */
  showInput?: boolean

  /** Placeholder of input */
  inputPlaceholder?: string

  /** Initial value of input */
  inputValue?: string

  /** Regexp for the input */
  inputPattern?: RegExp

  /** Input Type: text, textArea, password or number */
  inputType?: string

  /** Validation function for the input. Should returns a boolean or string. If a string is returned, it will be assigned to inputErrorMessage */
  inputValidator?: MessageBoxInputValidator

  /** Error message when validation fails */
  inputErrorMessage?: string

  /** Custom element to append the message box to */
  appendTo?: HTMLElement | string
}

export type ElMessageBoxShortcutMethod = ((
  message: ElMessageBoxOptions['message'],
  title: ElMessageBoxOptions['title'],
  options?: ElMessageBoxOptions
) => Promise<MessageBoxData>) &
  ((
    message: ElMessageBoxOptions['message'],
    options?: ElMessageBoxOptions
  ) => Promise<MessageBoxData>)

export interface IElMessageBox {
  /** Show an alert message box */
  alert: ElMessageBoxShortcutMethod

  /** Show a confirm message box */
  confirm: ElMessageBoxShortcutMethod

  /** Show a prompt message box */
  prompt: ElMessageBoxShortcutMethod

  /** Close current message box */
  close(): void
}

// Props
const confirm = (message: string) => {
  message = message
  visible.value = true
}

// Emits
const emit = defineEmits(['update:visible', 'confirm', 'cancel'])

// Reactive state
const visible = ref(true)

// Methods
const handleConfirm = () => {
  emit('confirm')
  visible.value = false // Close the dialog
}

const handleCancel = () => {
  emit('cancel')
  visible.value = false // Close the dialog
}
const stopPropagation = (event: Event) => {
  event.stopPropagation()
}
</script>

<style scoped>
/* Add your CSS styles for MessageBox component */
.message-box-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.message-box {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.message-box-header,
.message-box-footer {
  text-align: center;
}

.message-box-content {
  margin: 20px 0;
}
</style>
