const cheerio = require("cheerio");
const fs = require("fs");
const axios = require("axios");
const { URL } = require("url");
// 常量
const BASE_URL = "https://info22.fzu.edu.cn/lm_list.jsp";
const START_DATE = "2025-07-01";
const OUTPUT_FILE = "notices.json";

function parseNoticeItem(item, baseUrl) {
  const $ = cheerio.load(item);

  const departmentElement = $("a.lm_a").first();
  const department = departmentElement.text().trim();

  const titleElement = $("a").eq(1);
  const title = titleElement.attr("title") || titleElement.text().trim();

  const relativeUrl = titleElement.attr("href");
  const fullUrl = new URL(relativeUrl, baseUrl).href;

  const date = $("span.fr").text().trim();

  return {
    title,
    department,
    date,
    url: fullUrl,
  };
}

// 获取总页数 - 根据实际分页结构调整
async function getTotalPages() {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        wbtreeid: 1460,
      },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const $ = cheerio.load(response.data);

    // 从分页信息中提取总页数
    const paginationText = $(".p_t").first().text();
    const totalMatch = paginationText.match(/共(\d+)条/);
    const totalItems = totalMatch ? parseInt(totalMatch[1]) : 20;

    // 每页20条，计算总页数
    return Math.ceil(totalItems / 20);
  } catch (error) {
    console.error("获取总页数失败:", error.message);
    return 1;
  }
}

// 获取指定页面的通知
async function getNoticesByPage(pageNum) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        wbtreeid: 1460,
        PAGENUM: pageNum,
        totalpage: 1078,
      },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const $ = cheerio.load(response.data);
    const noticeItems = $("li.clearfloat");

    const baseUrl = response.config.url || BASE_URL;
    const notices = [];

    noticeItems.each((index, item) => {
      try {
        const notice = parseNoticeItem(item, baseUrl);
        if (notice) notices.push(notice);
      } catch (error) {
        console.error(`解析第 ${index} 条通知失败:`, error.message);
      }
    });

    return notices;
  } catch (error) {
    console.error(`获取第 ${pageNum} 页通知失败:`, error.message);
    return [];
  }
}

// 过滤指定日期之后的通知
function filterNoticesByDate(notices, startDate) {
  const start = new Date(startDate);
  return notices.filter((notice) => {
    const noticeDate = new Date(notice.date);
    return noticeDate >= start;
  });
}

// 主函数
async function main() {
  try {
    console.log("开始爬取福州大学通知文件系统...");
    console.log(
      `时间范围: ${START_DATE} 至 ${new Date().toISOString().split("T")[0]}`
    );

    const testNotices = await getNoticesByPage(1);
    console.log("第一页获取到通知:", testNotices.length);
    if (testNotices.length === 0) {
      console.log("第一页没有获取到任何通知，请检查选择器或网站结构");
      return;
    }

    const totalPages = await getTotalPages();
    console.log(`共发现 ${totalPages} 页通知`);

    let allNotices = [];
    const maxPagesToCrawl = 50;

    for (let page = 1; page <= Math.min(totalPages, maxPagesToCrawl); page++) {
      process.stdout.write(
        `正在处理第 ${page}/${Math.min(totalPages, maxPagesToCrawl)} 页...\r`
      );
      const notices = await getNoticesByPage(page);
      const filteredNotices = filterNoticesByDate(notices, START_DATE);

      allNotices = allNotices.concat(filteredNotices);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log(`\n共获取 ${allNotices.length} 条符合条件的通知`);

    // 按日期降序排序
    allNotices.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 保存到文件
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allNotices, null, 2), "utf-8");
    console.log(`通知已保存到 ${OUTPUT_FILE}`);
  } catch (error) {
    console.error("爬取过程中发生错误:", error.message);
  }
}

// 执行主函数
main();
