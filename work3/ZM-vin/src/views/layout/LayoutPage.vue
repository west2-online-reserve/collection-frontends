<script setup>
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
</script>
<template>
        <el-container>
            <!--Banner-->
            <el-header>
                <el-menu
                active-text-color="#ca64ea"
                background-color="#9b9ebf"
                text-color="white"
                mode="horizontal"
                :default-active="$route.path"
                router
                >
                    <el-menu-item index="/todolist">TodoList</el-menu-item>
                    <el-menu-item index="/listshow">表格展示</el-menu-item>
                    <div class="flex-grow" />
                    <el-menu-item>
                        {{ userStore.name }}
                    </el-menu-item>
                    <el-menu-item index="/login">退出</el-menu-item>
            </el-menu>
            </el-header>
            <!--TodoList页面 or 表格展示页面-->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
</template>
<style>
.flex-grow {
  flex-grow: 1;
}
</style>