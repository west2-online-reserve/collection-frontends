// scraper.js
import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import PQueue from "p-queue";
import { sequelize, Notice } from "./models/notice.js";

// ——————————————
// 配置区
// ——————————————

// “通知列表页”URL
  const BASE_URL = "https://info22-443.webvpn.fzu.edu.cn";

// 并发数限制为 5
const CONCURRENCY = 15;

// 输出 JSON 文件名
const OUTPUT_FILE = "notices.json";

// cookie
const COOKIE_HEADER = "JSESSIONID=964532EFA7DD71261B05ECB8D4F4A579; _webvpn_key=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiODMyMjAyMTExIiwiZ3JvdXBzIjpbNl0sImlhdCI6MTc0OTYyMzAyMSwiZXhwIjoxNzQ5NzA5NDIxfQ.Li_YwuE6TkQpii2Upqz2_khLpuP1TAPEh-jWeopz4i0; webvpn_username=832202111%7C1749623021%7C474438d3c5a79e2d30424e9e655582b08ec072d8";

//时间过滤
const START_DATE = new Date(new Date().getFullYear(), 0, 1);

// ——————————————
// 主流程
// ——————————————
(async () => {
  let page = 1;
  let stop = false;
  const links = [];
  // 同步数据库模型（自动创建或迁移表）
  await sequelize.sync({ alter: true });
  console.log("数据库模型同步完成");

  // 抓取“通知列表页”，提取每个通知链接
  while (!stop && page <= 1067) {
    const LIST_URL = `https://info22-443.webvpn.fzu.edu.cn/lm_list.jsp?totalpage=1067&PAGENUM=${page}&urltype=tree.TreeTempUrl&wbtreeid=1460`;
    console.log(`正在抓取列表页：${LIST_URL}`);
    const { data: listHtml } = await axios.get(LIST_URL, {
      timeout: 10000,
      headers: { Cookie: COOKIE_HEADER },
    });
    const $ = cheerio.load(listHtml);



    $("div.list ul li").each((i, el) => {
      const $el = $(el);
      const dateText = $el.find("span.fr").text().trim();

      const date = new Date(dateText);
      if (date < START_DATE) { 
        stop = true; // 如果日期早于今年，则停止抓取
        return false;
       } // 过滤早于今年的

      const a = $el.find("a").eq(1);;
      const href = a.attr("href");
      const title = a.text().trim();
      const dept = $el.find("span.dept").text().trim();
      const url = href.startsWith("http") ? href : `${BASE_URL}${href.startsWith("/") ? "" : "/"}${href}`;

      links.push({ url, title, dept, dateText });
    });

    page++;
  }

  console.log(`🔗 在列表页共发现 ${links.length} 条通知链接`);

  // 使用 PQueue 控制并发抓取详情页
  const queue = new PQueue({ concurrency: CONCURRENCY });
  const results = [];

  for (const info of links) {
    queue.add(async () => {
      const detail = await fetchNoticeDetail(info.url, info.dateText);
      if (!detail) return;
      detail.scrapedAt = new Date();

      // 4. 写入 MySQL（若同 url 已存在则跳过）
      await Notice.findOrCreate({
        where: { url: detail.url },
        defaults: detail,
      });

      results.push(detail);
    });
  }

  await queue.onIdle(); //等待全部完成
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2), "utf-8");
  console.log("完成，已保存到", OUTPUT_FILE);
})();


// ——————————————
// 抓取文章内容
// ——————————————
async function fetchNoticeDetail(url, date) {
  try {
    const { data: html } = await axios.get(url, {
      timeout: 10000,
      headers: {
        Cookie: COOKIE_HEADER,
      },

    });
    const $ = cheerio.load(html);


    const title = $("div.conth1").first().text().trim();
    const dept = $("h3.fl").first().text().trim();
    const content = $("div.v_news_content p")
      .map((i, el) => $(el).text().trim())
      .get()
      .join("\n");
    const viewCount = $("div.conthsj span").text().trim() || "0";
    return { title, dept, date, url, content, viewCount };
  } catch (err) {
    console.error(`抓取详情页失败：${url}，原因：${err.message}`);
    return null;
  }
}