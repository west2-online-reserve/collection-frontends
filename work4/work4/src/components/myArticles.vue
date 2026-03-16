<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { getMyArticles } from '@/api/api';

const articles = ref();

//async和await配合，实现异步操作，保证在接口调用完后才读取值​
const fetchMyArticlesData = async () => {
  try {
    const data = {
      getWrittenArticle: 1,
      Authorization: "XSOiyesyGQxPFBGTW0evEnvioN3igXS52KWQ7HVfJAw5DWCkxkOwao0T7wqOpGbTJghhsrPdNeYZjvsV5AoqmfRDcZru9N713g9dHmOkAHcYxOfZqH8M+SNH7jwtTZFnfHdsf3gi3kBr1bA/HJ/jMO9IbELboa/dqhANtNr6vfE=",
    };

    const response = await getMyArticles(data);

    if (response.data && response.data.items) {
      articles.value = response.data.items;
    }
  } catch (err: any) {
    ElMessage.error(err.message || "你还没有写过文章哦");
  }
};

onMounted(() => {
  fetchMyArticlesData();
});
</script>

<template>
  <div v-for="article in articles" :key="article.article_id">
    <h2>{{ article.title }}</h2>
    <p>{{ article.content }}</p>
    <p>{{ article.created_at }}</p>
    <p>点赞</p>
    <p>评论</p>
  </div>
</template>

<style scoped>

</style>