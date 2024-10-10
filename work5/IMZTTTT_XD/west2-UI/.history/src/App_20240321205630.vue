<script setup>
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
  <zt-button size="large" type="danger">按钮</zt-button>
  <zt-dialog></zt-dialog>
</template>

<style scoped></style>
