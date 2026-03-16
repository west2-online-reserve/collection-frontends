<template>
    <Top />
    <div class="show">
        <div class="content">
            <div class="content_left">
                <div class="head">
                    <img class="headPortrait" src="/head_portrait2.png" height="80px">
                    <span>愿为出海月</span>
                </div>
                <input type="text" value="请输入个人简介" >
                <img src="/numbers.png" width="252px" height="46px">
                <RouterLink to="/settings"><img src="/settings.png" width="252px" height="37px"></RouterLink>
                <RouterLink to="/write"><img src="/article.png" width="115px" height="42px"></RouterLink>
                <RouterLink to="/write"><img class="note" src="/note.png" width="115px" height="42.5px"></RouterLink>
                <div class="achievement">
                    <span>成就徽章</span>
                </div>
            </div>
            <div class="content_right">
                <div class="right_navigate">
                    <a to="#" :class="{click:check1,clicked:!check1}" @click="post_isShow" >发布</a>
                    <a to="#" :class="{click:check2,clicked:!check2}" @click="note_isShow" >笔记</a>
                    <a to="#" :class="{click:check3,clicked:!check3}" @click="draft_isShow" >草稿箱</a>
                    <a to="#" :class="{click:check4,clicked:!check4}" @click="like_isShow" >点赞</a>
                    <a to="#" :class="{click:check5,clicked:!check5}" @click="comment_isShow" >评论</a>
                </div>
                <div class="line"><hr></div>
                <div class="articles" v-show="post"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup name="PersonInfo">
import Top from '@/components/Top.vue'
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
const post=ref(true)
const note=ref(false)
const draft=ref(false)
const like=ref(false)
const comment=ref(false)
const check1=ref(false)
const check2=ref(true)
const check3=ref(true)
const check4=ref(true)
const check5=ref(true)
function post_isShow(){
    check1.value=false
    check2.value=true
    check3.value=true
    check4.value=true
    check5.value=true
    post.value=true
    note.value=false
    draft.value=false
    like.value=false
    comment.value=false
}
function note_isShow(){
    check1.value=true
    check2.value=false
    check3.value=true
    check4.value=true
    check5.value=true
    post.value=false
    note.value=true
    draft.value=false
    like.value=false
    comment.value=false
}
function draft_isShow(){
    check1.value=true
    check2.value=true
    check3.value=false
    check4.value=true
    check5.value=true
    post.value=false
    note.value=false
    draft.value=true
    like.value=false
    comment.value=false
}
function like_isShow(){
    check1.value=true
    check2.value=true
    check3.value=true
    check4.value=false
    check5.value=true
    post.value=false
    note.value=false
    draft.value=false
    like.value=true
    comment.value=false
}
function comment_isShow(){
    check1.value=true
    check2.value=true
    check3.value=true
    check4.value=true
    check5.value=false
    post.value=false
    note.value=false
    draft.value=false
    like.value=false
    comment.value=true
}
</script>

<style scoped>
.show{
    height: 1080px;
    width:1685px;
    background-color:#F0F1F2;
    overflow: hidden;
}
.content{
    height:1020px;
    width:1359px;
    background-color:white;
    margin-top:60px;
    margin-left:163px;
    overflow: hidden;
}
.content_left{
    height:1020px;
    width:252px;
    float:left;
    margin-left:66px;
}
.head{
    width:252px;
    height:80px;
    margin-top: 55px;
}
.headPortrait{
    vertical-align: middle;
}
.head span{
    vertical-align: middle;
    font-family: Microsoft YaHei UI;
    font-weight:400;
    font-size: 20px;
    line-height: 20px;
    letter-spacing: 1px;
    margin-left:10px;
}
.content_left input{
    width:251px;
    height:34px;
    border-style: solid;
    border-radius: 5px;
    border-width: 1px;
    border-color: #E0E2E5;
    margin-top:25px;
    font-family: Microsoft YaHei UI;
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    letter-spacing: 1px;
    color:black;
    outline:none;
}
.content_left input:hover{
    width:251px;
    height:34px;
    border-style: solid;
    border-radius: 5px;
    border-width: 1px;
    border-color: #3C95EE;
    margin-top:25px;
    font-family: Microsoft YaHei UI;
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    letter-spacing: 1px;
    color:black;
    outline:none;
}
.content_left img{
    margin-top:20px;
}
.note{
    margin-left:20px;
}
.achievement{
    width:252px;
    height:126px;
    border-radius: 5px;
    border-width: 1.5px;
    border-style: solid;
    border-color: #E0E2E5;
    color:black;
    font-family: Microsoft YaHei UI;
    font-weight: 400;
    font-size: 14px;
    line-height: 40px;
    letter-spacing: 1px;
    margin-top:20px;
}
.achievement span{
    margin-left:10px;
}
.content_right{
    height:1020px;
    width:844px;
    float:left;
    margin-left:90px;
}
.right_navigate{
    margin-top:80px;
}
.content_right div a{
    margin-left:50px;
}
.line{
    margin-left:40px;
}
hr{
    width:844px;
    height:1px;
    background-color: #D9D9D9;
    margin-top:20px;
    border:none;
}
.click{
    font-family: Microsoft YaHei UI;
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;
    letter-spacing: 1px;
    color:#777777;
    text-decoration: none;
}
.clicked{
    font-family: Microsoft YaHei UI;
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;
    letter-spacing: 1px;
    color:#3C95EE;
    text-decoration: none;
}
.articles{
    height:975px;
    width:844px;
    overflow: hidden;
    background-color: grey;
    margin-left:40px;
}
</style>