<template>
    <div class="navigate">
    <span>个人资料</span>
</div>
<div class="content">
    <div class="info"><span>基本信息</span></div>
    <div class="input">
        <img src="/sign.png" width="6px">
        <span>用户名</span>
        <input type="text" v-model="name" @click="getData()">
        <button>修改</button>
    </div>
    <div class="input">
        <span>&nbsp;&nbsp;&nbsp;</span>
        <img src="/sign.png" width="6px">
        <span>手机</span>
        <input type="text">
        <button>绑定</button>
    </div>
    <div class="input">
        <span>&nbsp;&nbsp;&nbsp;</span>
        <img src="/sign.png" width="6px">
        <span>微信</span>
        <input type="text">
        <button>绑定</button>
    </div>
</div>
<div class="head_portrait">
    <img v-if="src" :src="src" alt="Image" class="shadow-md rounded-xl w-full sm:w-64" width="140px" height=140px style="margin-top:20px;margin-left: 140px;border-radius: 50%;border-width: 6px;border-color: #EEEEEE;border-style: solid;" />
    <FileUpload mode="basic" @select="onFileSelect" customUpload auto severity="secondary" class="p-button-outlined" choose-label="上传头像"
    style="background-color: white;width:80px;height:29px;border-radius:9px;border-width: 1.5px;border-style: solid;border-color: #EEEEEE;margin-top: 20px;margin-left:-90px;
    color:#444444;font-weight: 400;font-family: Microsoft YaHei UI;letter-spacing: 1px;font-size: 14px;"/>
    
</div>
</template>

<script setup lang="ts" name="Info">
import FileUpload from 'primevue/fileupload'
import {ref} from 'vue'
import axios from 'axios'
const name=ref('')

const src = ref(null);
async function getData(){
    const res=await axios({
        url:"http://localhost:8080/users/updateName",
        method:"POST",
        data:{
            id:'2',
            name:name.value
        }
    })
    console.log(res)
}
function onFileSelect(event:any) {
    const file = event.files[0];
    const reader = new FileReader();

    reader.onload = async (e:any) => {
        src.value = e.target.result;
    };

    reader.readAsDataURL(file);
}
</script>
<style scoped>
.navigate{
    width:1196px;
    height:62px;
    background-color: white;
    margin-bottom:1.5px;
}
.navigate span{
    font-family: Microsoft YaHei UI;
    font-weight: 700;
    font-size: 20px;
    letter-spacing: 1px;
    line-height: 62px;
    color:#272636;
    margin-left:13px;
}
.content{
    width:680px;
    height:656px;
    background-color: white;
    overflow: hidden;
    float:left;
}
.info{
    margin-top:15px;
    margin-left:10px;
}
.info span{
    font-family: Microsoft YaHei UI;
    font-weight: 400;
    font-size: 16px;
    letter-spacing: 1px;
    color:black;
    margin-left:10px;
}
.input{
    margin-top:30px;
    margin-left:30px;
}
.input img{
    vertical-align: middle;
    margin-right: 5px;
}
.input span{
    vertical-align: middle;
}
input{
    width: 476px;
    height:34px;
    background-color: #F0F1F2;
    border-radius: 2px;
    border:none;
    margin-left:20px;
    outline: none;
}
input:hover{
    width: 476px;
    height:34px;
    background-color: #F0F1F2;
    border-radius: 2px;
    border-color:#3B91F4;
    border-style: solid;
    border-width: 1px;
    margin-left:20px;
    outline: none;
}
.input button{
    width:70px;
    height:20px;
    background-color: white;
    border:none;
    color:#3B91F4;
    font-family: Microsoft YaHei UI;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 1px;

}
.head_portrait{
    width:516px;
    height:656px;
    background-color: white;
    overflow: hidden;
    float:left;
}
.head_portrait .button{
    width:76px;
    height:29px;
    border-radius: 9px;
    border-width:1.5px;
    border-style:solid;
    border-color: #EEEEEE;
}

</style>