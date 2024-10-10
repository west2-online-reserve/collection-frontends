<!--dialog_header包含：标题、关闭按钮-->
<div class="zt-dialog__header">
    <!--标题-->
    <slot name="title">
      <span class="zt-dialog__title">{{ title }}</span>
    </slot>
    <!--关闭按钮-->
    <button
      type="button"
      class="zt-dialog__headerbtn"
      aria-label="Close"
      v-if="showClose"
      @click="handleClose"
    >
      <i class="zt-dialog__close zt-icon zt-icon-close"></i>
    </button>
  </div>
  <!--中间的内容-->
  <div class="zt-dialog__body" v-if="rendered"><slot></slot></div>
  <!--底部内容-->
  <div class="zt-dialog__footer" v-if="$slots.footer">
    <slot name="footer"></slot>
  </div>
</div>