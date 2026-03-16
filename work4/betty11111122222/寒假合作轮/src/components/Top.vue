<template>
<div class="top">
    <div class="logo_text" ><RouterLink to="/mainPage"><img src="/logo.png" height=90px style="vertical-align: middle;"></RouterLink>技创未来</div>
    <div class="title"><RouterLink to="/mainPage">首页</RouterLink></div>
    <div class="search">
        <img  class="search_btn" src="/search.png" height=23px> 
        <input type="text" class="search_input" />
    </div>
    <div class="post">
        <div>
            <img class="post_pic" src="/Bell.png" height=30px>
            <button class="post_btn" @click="post()">+发布</button>
        </div>
        <div @click="block()" @mouseleave="cancel()">
            <img class="headPortrait" src="/head portrait.png" height="40px">
            <div v-show="menu_isShow">
                <RouterLink to="/personInfo">我的主页</RouterLink>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts" setup name="Top">
import {RouterLink,useRouter} from 'vue-router'
import { ref }from 'vue'
let router=useRouter()
let menu_isShow=ref(false)
function post(){
    router.push('/write')
}
function block(){
    menu_isShow.value=true
}
function cancel(){
    menu_isShow.value=false
}
</script>

<style scoped>
.top{
    height:80px;
    width:1685px;
    background-color:white;
}
.logo_text{
    height:80px;
    font-family: Microsoft JhengHei UI;
    font-weight: 700;
    font-size: 25px;
    letter-spacing: 1px;
    margin-top: 15px;
    float:left;
}
.title{
    height:80px;
    font-size:23px;
    float:left;
    margin-top:25px;
    margin-left:200px;
    line-height:62px;
    font-family: Microsoft YaHei UI;
}
.title a{
    text-decoration: none;
    color:#3B91F4;
}
.search{
    height:40px;
    float:left;
    margin-top:40px;
    margin-left:770px;
    margin-right:20px;
}
.search_btn{
    vertical-align: middle;
    margin-right: 10px;
}
.search_input{
    width:150px;
    height:25px;
    background-color: #F0F1F2;
    border-radius: 5px;
    border-color: #F0F1F2;
    border:none;
    vertical-align: middle;
}
.post{
    height:40px;
    float:left;
    margin-top:30px;
}
.post div{
    float:left
}
.post_pic{
    margin-right:20px;
    vertical-align: middle;
}
.post_btn{
    height:48px;
    width:119px;
    background-color: white;
    border-color: rgba(153,153,153,0.4);
    border-style:solid;
    border-width: 1.5px;
    border-radius: 9px;
    font-weight: 400;
    font-size: 22px;
    line-height: 20px;
    letter-spacing: 1px;
    font-family: Microsoft YaHei UI;
    color:#999999;
    vertical-align: middle;
}
.post_btn:hover{
    height:48px;
    width:119px;
    background-color: white;
    border-color: #3B91F4;
    border-style:solid;
    border-width: 1.5px;
    border-radius: 9px;
    font-weight: 400;
    font-size: 22px;
    line-height: 20px;
    letter-spacing: 1px;
    font-family: Microsoft YaHei UI;
    color:#3B91F4;
    vertical-align: middle;
}
.headPortrait{
    position: absolute;
    margin-left:20px;
    margin-top:2px;
}
.post div div{
    width:75px;
    height:30px;
    background-color: white;
    margin-left:10px;
    margin-top:60px;
    text-align: center;
}
.post div div:hover{
    width:75px;
    height:30px;
    background-color: #E5E4E4;
    margin-left:10px;
    margin-top:60px;
    text-align: center;
}
.post div div a{
    text-decoration: none;
    color:#3B91F4;
}
</style>
