<template>
    <Top />
    <div class="show">
        <div class="back">
            <div><RouterLink to="/personInfo">< &nbsp; 返回个人主页</RouterLink></div>
        </div>
        <div class="rest">
            <div class="rest_left">
                <div>
                    <img v-show="!info" @click="info_isShow" src="/info.png" height="50px" width="220px">
                    <img v-show="info" @click="info_isShow" src="/info_click.png" height="50px" width="220px">
                </div>
                <div>
                    <img v-show="!mm" @click="mm_isShow" src="/mm.png" height="50px" width="220px">
                    <img v-show="mm" @click="mm_isShow" src="/mm_click.png" height="50px" width="220px">
                </div>
            </div>
            <div class="rest_right" v-show="info">
                <Info />
            </div>
            <div class="rest_right" v-show="mm">
                <Mm />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup name="Settings">
import Top from '@/components/Top.vue'
import Info from '@/components/Info.vue'
import Mm from '@/components/Mm.vue'
import { RouterLink } from 'vue-router'
import {ref} from 'vue'
const info=ref(true)
const mm=ref(false)
function info_isShow(){
    info.value=true
    mm.value=false
}
function mm_isShow(){
    info.value=false
    mm.value=true
}
</script>

<style scoped>
.show{
    height: 1080px;
    width:1685px;
    background-color:#F0F1F2;
    overflow:hidden;
}
.back{
    width:1482px;
    height:62px;
    background-color:white;
    margin-top:30px;
    margin-left:101.5px;
    overflow: hidden;
}
.back div{
    width:150px;
    height:20px;
    margin-left: 20px;
    margin-top: 20px;
}
.back div a{
    text-decoration: none;
    font-family: Microsoft YaHei UI;
    font-weight: 400;
    font-size: 16px;
    letter-spacing: 1px;
    line-height: 20px;
    color:#3B91F4;
}
.rest{
    width:1482px;
    height:874px;
    margin-left: 101.5px;
    margin-top:20px;
}
.rest_left{
    width:240px;
    height:591px;
    background-color: white;
    float: left;
}
.rest_left div{
    margin-left:10px;
    margin-top: 5px;
}
.rest_right{
    width:1196px;
    height:879px;
    overflow: hidden;
    float:left;
    margin-left:46px;
}

</style>