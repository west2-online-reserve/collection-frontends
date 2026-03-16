# Input 输入框

通过鼠标或键盘输入字符

## 基础用法

基础的按钮用法。

:::demo

```vue
<template>
  <w-input v-model="input" style="width: 240px" placeholder="Please input" />
</template>

<script setup>
import { ref } from 'vue'
const input = ref('')
</script>
```

:::

**Props**

| 参数               | 说明           | 类型            | 可选值                 | 默认值 |
| ------------------ | -------------- | --------------- | ---------------------- | ------ |
| modelValue/v-model | 输入框的绑定值 | String / Number | —                      | ''     |
| disabled           | 是否禁用输入框 | Boolean         | —                      | false  |
| size               | 输入框尺寸     | String          | small / medium / large | medium |
| placeholder        | 占位提示文字   | String          | —                      | ''     |

**Events**

| 事件名 | 说明                                 | 回调参数              |
| ------ | ------------------------------------ | --------------------- |
| change | 当输入框内容发生改变并失去焦点后触发 | 新的输入框值（value） |
| focus  | 当输入框获得焦点时触发               | 事件对象（event）     |
| blur   | 当输入框失去焦点时触发               | 事件对象（event）     |

注意：在实际使用过程中，`modelValue` 属性遵循 Vue3 的单向数据流原则，通过 `v-model` 指令进行双向绑定。
