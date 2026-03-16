# Pagination 分页

1. 分页分为受控状态和非受控状态
2. 编写`prev`, `pager`, `next`, `jumper`, `total`五个组件，他们的功能分别是上一页，页码列表，下一页，跳页元素，总条目数，显示顺序按照上述进行排列，相互之间具有联动功能，`pager`和`total`可以直接使用ElementPlus的`Select`和`Input`组件，方便组件编写
3. 总页数过大时，Pagination 应该能折叠多余的页码按钮。 通过 `pager-count` 属性可以设置最大页码按钮数

## 基础用法


:::demo

```vue
<template>
<zt-pagination :total="400" >
</zt-pagination>
</template>

```
:::
#### 属性

| 属性名                              | 说明                                                         | 类型             | 默认值                    |
| :---------------------------------- | :----------------------------------------------------------- | :--------------- | :------------------------ |
| page-size / v-model:page-size       | 每页显示条目个数                                             | `number`         | —                         |
| total                               | 总条目数                                                     | `number`         | —                         |
| page-count                          | 总页数， `total` 和 `page-count` 设置任意一个就可以达到显示页码的功能；如果要支持 `page-sizes` 的更改，则需要使用 `total` 属性 | `number`         | —                         |
| pager-count                         | 设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠 | `number`（奇数） | 7                         |
| page-sizes                          | 每页显示个数选择器的选项设置                                 | `number[]`       | [10, 20, 30, 40, 50, 100] |
| current-page / v-model:current-page | 当前页数                                                     | `number`         | —                         |
| default-page-size                   | 非受控条件时，每页默认的条目个数                             | `number`         | 10                        |
| default-current-page                | 非受控条件时，当前页数的默认初始值                           | `number`         | 1                         |