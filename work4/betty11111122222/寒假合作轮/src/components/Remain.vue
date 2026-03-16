<template>
<div class="remain">
   <div class="remain_left">
        <div class="calender">
                <select>
                    <option>年&nbsp;2024年2月5日-2025年2月5日</option>
                    <option>季度&nbsp;11月5日-2月5日</option>
                    <option>月&nbsp;11月5日-2月5日</option>
                    <option>周&nbsp;1月30日-2月5日</option>
                    <option>今天&nbsp;2月5日</option>
                </select>
        </div>
        <div class="content_navigate">
            <div v-for="(data,index) in arr" :key="data.id.value" @click="changeImg(index)">
                        <img v-show="num!=index" :src="data.before.value" width="150px" height="43px">
                        <img v-show="num==index" :src="data.after.value" width="150px" height="43px">
            </div>
        </div>
    </div>
    <div class="remain_middle">
        <Article></Article>
    </div>
    <div class="remain_right">
        <div class="functions">
            
            <div >
                <RouterLink v-for="(pic1,index) in arr1" :key="index" @mouseenter="hover(index)" @mouseleave="nohover(index)" class="btn" :to="pic1.link.value">
                    <img v-show="pic1.check.value" :src="pic1.nohover.value" width=137px height="46px">
                    <img v-show="!pic1.check.value" :src="pic1.hover.value" width="137px" height="46px">
                </RouterLink>
            </div>
            <div >
                <RouterLink v-for="(pic2,index) in arr2" :key="index" @mouseenter="hover1(index)" @mouseleave="nohover1(index)" class="btn" :to="pic2.link.value">
                    <img v-show="pic2.check.value" :src="pic2.nohover.value" width=137px height="46px">
                    <img v-show="!pic2.check.value" :src="pic2.hover.value" width="137px" height="46px">
                </RouterLink>
            </div> 
        </div>

        <div class="ad">
            <img src="/ad.png" width="357px" height="222px">
        </div>

        <div class="recommend">
                <p>推荐作者</p>
                <hr>
                <div class="writer_card">
                    <div>
                        <div v-for="(writer,index) in writers" :key="index">
                            <img src="/writer.png" width="120px" height="50px" style="vertical-align: middle">
                            <button v-show="!writer" @click="attentioned(index)" class="attention_btn">+关注</button>
                            <button v-show="writer" @click="attentioned(index)" class="attentioned_btn">已关注</button>
                        </div>
                    </div>
                    <hr>
                    <img src="/more.png" width=357px>
                </div>
        </div>

    </div>
</div>    
    
</template>

<script lang="ts" setup name="Remain">
import {ref,toRefs} from 'vue'
import Article from '@/components/Article.vue'
let num=ref(0)
let srcs=ref([
    {
        id:'00',
        before:'/comprehensive_before.png',
        after:'/comprehensive_after.png'
    },
    {
        id:'01',
        before:'/frontends_before.png',
        after:'/frontends_after.png'
    },
    {
        id:'02',
        before:'/java.png',
        after:'/java_after.png'
    },
    {
        id:'03',
        before:'/AI.png',
        after:'/AI_after.png'
    },
    {
        id:'04',
        before:'/Android.png',
        after:'/Android_after.png'
    },
    {
        id:'05',
        before:'/IOS.png',
        after:'/IOS_after.png'
    },
    {
        id:'06',
        before:'/datascience.png',
        after:'/Datascience_after.png'
    },
    {
        id:'07',
        before:'/calculator.png',
        after:'/Calculator_after.png'
    },
    {
        id:'08',
        before:'/Cybersecurity.png',
        after:'/Cybersecurity_after.png'
    },
    {
        id:'09',
        before:'/Web.png',
        after:'/Web_after.png'
    },
    {
        id:'10',
        before:'/Tool.png',
        after:'/Tool_after.png'
    },
    {
        id:'11',
        before:'/Interaction.png',
        after:'/Interaction_after.png'
    }
])
let arr=[
    toRefs(srcs.value[0]),toRefs(srcs.value[1]),toRefs(srcs.value[2]),toRefs(srcs.value[3]),toRefs(srcs.value[4]),toRefs(srcs.value[5]),
    toRefs(srcs.value[6]),toRefs(srcs.value[7]),toRefs(srcs.value[8]),toRefs(srcs.value[9]),toRefs(srcs.value[10]),toRefs(srcs.value[11])
]
let pics=ref([
    {
        check:true,
        nohover:'/Ask.png',
        hover:'/Ask_hover.png',
        link:'/ask'
    },
    {
        check:true,
        nohover:'/writeArticle.png',
        hover:'write_hover.png',
        link:'/write'
    }
])
let pics1=ref([
{
        check:true,
        nohover:'/writeNote.png',
        hover:'/note_hover.png',
        link:'/write'
    },
    {
        check:true,
        nohover:'/draft.png',
        hover:'/draft_hover.png',
        link:'/draft' 
    }
])
let arr1=[toRefs(pics.value[0]),toRefs(pics.value[1])]
let arr2=[toRefs(pics1.value[0]),toRefs(pics1.value[1])]
let writers=ref([false,false,false,false])
function hover(id:any){
    arr1[id].check.value=!arr1[id].check.value
}
function nohover(id:any){
    arr1[id].check.value=!arr1[id].check.value
}
function hover1(id:any){
    arr2[id].check.value=!arr2[id].check.value
}
function nohover1(id:any){
    arr2[id].check.value=!arr2[id].check.value
}
function changeImg(id:any){
    num.value=id
}
function attentioned(id:any){
writers.value[id]=!writers.value[id]
}


