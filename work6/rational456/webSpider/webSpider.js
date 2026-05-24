import axios from 'axios'
import fs from 'fs'
import { fileURLToPath } from 'url';
import path from 'path';
import * as cherrio from 'cheerio'
import PQueue from 'p-queue'
import { log } from 'console';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const queue = new PQueue({concurrency: 5});
const queueNext = new PQueue({concurrency: 5});

let cookieString = '_gscu_1331749010=52508290qp32ir19; _webvpn_key=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMTAyNDAwMzI4IiwiZ3JvdXBzIjpbNl0sImlhdCI6MTc3NzcwMDIwMywiZXhwIjoxNzc3Nzg2NjAzfQ.SR6S905KTmNpUYTDRfqfHtHDK7KRxOe6E63R0-SA0Ho; webvpn_username=102400328%7C1777700203%7C0b9b1ca035b6d91291ba35ffe52c788373acc560; JSESSIONID=D9DA7AD6829A5E96B4219A36AE2EFCF3'
function myAxios(page){
  return axios.request({
    method:'get',
    url:"https://info22-443.webvpn.fzu.edu.cn/lm_list.jsp",
    headers: {
    Cookie: cookieString,
    // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    params:{
      totalpage:1128,
      PAGENUM:page,
      urltype:'tree.TreeTempUrl',
      wbtreeid:1460
    }
})
}
function simpleAxios(url){
    return axios.request({
    method:'get',
    url,
    headers: {
    Cookie: cookieString,
    // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }})
}

async function _showDynClicks(clicktype, owner, clickid){
  const url = 'https://info22-443.webvpn.fzu.edu.cn/system/resource/code/news/click/dynclicks.jsp?clickid='+clickid+'&owner='+owner+'&clicktype='+clicktype;
  try{
    const result = await simpleAxios(url)
    return result.data
  }
  catch(err){
    console.log('请求点击量失败！');
  }
}

const newYearDate = new Date('2026-1-1')
let nowDate = new Date('2026-6-6')
let page = 1;
let availableData=[];
let permit = true;

const queryDocument = async (num) =>{
  const contentData = await simpleAxios(availableData[num].url)
  const $ =cherrio.load(contentData.data)
  const content = $('#vsb_content p').map(function() {
    return $(this).prop('innerText');
  }).get();
  const regex = /_showDynClicks\(["']([^"']+)["'],\s*(\d+),\s*(\d+)\)/;
  const match = $('.conthsj').text().match(regex);
  let clickCount = null
  if (match) {
    const clicktype = match[1];  
    const owner = Number(match[2]);       
    const clickid = Number(match[3]);
    clickCount = await _showDynClicks(clicktype, owner, clickid)
  }
  Object.assign(availableData[num],{
    content,
    clickCount
  })
}

const onceQuery = async (page)=>{
  const mainData = await myAxios(page)
  const $=cherrio.load(mainData.data)
  //获取部门
  const department = $('.clearfloat .lm_a').map(function() {
    return $(this).prop('innerText');
  }).get();
  //获取标题
  const $data = $('.clearfloat :nth-child(2)')
  const title = $data.map(function() {
    return $(this).attr('title');
  }).get();
  //获取访问链接
  const url = $data.map(function() {
    return 'https://info22-443.webvpn.fzu.edu.cn/' + $(this).attr('href');
  }).get();
  //获取日期
  const date = $('.clearfloat .fr').map(function() {
    return $(this).prop('innerText');
  }).get();
  for(let i=0;i<department.length;i++){
    nowDate = new Date(date[i])
    if(nowDate < newYearDate){
      return permit = false;
    }
    availableData.push({
      department:department[i],
      title:title[i],
      url:url[i],
      date:date[i],
    })
  }
  console.log(`已成功获取第${page}页的通知！`);
}
const writeInFile = async ()=>{
  // myAxios(page).then(result=>{
  //   if(result.status != 200){
  //     console.log('网站连接失败！cookie失效');
  //     return
  //   }
  //   console.log('网站连接成功');
  // })
  while(permit){
    const tasks = [];
    for (let i = 0; i < 5; i++) {
      tasks.push(queue.add(() => onceQuery(page)));
      page++;
    }
    const results = await Promise.all(tasks);
  }
  let tasks = [];
  for(let i=1;i<=availableData.length;i++){
    tasks.push(queueNext.add(() => queryDocument(i-1)));
    if( i % 5 == 0 || i == availableData.length){
      const results = await Promise.all(tasks);
      tasks = [];
      console.log(`通知的正文获取中……：${i}/${availableData.length}`);
    }
  }
  fs.writeFile('./notices.json',JSON.stringify(availableData,null,4),(err)=>{
    if(err)
      return console.log('文件打开失败！');
    console.log(`文件存入成功！,已存入${__dirname}下的notices.json中`);
  })
}
cookieString = process.argv[2]
writeInFile()

// async function test() {
//   const contentData = await simpleAxios('https://info22-443.webvpn.fzu.edu.cn/content.jsp?urltype=news.NewsContentUrl&wbtreeid=1325&wbnewsid=40520') 
//   const $ =cherrio.load(contentData.data)
//   const regex = /_showDynClicks\(["']([^"']+)["'],\s*(\d+),\s*(\d+)\)/;
//   const match = $('.conthsj').text().match(regex);
//   let clickCount = null
//   if (match) {
//     const clicktype = match[1];  
//     const owner = Number(match[2]);       
//     const clickid = Number(match[3]);
//     clickCount = await _showDynClicks(clicktype, owner, clickid)
//   }
//   console.log(clickCount);
// }
// test()