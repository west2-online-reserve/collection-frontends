<template>
  <teleport to="body">
    <div v-if="visible" class="message-box-backdrop">
      <div class="message-box">
        <div class="message-box-header">
          <span>{{ title }}</span>
        </div>
        <div class="message-box-content">
          <p>{{ message }}</p>
        </div>
        <div class="message-box-footer">
          <button @click="handleCancel">Cancel</button>
          <button @click="handleConfirm">Confirm</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MessageBox',
  props: {
    title: {
      type: String,
      default: 'Confirm'
    },
    message: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const visible = ref(true)

    const close = () => {
      visible.value = false
    }

    const handleConfirm = () => {
      emit('confirm')
      close()
    }

    const handleCancel = () => {
      emit('cancel')
      close()
    }

    return {
      visible,
      handleConfirm,
      handleCancel
    }
  }
})
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
