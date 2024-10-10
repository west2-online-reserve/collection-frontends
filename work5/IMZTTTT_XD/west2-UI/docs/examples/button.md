# Button 按钮

1. 按照配置生成多种样式（大小，颜色，禁用状态）

## 基础用法
:::demo
```vue
<template>
  <zt-button>Default</zt-button>
  <zt-button type="primary">Primary</zt-button>
  <zt-button type="success">Success</zt-button>
  <zt-button type="warning">Warning</zt-button>
  <zt-button type="danger">Danger</zt-button>
  <zt-button type="info">Info</zt-button>
</template>
```
:::

## 不同尺寸

:::demo
```vue
<template>
  <zt-button size="large">Large</zt-button>
  <zt-button>Default</zt-button>
  <zt-button size="small">Small</zt-button>
</template>
<script setup>

</script>
```
:::
## 禁用

:::demo
```vue
<template>
  <zt-button type="primary" disabled>禁用</zt-button>
</template>
```
:::

## 圆角

:::demo
```vue
<template>
  <zt-button type="primary" round>圆角</zt-button>
</template>
```
:::
## API

#### 属性

| 属性名   | 说明               | 类型                                                    | 默认值    |
| :------- | :----------------- | :------------------------------------------------------ | :-------- |
| size     | 尺寸               | `'large'`/`'default'`/`'small'`                         | 'default' |
| type     | 类型               | `'primary'`/`'success'`/`'warning'`/`'danger'`/`'info'` | 'info'    |
| round    | 是否为圆角按钮     | `boolean`                                               | false     |
| disabled | 按钮是否为禁用状态 | `boolean`                                               | false     |

#### 插槽

| 插槽名  | 说明           |
| :------ | :------------- |
| default | 自定义默认内容 |
