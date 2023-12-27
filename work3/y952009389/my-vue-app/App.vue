<script setup lang="ts"></script>
<template>
    <div>
        <router-link to="/register">Register</router-link>
        <br>
        <router-link to="/login">Login</router-link>
        <br>
        <router-link to="/todo">TodoList</router-link>
        <br>
        <router-link to="/table">TableView</router-link>
    </div>
    <router-view></router-view>
</template>

