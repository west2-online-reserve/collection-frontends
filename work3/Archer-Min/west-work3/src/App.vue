<!-- App.vue -->
<template>
    <div id="app">
      <router-view /> <!-- 这里用于展示路由组件 -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'App'
  };
  </script>
  
  <style>
  /* 全局样式 */
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
  }
  </style>
  