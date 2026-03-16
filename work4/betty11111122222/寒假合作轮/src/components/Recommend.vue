<template>
    <div class="article" v-for="(data,index) in array" v-bind:key="data.id.value">
        <div class="article_left">
            <RouterLink to="/detail">{{ data.title }}</RouterLink>
            <p>{{ data.contents }}</p>
            <img src="/headPicture.png" width="10px">
            <RouterLink class="article_change3" to="/otherPersonInfo">&nbsp;{{ data.writer }}&nbsp;</RouterLink>
            <img class="line" src="/line.png" height="16px" width="1px">&nbsp;
            <img class="like" v-show="data.article_isShow.value" @click="article_changeisShow(index)" src="/like.png" width="15px">
            <img class="like1" v-show="!data.article_isShow.value" @click="article_changeisShow(index)" src="/like1.png" width="15px">
            <span class="article_change2"  :class="{article_change2:data.article_check.value,article_changed2:!data.article_check.value}">&nbsp;{{ data.like }}&nbsp;</span>
            <img class="comment" src="/look.png" width="18px">&nbsp;
            <span class="article_change2">{{ data.look }}&nbsp;</span>
            <span class="article_change2">{{ data.time }}</span>
        </div>
        <div class="article_right">
            <button class="article_change1">人工智能</button>
            <img src="/illustrate.png" width=208px>
        </div>  
    </div>
</template>

<script lang="ts" setup name="Recommend">
import {RouterLink} from 'vue-router'
import {ref,toRefs} from 'vue'
let datas=ref([
    {
        id:0,
        title:'刚刚，DeepSeek 解答了困扰我五年的技术问题.时代确实变了！',
        contents:'五年前，2020 年，我写文章的时候曾经遇到过一个技术问题，百思不得其解，当时把那个问题归类为玄学问题。后来也会偶尔想起这个问题，但是我早就不纠结于这个问题了，没再去研究过。前几天，骑着共享单车下班回家的路上，电光石火之间，这个问题突然又冒出来了。然后，结合这段时间火出圈的 DeepSeek，我想着：为什么不问问神奇的 DeepSeek 呢?',
        writer:'why技术',
        like:45,
        article_check:true,
        article_isShow:true,
        look:10000,
        time:'2024-12-10 17:05'
    },
    {
        id:1,
        title:'阿民的字节终唱',
        contents:'在字节待了快四年了，送走了一批又一批同学，终于轮到自己了。这四年做了很多有挑战的事情，尝试了不同的可能，也接触了形形色色的同学，回顾下来还是很有趣的。准确地说，我工作了 5 年，字节经历最长，接近四年，以学习经历来说，也是一个完整的周年了。整个职业经历其实也蛮有意思的，分享给大家一些比较好玩的事情，放松一下疲惫的工作状态。',
        writer:'祯民',
        like:45,
        article_check:true,
        article_isShow:true,
        look:6000,
        time:'2024-09-22 18:00'
    },
    {
        id:2,
        title:'都2025年了，还在用Markdown写文档吗？',
        contents:'俗话说得好：“程序员宁愿写 1000 行代码，也不愿意写 10 个字的文档。”不愿写文档的原因，一方面是咱理科生文采确实不好，另一方面则是文档的更新维护十分麻烦。每次功能有变更的时候， 时间又急（其实就是懒），很难想得起来同时去更新文档。特别是文档中代码片段，总是在几天之后（甚至更久），被用户找过来吐...',
        writer:'代码不洗头',
        like:45,
        article_check:true,
        article_isShow:true,
        look:3000,
        time:'2025-02-26 14:30'
    },
    {
        id:3,
        title:'如何给本地部署的DeepSeek投喂数据，让他更懂你',
        contents:'在上一篇文章中，我们说了怎么在本地部署DeepSeek。对本地部署DeepSeek感兴趣的小伙伴看过来。话说回来了，为啥要本地部署呢？① 在使用DeepSeek中，经常会出现服务器繁忙，请稍后再试。② 不想让个人隐私数据暴露出去③可以将各种格式的文件，如pdf、csv、txt、md 格式的数据投喂给它。比如你想让 DeepSeek 了解你的公司...',
        writer:'程序员晓凡',
        like:45,
        article_check:true,
        article_isShow:true,
        look:5000,
        time:'2023-07-23 14:00'
    },
    {
        id:4,
        title:'10亿数据，如何迁移？',
        contents:'某次金融系统迁移项目中，原计划8小时完成的用户数据同步迟迟未能完成。24小时后监控警报显示：由于全表扫描SELECT * FROM users导致源库CPU几乎熔毁，业务系统被迫停机8小时。这让我深刻领悟到——10亿条数据不能用蛮力搬运，得用巧劲儿递接！今天这篇文章，跟大家一起聊聊10亿条数据，如何做迁移，希望对你会有所帮助。',
        writer:'苏三说技术',
        like:45,
        article_check:true,
        article_isShow:true,
        look:8000,
        time:'2024-05-22 00:00'
        
    }
])
let array=[
    toRefs(datas.value[0]),toRefs(datas.value[1]),toRefs(datas.value[2]),toRefs(datas.value[3]),toRefs(datas.value[4])
]

