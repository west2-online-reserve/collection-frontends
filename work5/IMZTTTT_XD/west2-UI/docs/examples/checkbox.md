# Checkbox多选框

1. `checkbox`存在受控和非受控状态，绑定值为`Boolean`（当绑定modelValue为受控状态，随modelValue变化而变化，不绑定为非受控状态，存在其内部逻辑控制变化
2. 存在`checkbox-group`组件，`checkbox-group`元素能把多个 checkbox 管理为一组，使用 `v-model` 绑定 `Array` 类型的变量。`checkbox-group`之间可能不是父子关系，因此请使用Provide和Inject进行跨组件传值，
3. `checkbox-group`可以使用 `min` 和 `max` 属性能够限制可以被勾选的项目的数量
4. `checkbox`的实际`disabled`状态取决于其本身的`disabled`属性和`checkbox-group`的`disabled`属性

## 基础用法

:::demo
```vue
<template>
<zt-checkbox label="A" v-model="checked1"></zt-checkbox>
<zt-checkbox label="B" v-model="checked2"></zt-checkbox>
<zt-checkbox label="C" v-model="checked3" disabled></zt-checkbox>
</template>

<script setup>
import { ref } from 'vue'
const checked1 = ref(false)
const checked2 = ref(true)
const checked3 = ref(false)

</script>

```
:::


#### Checkbox属性

| 属性名                | 说明                                                   | 类型      | 默认值 |
| :-------------------- | :----------------------------------------------------- | :-------- | :----- |
| model-value / v-model | 选中项绑定值                                           | `boolean` | —      |
| label                 | 选中状态的值（只有在`checkbox-group`时有效），选项标签 | `string`  | —      |
| checked               | 非受控状态下当前是否勾选                               | `boolean` | false  |
| disabled              | 是否禁用                                               | `boolean` | false  |

#### Checkbox事件

| 事件名 | 说明                     | 类型                              |
| :----- | :----------------------- | :-------------------------------- |
| change | 当绑定值变化时触发的事件 | `Function`(value: string) => void |

#### Checkbox插槽

| 插槽名  | 说明                                      |
| :------ | :---------------------------------------- |
| default | 自定义默认内容，不存在时使用label属性的值 |

## 多选框组

:::demo
```vue
<template>
<zt-checkgroup v-model="checked" :max="4" :min="1">
<zt-checkbox label="A"></zt-checkbox>
<zt-checkbox label="B"></zt-checkbox>
<zt-checkbox label="C"></zt-checkbox>
<zt-checkbox label="D"></zt-checkbox>
<zt-checkbox label="E"></zt-checkbox>
</zt-checkgroup>
</template>

<script setup>
import { ref } from 'vue'
const checked = ref(['A','B'])
</script>

```
:::

#### CheckboxGroup属性

| 属性名                | 说明                           | 类型      | 默认值 |
| :-------------------- | :----------------------------- | :-------- | :----- |
| model-value / v-model | 绑定值                         | string[]  | []     |
| disabled              | 是否禁用                       | `boolean` | false  |
| min                   | 可被勾选的 checkbox 的最小数量 | `number`  | —      |
| max                   | 可被勾选的 checkbox 的最大数量 | `number`  | —      |

#### CheckboxGroup事件

| 事件名 | 说明                     | 类型                                |
| :----- | :----------------------- | :---------------------------------- |
| change | 当绑定值变化时触发的事件 | `Function`(value: string[]) => void |

#### CheckboxGroup插槽

| 插槽名  | 说明           | 子标签   |
| :------ | :------------- | :------- |
| default | 自定义默认内容 | Checkbox |