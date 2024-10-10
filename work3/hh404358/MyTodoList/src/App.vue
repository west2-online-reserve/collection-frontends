<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <RouterView />
</template>

<style scoped>


@media (min-width: 1024px) {
  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100%;
    padding: 0;
    background-color: #DDEBDB;

  }

}
</style>
