<template>
   <div class="navigate_rest">
            <div :class="{click:!check1,clicked:check1}"><a to="#" @click="recommend_isShow" >推荐</a></div>
            <div :class="{click:!check2,clicked:check2}"><a to="#" @click="latest_isShow" >最新</a></div>
            <div :class="{click:!check3,clicked:check3}"><a to="#" @click="list_isShow" >文章榜</a></div>
    </div>
    <div class="article" v-show="check1">
        <Recommend />
    </div>
    <div class="article" v-show="check2">
        <Latest></Latest>
    </div>
    <div class="article" v-show="check3">
        <List />
    </div>
</template>

<script lang="ts" setup name="Comprehensive">
import {ref} from 'vue'
import Recommend from './Recommend.vue'
import Latest from './Latest.vue'
import List from '@/components/List.vue'
const check1=ref(true)
const check2=ref(false)
const check3=ref(false)
function recommend_isShow(){
    check1.value=true
    check2.value=false
    check3.value=false
}
function latest_isShow(){
    check1.value=false
    check2.value=true
    check3.value=false
}
function list_isShow(){
    check1.value=false
    check2.value=false
    check3.value=true
}
</script>

<style scoped>
.navigate_rest{
    height:30px;
    float:left;
    font-family: Microsoft YaHei UI;
    overflow: hidden;
}
.navigate_rest div{
    width:70px;
    height:25.7px;
    margin-right:20px;
    float:left;
    text-align: center;
}
.click{
    text-decoration: none;
    color:#333333;
    font-weight: 400;
    font-size: 20px;
    letter-spacing: 1px;
}
.clicked{
    width:70px;
    height:25.7px;
    font-weight: 400;
    font-size: 20px;
    letter-spacing: 1px;
    line-height: 20px;
    border-radius:20px;
    text-decoration: none;
    color:white;
    background-color:#333333;
}
.navigate_rest div:hover{
    width:70px;
    height:25.7px;
    font-weight: 400;
    font-size: 20px;
    letter-spacing: 1px;
    line-height: 20px;
    border-radius:20px;
    text-decoration: none;
    color:#333333;
    background-color:#E5E4E4;
}
.article{
    width:844px;
    height:1500px;
    background-color:#F0F1F2;
    float:left;
    overflow: hidden;
}

</style>