<template>
    <Top />
    <div class="show">
        <div class="AI">
            <div class="AI_top">
                <img src="/pic.png" width="15px" height="18px">
                <img src="/conclusion.png" width="75px" height="20px">
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <img src="/copy.png" width="56px" height="22px">
                <img src="/recreate.png" width="90px" height="22px">
            </div>
            <hr>
            <img src="/conclusion1.png" width="355px" height="378px">
            <img class="AI_input" src="/AI_input.png" width="321px" height="40px">
        </div>
        <div class="content">
            <h1>刚刚，DeepSeek 解答了困扰我五年的技术问题.时代确实变了！</h1>
            <RouterLink to="/OtherPersonInfo">why技术</RouterLink>
            <span class="datas">2024-12-10 17:05</span>
            <span class="datas">阅读数:10000</span>
            <img class="article" src="/article_content.png" width="910px" height="710px">
            
            <div class="content_bottom">
                <div class="likes">
                    <img  v-show="!liked" @click="like()" src="/like.png" width="25px">
                    <img  v-show="liked" @click="like()" src="/like1.png" width="25px">
                    <span :class="{like:!liked,liked:liked}">{{ likes }}</span>
                </div>
                <div class="comments" @click="block1()">
                    <img  v-show="!commented" @click="comment()" src="/comment.png" width="25px">
                    <img  v-show="commented" src="/commented.png" width="25px">
                    <span class="like">{{ comments }}</span>
                </div>
                <div class="more" @click="block()">
                    <img src="/more1.png" width="25px">
                    <div class="more1" v-show="more" @mouseleave="cancel()">
                        <img src="/morefunctions.png" width="102px" height="47px">
                    </div>
                 </div>
                
            </div>
            <div class="comment" v-show="comment_isShow" @mouseleave="cancel1()">
                <div class="comment_title">评论</div>
                <div class="comment_input">
                    <img src="/head portrait.png" width="50px">
                    <textarea placeholder="请输入你的评论"></textarea>
                    <button>发送</button>
                </div>
                <div class="comment_others">
                    <img src="/Otherpic.png" width="50px">
                    <span>嗯嗯哦哦</span>
                    <div class="others_content">
                        <span>okok</span>
                    </div>
                    <div class="others_datas">
                        <div class="likes1">
                            <img  src="/like.png" width="25px">
                            <span class="like">点赞</span>
                        </div>
                        
                        <div class="comments1" >
                            <img @click="block2()" class="img1" src="/comment.png" width="25px">
                            <span class="like">回复</span>
                            <img class="img2" src="/more1.png" width="25px">
                        </div>
                    </div>
                </div>
                <div v-show="comment1_isShow" @mouseleave="cancel2()" class="your_comment">
                    <textarea placeholder="回复嗯嗯哦哦"></textarea>
                    <button>回复</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup name="Detail">
import Top from '@/components/Top.vue'
// import markdownit from 'markdown-it'
import {ref} from 'vue'
// const md = markdownit()
// const result=md.render('# markdown-it rulezz')
const liked=ref(false)
const likes=ref(45)
const commented=ref(false)
const comments=ref(1)
const comment_isShow=ref(false)
const comment1_isShow=ref(false)
const more=ref(false)
function like(){
    liked.value=!liked.value
    if(!liked.value)likes.value -=1
    else likes.value+=1
}
function comment(){
    commented.value=!commented.value
}
function block(){
    more.value=true
}
function cancel(){
    more.value=false
}
function block1(){
    comment_isShow.value=true
}
function cancel1(){
    comment_isShow.value=false
}
function block2(){
    comment1_isShow.value=true
}
function cancel2(){
    comment1_isShow.value=false
}
</script>

