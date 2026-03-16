<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus';
import { Articles } from '@/api/api'
import MarkdownIt from 'markdown-it'

const articleDetails = ref({
    article_id: 0,
    user_id: 0,
    username: "",
    title: "",
    content: "",
    cover_url: "",
    visit_count: 0,
    like_count: 0,
    comment_count: 0,
    created_at: "",
})
const comments = ref([
  {
    comment_id: 0,
    user_id: 0,
    username: "",
    avatar_url: "",
    article_id: 0,
    parent_id: 0,
    like_count: 0,
    child_count: 0,
    content: "",
    created_at: "",
  }
])
const newComment = ref('')
const isLiked = ref(false)
const md = new MarkdownIt()

const fetchArticleDetails = async () => {
    try {
        const data = {
            article_id: '123',
            Authorization: "XSOiyesyGQxPFBGTW0evEnvioN3igXS52KWQ7HVfJAw5DWCkxkOwao0T7wqOpGbTJghhsrPdNeYZjvsV5AoqmfRDcZru9N713g9dHmOkAHcYxOfZqH8M+SNH7jwtTZFnfHdsf3gi3kBr1bA/HJ/jMO9IbELboa/dqhANtNr6vfE=",
        };
        const response = await Articles(data)
        if (response.data) {
            articleDetails.value = response.data.task
            comments.value = response.data.items
  }
    } catch (err: any) {
    ElMessage.error(err.message || "这篇文章很神秘，你看不到他的内容");
  }
}

const parsedContent = computed(() => md.render(articleDetails.value.content))

const toggleLike = () => {
  isLiked.value = !isLiked.value
}

const likeText = computed(() => isLiked.value ? 'Unlike' : 'Like')

const replyToComment = (commentId: number) => {
  // 从评论数组中查找父评论
  const parentComment = comments.value.find(c => c.comment_id === commentId);

  // 创建一个新的评论对象，将parent_id设置为commentId
  const newReply = {
   comment_id: 0,
   user_id: 0,
   username: "Your Username",
   avatar_url: "Your Avatar",
   article_id: articleDetails.value.article_id,
   parent_id: commentId,
   like_count: 0,
   child_count: 0,
   content: newComment.value,
   created_at: new Date().toISOString(),
 };

 // 将新的回复添加到父评论的子评论数组中
 if (parentComment) {
   parentComment.child_count++;
   parentComment.child_comments = parentComment.child_comments || [];
   parentComment.child_comments.push(newReply);
 }

 // 清除newComment输入 
 newComment.value = "";
}

const postComment = () => {
  // 创建一个新的评论对象
  const newCommentObj = {
  comment_id: 0,
  user_id: 0,
  username: "Your Username",
  avatar_url: "Your Avatar",
  article_id: articleDetails.value.article_id,
  parent_id: 0,
  like_count: 0,
  child_count: 0,
  content: newComment.value,
  created_at: new Date().toISOString(),
};

// 将新评论添加到评论数组中
comments.value.push(newCommentObj);

// 增加articleDetails中的评论计数
articleDetails.value.comment_count++;

// 清除newComment输入
newComment.value = "";
}

onMounted(fetchArticleDetails)
</script>
<template>
    <div class="article-page">
    <div class="article-content">
      <h1>{{ articleDetails.title }}</h1>
      <div class="markdown-content" v-html="parsedContent"></div>
      <div class="article-actions">
        <button @click="toggleLike" class="like-button">{{ likeText }} ({{ articleDetails.like_count }})</button>
      </div>
    </div>

    <div class="comments-section">
      <h2>Comments ({{ articleDetails.comment_count }})</h2>
      <textarea v-model="newComment" placeholder="平等表达，友善交流" class="new-comment"></textarea>
      <button @click="postComment" class="post-comment-button">Post Comment</button>
      <div class="comments-list">
        <div v-for="comment in comments" :key="comment.comment_id" class="comment">
          <div class="comment-user">
            <img :src="comment.avatar_url" class="user-avatar" alt="User Avatar">
            <span class="username">{{ comment.username }}</span>
          </div>
          <div class="comment-content">{{ comment.content }}</div>
          <div class="comment-actions">
            <button @click="replyToComment(comment.comment_id)" class="reply-button">Reply</button>
          </div>
          <div v-if="comment.child_count > 0" class="child-comments">
            <div v-for="childComment in comment.child_comments" :key="childComment.comment_id" class="comment">
              <div class="comment-user">
                <img :src="childComment.avatar_url" class="user-avatar" alt="User Avatar">
                <span class="username">{{ childComment.username }}</span>
              </div>
              <div class="comment-content">{{ childComment.content }}</div>
              <div class="comment-actions">
                <button @click="replyToComment(childComment.comment_id)" class="reply-button">Reply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>
<style scoped>
.article-page {
  max-width: 800px;
  margin: auto;
  padding: 1rem;
}

.article-content {
  margin-bottom: 2rem;
}

.markdown-content {
  border: 1px solid #ccc;
  margin-top: 1rem;
  padding: 1rem;
}

.article-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.like-button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.like-button:hover {
  background-color: #0056b3;
}

.comments-section {
  border-top: 1px solid #ccc;
  padding-top: 1rem;
}

.new-comment {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
}

.post-comment-button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #5cb85c;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.post-comment-button:hover {
  background-color: #4cae4c;
}

.comments-list {
  margin-top: 1rem;
}

.comment {
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
}

.comment-user {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.username {
  font-weight: bold;
}

.reply-button {
  padding: 0.25rem 0.5rem;
  margin-top: 0.5rem;
  border: none;
  background-color: #f0ad4e;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.reply-button:hover {
  background-color: #ec971f;
}

.child-comments {
  margin-left: 2rem;
  border-left: 2px solid #ddd;
  padding-left: 1rem;
}
</style>