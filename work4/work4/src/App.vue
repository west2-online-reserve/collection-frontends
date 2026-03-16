<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref, onBeforeMount } from 'vue';

const isDropdownOpen = ref(false);
const router = useRouter();

const changeDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
onBeforeMount(() => {
  router.push({ name: 'home' });
})
</script>

<template>
<div>
    <div class="div1">
      <div class="div2">
        <img src="./pictures/xitujuejin.png">
        <h1>稀土掘金</h1>
      </div>
      <RouterLink to="/home" class="nav-link" active-class="active">首页</RouterLink>
      <div class="div3">
        <RouterLink to="/write" class="nav-link" active-class="active">创作者中心</RouterLink>
        <div class="dropdown" @click="changeDropdown">
          <img src="./pictures/touxiang.png"/>
          <div v-show="isDropdownOpen" class="dropdown-content">
            <img src="./pictures/touxiang.png"/>
            <br>
            <RouterLink to="/my" class="nav-link" active-class="active">我的主页</RouterLink>
          </div>
        </div>
      </div>
    </div>  
</div>
  
<div class="content-container">
<RouterView></RouterView>
</div>

</template>

<style scoped>

.div1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: white;
    margin: 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    height: 40px;
}

.div2 {
  display: flex;
  align-items: center;
}

.div2 img {
  width: 50px;
  height: auto;
  margin-right: 10px
}

.div3 {
  display: flex;
  align-items: center;
}

.div3 img {
  width: 40px;
  height: auto;
  border-radius: 50%;
  border: 2px solid #fff;
  padding: 5px;
  margin-left: 20px
}

.nav-link {
  text-decoration: none;
  color: #000;
}

.nav-link:hover {
  color: #3498db; 
}

.active {
  color: #3498db;
}

.dropdown {
  position: relative;
  cursor: pointer;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  right: 10px;
  display: none;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
}

.dropdown:hover .dropdown-content {
  display: flex;
}

.content-container {
  margin-top: 100px;
}
</style>