<style scoped>
.show{
    height: 1833px;
    width:1690px;
    background-color:#F0F1F2;
    overflow: hidden;
}
.AI{
    width:355px;
    height:550px;
    background-color: white;
    float:left;
    margin-top:40px;
    margin-left: 10.75px;
}
.AI_top{
    width:355px;
    height:40px;
    margin-top:8px;
}
.AI_top img{
    vertical-align: middle;
    margin-left:10px;
    margin-top:10px;
}
.AI hr{
    width:347px;
    height:1px;
    background-color: #D9D9D9;
    border: none;
    margin-bottom:15px;
}
.AI_input{
    margin-left:17px;
    margin-top:30px;
}
.content{
    width:930px;
    height:958px;
    float:left;
    margin-top:40px;
    margin-left: 10.75px;
    background-color: white;
}
h1{
    margin-left:40px;
}
.content a{
    text-decoration: none;
    font-family: Microsoft YaHei UI;
    font-weight: 400;
    font-size: 18px;
    color: #555555;
    margin-left:40px;
}
.datas{
    font-family: Microsoft YaHei UI;
    font-weight: 400;
    font-size: 18px;
    color:#999999;
    margin-left:50px;
}
.article{
    margin-left:15px;
    margin-top:10px;
}
.content_bottom{
    width:930px;
    height:25px;
    margin-top: 30px;
}
.likes{
    float:left;
    margin-left:700px;
}
.likes img{
    vertical-align: middle;
    margin-right:10px;
}
.likes span{
    vertical-align: middle;
}
.comments{
    width:50px;
    height:25px;
    float:left;
    margin-left:30px;
}
.comments img{
    vertical-align: middle;
    margin-right:10px;
}
.comments span{
    vertical-align: middle;
}
.comment{
    width:930px;
    height:748px;
    background-color: white;
    margin-top: 20px;
    overflow: hidden;
}
.comment_title{
    width:930px;
    font-family: Microsoft YaHei UI;
    font-size: 24px;
    font-weight: 400;
    color:black;
    margin-left:30px;
    margin-top: 20px;
}
.comment_input{
    width:930px;
    height:170px;
}
.comment_input img{
    margin-left:30px;
    margin-top:35px;
    margin-right: 20px;
}
.comment_input textarea{
    width:700px;
    height:115px;
    background-color: white;
    border-radius: 5px;
    border-width: 1px;
    border-color: #D7D7D7;
    border-style:solid;
    outline: none;
    font-family: Microsoft YaHei UI;
    font-weight: 400;
    font-size: 16px;
    letter-spacing: 1px;
    color:black;
}
.comment_input textarea:hover{
    width:700px;
    height:115px;
    background-color: white;
    border-radius: 5px;
    border-width: 1px;
    border-color: #3B91F4;
    border-style:solid;
    outline: none;
    font-family: Microsoft YaHei UI;
    font-weight: 400;
    font-size: 16px;
    letter-spacing: 1px;
    color:black;
}
.comment_input button{
    width:73px;
    height:40px;
    background-color: #3B91F4;
    font-family: Microsoft YaHei UI;
    font-size: 20px;
    font-weight: 400;
    color:white;
    border:none;
    margin-left: 20px;
}
.comment_others{
    width:930px;
    height:120px;
}
.comment_others img{
    vertical-align: middle;
    margin-left:30px;
}
.comment_others span{
    vertical-align: middle;
    margin-left:10px;
}
.others_content{
    width:60px;
    height:30px;
    margin-left:80px;
}
.others_datas{
    width:850px;
    height:25px;
    margin-left:90px;
}

.likes1{
    width:75px;
    height:25px;
    float:left;
}
.likes1 img{
    margin-left: 0px;
}
.comments1{
    width:765px;
    height:25px;
    float:left;
    margin-left:10px;
}
.comments1 .img1{
    margin-left:0px;
}
.comments1 .img2{
    margin-left:620px;
}
.your_comment{
    width:750px;
    height:100px;
    margin-left:170px;
}
.your_comment textarea{
    width:600px;
    height:100px;
    background-color: white;
    border-radius: 5px;
    border-width: 1px;
    border-color: #D7D7D7;
    border-style:solid;
    outline: none;
    font-family: Microsoft YaHei UI;
    font-weight: 400;
    font-size: 16px;
    letter-spacing: 1px;
    color:black;
}
.your_comment textarea:hover{
    width:600px;
    height:100px;
    background-color: white;
    border-radius: 5px;
    border-width: 1px;
    border-color: #3B91F4;
    border-style:solid;
    outline: none;
    font-family: Microsoft YaHei UI;
    font-weight: 400;
    font-size: 16px;
    letter-spacing: 1px;
    color:black;
}
.your_comment button{
    width:73px;
    height:40px;
    background-color: #3B91F4;
    font-family: Microsoft YaHei UI;
    font-size: 20px;
    font-weight: 400;
    color:white;
    border:none;
    margin-left: 20px;
}
.more{
    width:25px;
    height:25px;
    float:left;
    margin-left:30px;
}
.more1{
    margin-top:15px;
    margin-left:5px;
}
.like{
    font-family: Microsoft YaHei UI;
    font-size: 18px;
    font-weight: 400;
    color:#989AA9;
    vertical-align: middle;
}
.liked{
    font-family: Microsoft YaHei UI;
    font-size: 18px;
    font-weight: 400;
    color:#3B91F4;
    vertical-align: middle;
}
.right{
    width:357px;
    height:958px;
    background-color: blue;
    float:left;
    margin-top:40px;
    margin-left: 10.75px;
}
</style>