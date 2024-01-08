<template>
    <el-button plain @click="open1"> Closes automatically </el-button>
    <el-button plain @click="open2"> Won't close automatically </el-button>

    <el-button :plain="true" @click="open">Show message</el-button>
    <el-button :plain="true" @click="openVn">VNode</el-button>

    <el-button text @click="dialogVisible = true">
        click to open the Dialog
    </el-button>

    <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
    :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>

  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import { h } from 'vue'
  import { ElNotification } from 'element-plus'
  import { ElMessage } from 'element-plus'
  import { ElMessageBox } from 'element-plus'

  const dialogVisible = ref(false)
  
  const open1 = () => {
    ElNotification({
      title: 'Title',
      dangerouslyUseHTMLString: false,
      message: h('i', { style: 'color: teal' }, 'This is a reminder'),
      type: 'success', // warning info error
      position: 'bottom-right',
      offset: 100,
      showClose: false,
    })
  }
  
  const open2 = () => {
    ElNotification({
      title: 'Prompt',
      message: 'This is a message that does not automatically close',
      duration: 0,
    })
  }

  const open = () => {
  ElMessage('this is a message.')
}

const openVn = () => {
  ElMessage({
    message: h('p', null, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode'),
    ]),
    center: true,
    grouping: true,
  })
}

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
  