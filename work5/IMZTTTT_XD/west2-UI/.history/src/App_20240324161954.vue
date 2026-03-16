<script lang="ts" setup>
import { ref } from 'vue'
const dialogVisible = ref(false)

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
</script>

<template>
  <zt-button size="large" type="primary" @click="dialogVisible = true">按钮</zt-button>
  <zt-dialog v-model="dialogVisible" title="Tips" width="500" :before-close="handleClose">
    <span>This is a message</span>
    <template #footer>
      <div class="dialog-footer">
        <zt-button @click="dialogVisible = false">Cancel</zt-button>
        <zt-button type="primary" @click="dialogVisible = false"> Confirm </zt-button>
      </div>
    </template>
  </zt-dialog>
</template>

<style scoped></style>
