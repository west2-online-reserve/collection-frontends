<script lang="ts" setup>
import ref from 'vue';
import { userStore } from '../stores/userStore';
import { ElMenu,ElHeader,ElMenuItem ,ElAvatar,ElContainer} from 'element-plus';
const loginUser = userStore();
const errorHandle =()=>true;
</script>

<template>
    <div class="layout" >
        <el-container>
            <el-header >
                <el-menu  router mode="horizontal">
                    <el-menu-item index="/home/todolist" style="margin-left: 100px;" :class="{ 'choose': $route.path === '/home/todolist' }">Todolist</el-menu-item>
                    <el-menu-item index="/home/tabledisplay" :class="{ 'choose': $route.path === '/home/tabledisplay' }">表格展示</el-menu-item>
                    <el-menu-item index="/home/userInfo" style="margin-left:100px">
                        <!---el-avatar无法传入图片？？？-->
                        <img  style="border-radius: 50%;height:60px;" src="../assets/img/avatar1.jpg" @error="errorHandle"  :class="{'choose': $route.path==='/home/userInfo'}"></el-menu-item>
                    <el-menu-item style="margin-left: 100px;background: none;width: 150px;">
                        {{ loginUser.getusername() }}
                    </el-menu-item>
                    <el-menu-item @click="loginUser.clearlogin()" index="/login">退出</el-menu-item>
                </el-menu>
            </el-header>
            <el-container style="background-color: #FEFFFF;height: 92vh;">
                <router-view></router-view>
            </el-container>
        </el-container>
    </div>
</template>


<style lang="scss" scoped>
.el-header {
    background: #DDEBDB;
    height: 8vh;
}

.el-menu {
    color: #11240E;
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    height: 8vh;
    background-color: #DDEBDB
}

.el-menu-item {
    height: 8vh;
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

</style>