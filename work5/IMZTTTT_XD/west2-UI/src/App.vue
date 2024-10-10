<script lang="ts" setup>
import { ref } from 'vue'

const dialogVisible = ref(true)
const handleClose = (done: () => void) => {
  alert('确认关闭哦')
  done()
}
const checked1 = ref(true)

const checked = ref(['A', 'B'])
</script>

<template>
  <zt-button type="primary" @click="dialogVisible = true">按钮</zt-button>
  <zt-dialog v-model="dialogVisible" title="Tips" :before-close="handleClose">
    <span>This is a message</span>
    <template #footer>
      <div class="dialog-footer">
        <zt-button @click="dialogVisible = false" size="small">Cancel</zt-button>
        <zt-button type="primary" @click="dialogVisible = false" size="small"> Confirm </zt-button>
      </div>
    </template>
  </zt-dialog>

  <zt-checkbox label="A"></zt-checkbox>

  <zt-pagination :total="10"> </zt-pagination>
</template>
