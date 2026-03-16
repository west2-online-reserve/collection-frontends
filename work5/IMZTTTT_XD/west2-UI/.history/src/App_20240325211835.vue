<script lang="ts" setup>
import { ref } from 'vue'
const dialogVisible = ref(false)

const handleClose = (done: () => void) => {
  console.log(11)
}
</script>

<template>
  <zt-button size="large" type="primary" @click="dialogVisible = true">按钮</zt-button>
  <zt-dialog v-model="dialogVisible" title="Tips" :before-close="handleClose">
    <span>This is a message</span>
    <template #footer>
      <div class="dialog-footer">
        <zt-button @click="dialogVisible = false" size="small">Cancel</zt-button>
        <zt-button type="primary" @click="dialogVisible = false"> Confirm </zt-button>
      </div>
    </template>
  </zt-dialog>
</template>

<style scoped></style>
