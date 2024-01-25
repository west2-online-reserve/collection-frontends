<script lang="ts" setup >
import {useUserStore }from '../stores/user'
import { ElContainer, ElHeader, ElMenu, ElMenuItem, ElMain } from "element-plus"
const store= useUserStore();

</script>

<template>
  <el-container>
    <el-header >
      <el-menu router mode="horizontal">
        <el-menu-item index="/home/todolist" :class="{ 'choose': $route.path === '/home/todolist' }" style="margin-left:5%">TodoList</el-menu-item>
        <el-menu-item index="/home/tableshow"
          :class="{ 'choose': $route.path === '/home/tableshow' }"
          style="margin-left:5%">表格展示</el-menu-item>
        <!---el-avatar无法传入图片？？？-->
        <el-menu-item index="/home/userInfo" style="margin-left:30%" :class="{ 'choose': $route.path === '/home/userInfo' }">
          <img style="border-radius: 50%;height:60px;" src="../assets/img/avatar1.jpg" >
             {{ store.nowuser.username }}
          </el-menu-item>
        <el-menu-item index="/" @click="store.logout()" style="margin-left: 5%;">退出</el-menu-item>
      </el-menu>
    </el-header>
    <el-main style="background-color: #FEFFFF;height: 90%;">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
.el-header {
    background: #DDEBDB;
    height: 8%;
}

.el-menu {
    color: #11240E;
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    height: 8%;
    background-color: #DDEBDB
}

.el-menu-item {
    height: 8%;
    width: 120px;
    font-size: 18px;
    box-sizing: border-box;
    border-bottom: none;
}

.el-menu--horizontal>.el-menu-item.is-active {
    font-weight: 800;
    border-bottom: none;
    color: #11240E !important;
}

.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    border-bottom: none;
    color: #426440;
    background-color: #FEFFFF;
}
.choose {
    font-weight: 800;
    border-bottom: none;
    color: #11240E !important;
}

</style>../stores/user