</script>

<style scoped>
.remain{
    height: 1080px;
    width:1685px;
    background-color:#F0F1F2;
    overflow: hidden;
}
.remain_left{
    width:280px;
    height:546px;
    background-color: #F0F1F2;
    margin-left:25px;
    margin-top:40px;
    float:left;
}
.calender{
    height:30px;
    float:left;
    font-family: Microsoft YaHei UI;
}
select{
    border-color:#F0F1F2;
    background-color:#F0F1F2;
    text-align:right ;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: 1px;
}
.content_navigate{
    width:150px;
    height: 516px;
    background-color: white;
    float:left;
    margin-left:120px;
}
.content_navigate div{
    width: 150px;
    height:43px;
    background-color:white;
    text-align: center;
    display:table;
}
.remain_middle{
    width:844px;
    height:1005px;
    background-color:#F0F1F2;
    margin-top:40px;
    margin-left:15px;
    float:left;
}
.remain_right{
    width:357px;
    height:812px;
    background-color:#F0F1F2;
    float:left;
    margin-top:65px;
    margin-left:80px;

}
.functions{
    width:357px;
    height:165px;
    background-color: white;
    overflow: hidden;
    border-radius: 10px;
    margin-bottom:15px;
}
.functions div{
    width:357px;
    height:46px;
    margin-top:24px;
    margin-left:20px;
}
.btn{
    margin-left:15px;
}
.ad{
    width:357px;
    height:222px;
    margin-bottom:15px;
}
.recommend{
    width:357px;
    height:335px;
    background-color: white;
    border-radius:10px;
    overflow: hidden;
}
.recommend p{
    font-family: Microsoft YaHei UI;
    font-weight: 400;
    font-size: 18px;
    line-height: 20px;
    letter-spacing: 1px;
    color:#666666;
    margin-left:15px;
    margin-top:15px;
    margin-bottom:15px;
}
.writer_card{
    width:357px;
    height:268px;
    background-color:white;
    overflow: hidden;
}
hr{
    width: 327px;
    height: 1px;
    background-color:#D9D9D9;
    border: none;
    margin-top: 0px;
    margin-bottom: 0px;
}
.writer_card div{
    width:357px;
    height:200px;
    background-color:white;
    margin-top:15px;
    margin-bottom:20px;
}
.writer_card div div{
    width:357px;
    height: 50px;
    margin-top:0px;
    margin-bottom:0px;
}
.writer_card div div img{
    margin-left:10px;
}
.attention_btn{
    width:66px;
    height:31px;
    background-color: #E8F7ED;
    color:#21B351;
    border:none;
    border-radius: 3px;
    font-family: Microsoft YaHei UI;
    font-weight: 400;
    font-size: 16px;
    letter-spacing: 1px;
    vertical-align: middle;
    margin-left:148px;
}
.attentioned_btn{
    width:66px;
    height:31px;
    background-color:#21B351 ;
    color:#E8F7ED;
    border:none;
    border-radius: 3px;
    font-family: Microsoft YaHei UI;
    font-weight: 400;
    font-size: 16px;
    letter-spacing: 1px;
    vertical-align: middle;
    margin-left:148px;
}
</style>