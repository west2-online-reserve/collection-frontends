<template>
    <div class="show">
        <div class="title">
            <input type="text" value="请输入标题">
            <button>发布</button>
            <img src="/arrow.png" width="25px">
            <RouterLink to="/personInfo"> <img src="/head portrait.png" width="40px"> </RouterLink>
        </div>
        <hr>
       <div class="rest">
        <v-md-editor v-model="text" height="900px"></v-md-editor>
       
       </div>
    </div>
</template>

<script lang="ts" setup name="Write">

import {ref} from 'vue'
const text=ref('')

</script>
<style scoped>
.show{
    height: 1080px;
    width:1685px;
    background-color:white;
}
.title{
    width:1685px;
    height:60px;
}
.title input{
    width:1200px;
    height:57.667px;
    border:none;
    font-family: Microsoft YaHei UI;
    font-weight: 400;
    font-size:36px;
    letter-spacing: 1px;
    color:#86909C;
    outline:none;
    vertical-align: middle;
}
.title button{
    width:77px;
    height:38px;
    background-color: #3B91F4;
    font-family:Roboto;
    font-size: 20px;
    font-weight: 400;
    color:white;
    border:none;
    margin-left: 270px;
    vertical-align: middle;
}
.title img{
    vertical-align: middle;
    margin-left:20px;
}
hr{
    height:1px;
    width: 1685px;
    background-color: #D9D9D9;
    border: none;
    margin-top:0px;
    margin-bottom: 0px;
}
.rest{
    width:1685px;
    height:1019px;
    margin:20px;
}
</style>