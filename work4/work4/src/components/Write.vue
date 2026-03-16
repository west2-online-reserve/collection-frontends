<script setup lang="ts">
import { ref, computed } from 'vue'
import MarkdownIt from 'markdown-it'
import { ElMessage } from 'element-plus';
import { writeArticles } from '@/api/api';

const md = new MarkdownIt()
const title = ref('')
const content = ref('')
const cover_url = ref('')

const compiledMarkdown = computed(() => {
  return md.render(content.value)
})

const publishArticle = async () => {
  try {
    const data = {
      Authorization: "XSOiyesyGQxPFBGTW0evEnvioN3igXS52KWQ7HVfJAw5DWCkxkOwao0T7wqOpGbTJghhsrPdNeYZjvsV5AoqmfRDcZru9N713g9dHmOkAHcYxOfZqH8M+SNH7jwtTZFnfHdsf3gi3kBr1bA/HJ/jMO9IbELboa/dqhANtNr6vfE=",
      title: title.value,
      content: content.value,
      cover_url: cover_url.value,
    };

    const response = await writeArticles(data);

    alert(response.base.msg)
  } catch (err: any) {
    ElMessage.error(err.message || "发布失败");
  }
}
</script>

<template>
  <div class="editor-container">
    <input type="text" v-model="title" placeholder="输入文章标题..." class="title-input" />

    <div class="markdown-editor">
      <textarea v-model="content" class="markdown-input" placeholder="请输入..."></textarea>
      <div class="markdown-preview" v-html="compiledMarkdown"></div>
    </div>

    <button @click="publishArticle" class="publish-button">发布</button>
  </div>
</template>

<style scoped>
.editor-container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px;
  max-width: 800px;
}

.title-input {
  margin-bottom: 20px;
  padding: 10px;
  font-size: 1.2em;
}

.markdown-editor {
  display: flex;
}

.markdown-input {
  flex: 1;
  padding: 10px;
  margin-right: 20px;
  height: 300px;
  border: 1px solid #ccc;
  resize: vertical;
}

.markdown-preview {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
  overflow-y: auto;
  height: 300px;
}

.publish-button {
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 1em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.publish-button:hover {
  background-color: #0056b3;
}
</style>