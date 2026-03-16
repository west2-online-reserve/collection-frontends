<template>
<!--transition组件可以给任何元素和组件添加进入/离开过渡-->
  <!--after-enter、after-leave是对应的钩子-->
  <transition
    name="dialog-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave">
    <div
      v-show="visible"
      class="el-dialog__wrapper"
     <!-- click.self 只当在 event.target 是当前元素自身时触发处理函数, 即点击弹框背景是触发，点击弹框内部元素不会触发 -->
      @click.self="handleWrapperClick">
      <div
        role="dialog"
        <!--亮点：通过改变key值来销毁div-->
        :key="key"
        aria-modal="true"
        :aria-label="title || 'dialog'"
        :class="['el-dialog', { 'is-fullscreen': fullscreen, 'el-dialog--center': center }, customClass]"
        ref="dialog"
        :style="style">
        <!--dialog_header包含：标题、关闭按钮-->
        <div class="el-dialog__header">
          <!--标题-->
          <slot name="title">
            <span class="el-dialog__title">{{ title }}</span>
          </slot>
          <!--关闭按钮-->
          <button
            type="button"
            class="el-dialog__headerbtn"
            aria-label="Close"
            v-if="showClose"
            @click="handleClose">
            <i class="el-dialog__close el-icon el-icon-close"></i>
          </button>
        </div>
        <!--中间的内容-->
        <div class="el-dialog__body" v-if="rendered"><slot></slot></div>
        <!--底部内容-->
        <div class="el-dialog__footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>

</script>