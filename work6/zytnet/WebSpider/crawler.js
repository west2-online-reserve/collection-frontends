const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const { getQueue } = require('./queue');

// 配置常量
const BASE_URL = 'https://info22.fzu.edu.cn';
//const START_URL = 'https://info22.fzu.edu.cn/lm_list.jsp?wbtreeid=1460';
const START_URL = "https://info22.fzu.edu.cn/lm_list.jsp?totalpage=1068&wbtreeid=1460";
const START_DATE = new Date(new Date().getFullYear(), 5, 16); // 今年1月1日
const OUTPUT_FILE = 'notices.json';
const CONCURRENCY_LIMIT = 5; // 并发请求数量限制

// 主函数 - 爬取通知
async function crawlNotices() {
    console.log('开始爬取福州大学通知文件系统...');
    console.log(`日期范围: ${START_DATE.toLocaleDateString()} 至今`);

    // 存储所有通知的数组
    const allNotices = [];

    // 当前页码
    let currentPage = 1;
    let hasMorePages = true;

    const queue = await getQueue();

    try {
        // 循环处理所有页面
        while (hasMorePages) {
            console.log(`正在处理第 ${currentPage} 页...`);

            // 构建当前页URL
            const pageUrl = `${START_URL}${currentPage === 1 ? '' : `&PAGENUM=${currentPage}`}`;

            // 获取页面内容
            const html = await fetchPage(pageUrl);
            if (!html) {
                console.log(`第 ${currentPage} 页获取失败，跳过...`);
                currentPage++;
                continue;
            }

            // 解析页面内容
            const { notices, shouldContinue } = parsePage(html);

            // 将本页通知添加到总列表
            allNotices.push(...notices);

            // 检查是否应该继续爬取下一页
            if (!shouldContinue) {
                hasMorePages = false;
                console.log('已达到日期范围上限，停止爬取后续页面');
            } else if (notices.length === 0) {
                hasMorePages = false;
                console.log('当前页面无通知，停止爬取后续页面');
            } else {
                currentPage++;
            }
        }

        // 并发爬取每个通知的正文及访问人数
        const promises = allNotices.map(notice => {
            return queue.add(() => fetchNoticeDetails(notice));
        });

        await Promise.all(promises);

        // 保存结果
        return saveResults(allNotices);

    } catch (error) {
        console.error('爬取过程中发生错误:', error.message);
    }
}

// 获取页面内容
async function fetchPage(url) {
    try {
        console.log(`请求: ${url}`);
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
                'Connection': 'keep-alive'
            },
            timeout: 10000 // 10秒超时
        });
        return response.data;
    } catch (error) {
        console.error(`请求页面失败: ${url}`, error.message);
        return null;
    }
}

// 解析页面内容
function parsePage(html) {
    const $ = cheerio.load(html);
    const notices = [];
    let shouldContinue = true; // 是否继续爬取下一页

    // 选择所有通知列表项
    $('ul li.clearfloat').each((index, element) => {
        const $li = $(element);

        // 提取发布日期
        const dateText = $li.find('p span').text().trim();
        const publishDate = new Date(dateText);

        // 检查日期是否在范围内
        if (publishDate < START_DATE) {
            shouldContinue = false;
            return false; // 停止遍历
        }

        // 提取部门
        const department = $li.find('p a').eq(0).text().trim();

        // 提取标题和链接
        const $titleLink = $li.find('p a').eq(1);
        const title = $titleLink.text().trim();
        const relativeUrl = $titleLink.attr('href');
        const fullUrl = new URL(relativeUrl, BASE_URL).href;

        // 添加到通知列表
        notices.push({
            publishDate: dateText,
            department,
            title,
            url: fullUrl
        });
    });

    return { notices, shouldContinue };
}

// 爬取每个通知的正文及访问人数
async function fetchNoticeDetails(notice) {
    try {
        console.log(`请求通知详情: ${notice.url}`);
        const response = await axios.get(notice.url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
                'Connection': 'keep-alive'
            },
            timeout: 10000 // 10秒超时
        });

        const $ = cheerio.load(response.data);

        // 提取正文
        //const content = $('div.v_news_content').text().trim();
        const content = $('#vsb_content').text().trim();

        // 提取访问人数
       // const viewCountText = $('div.conthsj span').text().trim();
        //form[name="_newscontent_fromname"] 
        //console.log(`访问人数: ${viewCountText}`);
        //const viewCount = parseInt(viewCountText);

        // 更新通知对象
        notice.content = content;
        //notice.viewCount = viewCount;

    } catch (error) {
        console.error(`请求通知详情失败: ${notice.url}`, error.message);
    }
}

// 保存结果到文件
function saveResults(notices) {
    try {
        // 创建结果对象
        const result = {
            total: notices.length,
            generatedAt: new Date().toISOString(),
            startDate: START_DATE.toISOString(),
            endDate: new Date().toISOString(),
            data: notices
        };

        // 写入文件
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));
        console.log(`\n爬取完成！共获取 ${notices.length} 条通知`);
        console.log(`结果已保存至: ${path.resolve(OUTPUT_FILE)}`);

        // 显示前3条结果作为示例
        console.log('\n示例数据:');
        if (notices.length > 0) {
            for (let i = 0; i < Math.min(3, notices.length); i++) {
                console.log(`[${i + 1}] ${notices[i].publishDate} | ${notices[i].department} | ${notices[i].title} | 访问人数: ${notices[i].viewCount}`);
            }
        }
        return notices;
    } catch (error) {
        console.error('保存结果失败:', error.message);
    }
}

// 启动爬虫
//crawlNotices();
module.exports = {
    crawlNotices
};
//crawlNotices();