<template>
  <div class="editor-page">
    <!-- 顶部导航栏 -->
    <div class="top-bar">
      <input
        v-model="title"
        type="text"
        placeholder="请输入文章标题..."
        class="title-input"
      />
      <div class="actions">
        <span class="tip">文章将自动保存至草稿</span>
        <button class="btn draft-btn" @click="saveDraft">草稿箱</button>
        <button class="btn publish-btn" @click="publishArticle">发布</button>
        <div class="avatar"></div>
      </div>
    </div>

    <!-- 编辑器主体 -->
    <div class="editor-body">
      <!-- 左侧编辑区 -->
      <textarea 
        v-model="content" 
        class="editor-textarea"
        :placeholder="demoPlaceholder"
      ></textarea>

      <!-- 右侧预览区 -->
      <div class="preview-area" ref="previewRef"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { marked } from 'marked'

const title = ref('')
const content = ref('')
const previewRef = ref(null)

// 示例文案
const demoPlaceholder = `# 欢迎使用Markdown编辑器
## 二级标题
这是一段普通文本，支持**加粗**、*斜体*、[链接](https://www.baidu.com)

### 列表示例
- 无序列表1
- 无序列表2
1. 有序列表1
2. 有序列表2

### 代码示例
\`\`\`go
// Go语言示例代码
package main
import "fmt"

func main() {
    fmt.Println("Hello World!")
}
\`\`\``

// 初始化右侧先渲染示例预览
nextTick(() => {
  if (previewRef.value) {
    previewRef.value.innerHTML = marked.parse(demoPlaceholder)
  }
})

// 监听输入
watch(content, (val) => {
  // 输入为空：依旧显示示例预览
  if (!val.trim()) {
    previewRef.value.innerHTML = marked.parse(demoPlaceholder)
  } else {
    // 输入内容：渲染自己输入的
    previewRef.value.innerHTML = marked.parse(val)
  }
})

// 发布
const publishArticle = () => {
  if (!title.value.trim() || !content.value.trim()) {
    alert('标题和内容不能为空')
    return
  }
  alert('发布成功！')
  title.value = ''
  content.value = ''
}
</script>

<style scoped>
.editor-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid #eee;
}
.title-input {
  width: 60%;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
}
.actions {
  display: flex;
  align-items: center;
  gap: 15px;
}
.tip {
  color: #999;
  font-size: 12px;
}
.btn {
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.draft-btn {
  background: #fff;
  border: 1px solid #1E80FF;
  color: #1E80FF;
}
.publish-btn {
  background: #1E80FF;
  color: #fff;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #eee;
}
.editor-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}
.editor-textarea {
  flex: 1;
  padding: 20px;
  border: none;
  border-right: 1px solid #eee;
  outline: none;
  resize: none;
  background: #f5f7fa;
  font-size: 14px;
}
.editor-textarea::placeholder {
  color: #999;
  line-height: 1.8;
}
.preview-area {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
/* 给预览区加了一些基础样式 */
.preview-area :deep(h1) { font-size: 28px; margin: 16px 0; }
.preview-area :deep(h2) { font-size: 24px; margin: 14px 0; border-bottom: 1px solid #eee; padding-bottom: 8px; }
.preview-area :deep(h3) { font-size: 20px; margin: 12px 0; }
.preview-area :deep(p) { line-height: 1.8; margin: 8px 0; }
.preview-area :deep(pre) { background: #f5f7fa; padding: 16px; border-radius: 4px; overflow-x: auto; }
.preview-area :deep(code) { font-family: Consolas, monospace; }
.preview-area :deep(ul), .preview-area :deep(ol) { padding-left: 20px; line-height: 1.8; }
</style>