function article_changeisShow (id:any){
array[id].article_isShow.value=!array[id].article_isShow.value
array[id].article_check.value=!array[id].article_check.value
if(!array[id].article_isShow.value) array[id].like.value += 1
else array[id].like.value -= 1
}
</script>

<style scoped>
.article{
    width:844px;
    height:195px;
    background-color:white;
    overflow: hidden;
    margin-bottom:5px;
    border-radius:5px;
}
.article_left{
    width:530px;
    height:195px;
    float:left;
    margin-left:5px;
    margin-top:5px;
    background-color: white;
}
.article_left a{
    text-decoration: none;
    font-family: Microsoft YaHei UI;
    font-weight: 700;
    font-size: 18px;
    line-height: 30px;
    color: black;
}
.article_left p{
    width:530px;
    font-family: Microsoft YaHei UI;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    color:#757575;
}
.article_left .article_change3{
    text-decoration: none;
    font-weight: 400;
    font-size:15px;
    font-family: Microsoft YaHei UI;
    letter-spacing: 1px;
    color:#888888;
    vertical-align: middle;
}
.article_change3:hover{
    text-decoration: none;
    font-weight: 400;
    font-size:15px;
    font-family: Microsoft YaHei UI;
    letter-spacing: 1px;
    color:#3B91F4;
    vertical-align: middle;
}
.line{
    vertical-align: middle;
}
.like{
    vertical-align: middle;
}
.like1{
    vertical-align: middle;
}
.article_change2{
    font-family: Microsoft YaHei UI;
    color:#999999;
    vertical-align: middle;
}
.article_changed2{
    font-family: Microsoft YaHei UI;
    color:#3B91F4;
    vertical-align: middle;
}
.comment{
    vertical-align: middle;
}
.article_right{
   width:208px;
   height:195px;
   float:left;
   background-color: white;
   margin-top:13px;
   margin-left:50px;
}
.article_change1{
    width:59px;
    height: 20px;
    border-radius: 10px;
    border-color:transparent;
    border-width:1px;
    background-color: #E0E2E5;
    color:#777777;
    font-family: Microsoft YaHei UI;
    font-weight: 400;
    font-size: 10px;
    letter-spacing: 1px;
    margin-bottom: 22px;
}
.article_change1:hover{
    width:59px;
    height: 20px;
    border-radius: 10px;
    border-color:#3B91F4;
    border-width:1px;
    background-color:#E0E2E5;
    border-style:solid;
    color:#3B91F4;
    font-family: Microsoft YaHei UI;
    font-weight: 400;
    font-size: 10px;
    letter-spacing: 1px;
    margin-bottom: 22px;
}
</style>
