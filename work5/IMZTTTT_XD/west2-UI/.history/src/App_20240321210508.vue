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
  <zt-button size="large" type="primary" @click="dialogVisible = true">对话框</zt-button>
  <zt-dialog
    v-model="dialogVisible"
    title="Tips"
    width="500"
    :before-close="handleClose"
  ></zt-dialog>
</template>

<style scoped></style>
