// crawler.js
const axios = require('axios');
const cheerio = require('cheerio');
const PQueue = require('p-queue').default;
const Database = require('better-sqlite3');
const fs = require('fs');

// ================= 配置区 =================
const BASE_URL = 'https://info22.fzu.edu.cn/lm_list.jsp';
const WB_TREE_ID = '1460';
const START_DATE = new Date('2026-01-01T00:00:00');
const END_DATE = new Date();
const CONCURRENCY = 5; // 并发数，避免对服务器造成压力
const MAX_PAGES = 100; // 防止站点分页过多时无限循环
const DYNCLOCK_OWNER = 1768654345;
const DB_PATH = './fzu_notices.db';
const JSON_PATH = './notices.json';

// ================= 数据库初始化 =================
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.exec(`
  CREATE TABLE IF NOT EXISTS notices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    department TEXT,
    publish_date TEXT NOT NULL,
    url TEXT UNIQUE NOT NULL,
    content TEXT,
    view_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const insertStmt = db.prepare(`
  INSERT OR IGNORE INTO notices (title, department, publish_date, url, content, view_count)
  VALUES (@title, @department, @publish_date, @url, @content, @view_count)
`);

// ================= 网络请求封装 =================
const queue = new PQueue({ concurrency: CONCURRENCY });

async function fetchPage(url) {
  return queue.add(async () => {
    try {
      const { data } = await axios.get(url, {
        timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0 (FZU-Notice-Crawler/1.0)' },
        responseType: 'arraybuffer' // 防止中文乱码
      });
      const TextDecoder = require('util').TextDecoder;
      const decoder = new TextDecoder('utf-8');
      return decoder.decode(data);
    } catch (err) {
      console.error(`[ERROR] 请求失败: ${url}`, err.message);
      return null;
    }
  });
}

// ================= 列表页解析 =================
async function crawlListPage(pageNum) {
  const listUrl = `${BASE_URL}?wbtreeid=${WB_TREE_ID}&PAGENUM=${pageNum}`;
  const html = await fetchPage(listUrl);
  if (!html) return [];

  const $ = cheerio.load(html);
  const notices = [];

  // 页面结构：<div class="list fl"><ul><li class="clearfloat"><p>
  // 第一个 a 是部门标签，如【研究生院】
  // 第二个 a 才是标题链接
  // span.fr 是日期
  $('.list.fl ul li.clearfloat').each((_, el) => {
    const $el = $(el);
    const $deptLink = $el.find('p > a.lm_a').first();
    const $titleLink = $el.find('p > a[title]').last();
    const title = $titleLink.text().trim();
    const href = $titleLink.attr('href');
    const dateStr = $el.find('span.fr').text().trim();
    const dept = $deptLink.text().replace(/[【】]/g, '').trim();

    if (!title || !href || !dateStr) return;

    // 日期解析
    const pubDate = new Date(`${dateStr}T00:00:00`);
    if (isNaN(pubDate.getTime())) return;

    const wbnewsidMatch = href.match(/wbnewsid=(\d+)/);
    const wbnewsid = wbnewsidMatch ? Number.parseInt(wbnewsidMatch[1], 10) : null;
    const fullUrl = href.startsWith('http') ? href : `https://info22.fzu.edu.cn/${href}`;
    notices.push({ title, department: dept, publish_date: dateStr, url: fullUrl, pubDate, wbnewsid });
  });

  return notices;
}

async function fetchViewCounts(wbnewsids) {
  if (!wbnewsids.length) return [];

  const url = `https://info22.fzu.edu.cn/system/resource/code/news/click/dynclicksbatch.jsp?clickids=${wbnewsids.join(',')}&owner=${DYNCLOCK_OWNER}&clicktype=wbnews`;
  try {
    const { data } = await axios.get(url, {
      timeout: 10000,
      headers: { 'User-Agent': 'Mozilla/5.0' },
      responseType: 'text'
    });

    return data
      .split(',')
      .map(value => Number.parseInt(value.trim(), 10))
      .filter(value => !Number.isNaN(value));
  } catch (err) {
    console.error(`[ERROR] 获取浏览量失败`, err.message);
    return wbnewsids.map(() => 0);
  }
}

// ================= 主流程 =================
async function main() {
  console.log(`🚀 开始爬取福州大学通知（${START_DATE.toISOString().slice(0, 10)} ~ ${END_DATE.toISOString().slice(0, 10)}）...`);
  let allNotices = [];
  let pageNum = 1;

  // 1. 每页都收集，直到整页都已经早于 START_DATE 才停止
  while (pageNum <= MAX_PAGES) {
    console.log(`📄 正在爬取列表页第 ${pageNum} 页...`);
    const items = await crawlListPage(pageNum);
    if (items.length === 0) break;

    // 一旦整页都早于起始日期，就说明已越过目标区间，立即停止翻页
    if (items.every(item => item.pubDate < START_DATE)) {
      console.log(`⏹️ 已达到停止条件：第 ${pageNum} 页全部早于 ${START_DATE.toISOString().slice(0, 10)}，停止爬取`);
      break;
    }

    const wbnewsids = items.map(item => item.wbnewsid).filter(Boolean);
    const viewCounts = await fetchViewCounts(wbnewsids);

    const enrichedItems = items.map((item, index) => ({
      ...item,
      view_count: viewCounts[index] || 0
    }));

    const validItems = enrichedItems.filter(item => item.pubDate >= START_DATE && item.pubDate <= END_DATE);
    allNotices = allNotices.concat(validItems);
    pageNum++;
  }

  if (pageNum > MAX_PAGES) {
    console.log(`⚠️ 已达到最大翻页上限 ${MAX_PAGES} 页，停止爬取`);
  }

  console.log(`✅ 共找到 ${allNotices.length} 条符合条件的通知`);

  // 2. 只保留字段：发表日期、部门、标题、访问链接、浏览量
  const result = allNotices.map(({ title, department, publish_date, url, view_count }) => ({
    title,
    department,
    publish_date,
    url,
    view_count
  }));

  // 3. 存入 SQLite
  const insertMany = db.transaction((notices) => {
    for (const n of notices) {
      insertStmt.run({
        title: n.title,
        department: n.department,
        publish_date: n.publish_date,
        url: n.url,
        content: '',
        view_count: n.view_count || 0
      });
    }
  });
  insertMany(result);
  console.log(`💾 已存入 SQLite: ${DB_PATH}`);

  // 4. 同时保存 JSON
  fs.writeFileSync(JSON_PATH, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`📁 已保存 JSON: ${JSON_PATH}`);

  console.log('🎉 爬取完成！');
  db.close();
}

main().catch(console.error);