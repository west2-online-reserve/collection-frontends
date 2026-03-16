<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { getArticles } from '@/api/api';

const articles1 = ref();
const articles2 = ref();

//async和await配合，实现异步操作，保证在接口调用完后才读取值​
const fetchArticlesData = async () => {
  try {
    const data1 = {
      getHottest: 0,
      count: 2,
    };
    const data2 = {
      getHottest: 1,
      count: 2,
    };
    // 在请求之前在localStorage中设置token
    window.localStorage.setItem('token', 'XSOiyesyGQxPFBGTW0evEnvioN3igXS52KWQ7HVfJAw5DWCkxkOwao0T7wqOpGbTJghhsrPdNeYZjvsV5AoqmfRDcZru9N713g9dHmOkAHcYxOfZqH8M+SNH7jwtTZFnfHdsf3gi3kBr1bA/HJ/jMO9IbELboa/dqhANtNr6vfE=');
    // 发送请求
    const response1 = await getArticles(data1);
    const response2 = await getArticles(data2);

    if (response1.data && response1.data.items) {
      articles1.value = response1.data.items;
    }
    if (response2.data && response2.data.items) {
      articles2.value = response2.data.items;
    }
    console.log(response1)
    console.log(window.localStorage.token)
  } catch (err: any) {
    ElMessage.error(err.message || "暂时还没有人发布文章哦");
  }
};

onMounted(() => {
  fetchArticlesData();
});
</script>

<template>
  <div>
    <h1>最新文章列表</h1>
    <div v-for="article in articles1" :key="article.article_id">
      <h2>{{ article.title }}</h2>
      <p>{{ article.content }}</p>
      <p>{{ article.username }}</p>
      <p>{{ article.visit_count }}</p>
      <p>{{ article.like_count }}</p>
    </div>
  </div>

  <div>
    <h1>最热文章排行榜</h1>
    <div v-for="article in articles2" :key="article.article_id">
      <p>
        {{ article.article_id }}
        {{ article.title }}
      </p>
    </div>
    <p>查看更多></p>
  </div>
</template>

<style scoped>

</style>
