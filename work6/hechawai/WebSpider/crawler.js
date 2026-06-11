const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs').promises;

const BASE_URL = 'https://info22.fzu.edu.cn';
const LIST_URL = 'https://info22.fzu.edu.cn/lm_list.jsp?wbtreeid=1460';

const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
};

const axiosInstance = axios.create({ timeout: 10000, headers });

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function isAfterStartDate(dateStr) {
    if (!dateStr) return false;
    const date = new Date(dateStr);
    return date >= new Date('2026-01-01');
}

async function parseListPage(url) {
    console.log(`请求: ${url}`);
    const response = await axiosInstance.get(url);
    const $ = cheerio.load(response.data);
    
    const notices = [];
    
    // 修正1：正确的选择器 - 定位到每个通知项
    $('.list li.clearfloat, .list li').each((i, elem) => {
        // 修正2：提取部门（从第一个a标签，class="lm_a"）
        const deptLink = $(elem).find('a.lm_a').first();
        if (deptLink.length === 0) return;  // 没有部门就跳过
        
        let department = deptLink.text().trim();
        // 如果部门没有【】，就加上（有些页面可能没有）
        if (!department.startsWith('【')) {
            department = `【${department}】`;
        }
        
        // 修正3：提取标题（从第二个a标签，或者不含lm_a的a标签）
        const titleLink = $(elem).find('a:not(.lm_a)').first();
        if (titleLink.length === 0) return;
        
        let title = titleLink.attr('title') || titleLink.text().trim();
        
        // 修正4：提取链接（标题的href）
        let link = titleLink.attr('href');
        if (link && !link.startsWith('http')) {
            link = link.startsWith('/') ? BASE_URL + link : BASE_URL + '/' + link;
        }
        
        // 提取日期（从span.fr）
        const dateSpan = $(elem).find('span.fr').first();
        let date = dateSpan.text().trim();
        
        // 验证日期格式
        if (!date.match(/\d{4}-\d{2}-\d{2}/)) {
            // 如果日期格式不对，尝试从其他地方找
            const text = $(elem).text();
            const dateMatch = text.match(/(\d{4}-\d{2}-\d{2})/);
            if (dateMatch) date = dateMatch[1];
        }
        
        if (link && title && department && date) {
            notices.push({
                title: title,
                link: link,
                date: date,
                department: department
            });
        }
    });
    
    return notices;
}

// 获取下一页的URL
function getNextPageUrl(currentUrl, currentPage, $) {
    // 方法1：找"下一页"按钮
    const nextLink = $('a:contains("下一页"), a:contains("下页"), .page a:contains(">")').first();
    if (nextLink.length > 0 && nextLink.attr('href')) {
        let href = nextLink.attr('href');
        if (!href.startsWith('http')) {
            href = href.startsWith('/') ? BASE_URL + href : BASE_URL + '/' + href;
        }
        return href;
    }
    
    // 方法2：手动构造（如果分页是page参数）
    // 注意：你的网站可能不是这种格式，需要根据实际情况调整
    const pageParam = currentUrl.includes('?') ? '&page=' : '?page=';
    return `${LIST_URL}${pageParam}${currentPage + 1}`;
}

// 主函数 (修改后的版本)
async function main() {
    console.log('开始爬取福州大学2026年通知...\n');
    
    let allNotices = [];
    let currentPage = 1;
    let consecutiveEmptyCount = 0; // 记录连续没有2026年通知的页数
    const MAX_EMPTY_PAGES = 5;     // 如果连续5页都没有2026年通知，就停止
    
    while (true) {
        try {
            // 构造页码URL
            const pageUrl = currentPage === 1 
                ? LIST_URL 
                : `https://info22.fzu.edu.cn/lm_list.jsp?totalpage=1139&PAGENUM=${currentPage}&wbtreeid=1460`;
            
            const notices = await parseListPage(pageUrl);
            
            // 筛选出2026年的通知
            const validNotices = [];
            for (const notice of notices) {
                if (isAfterStartDate(notice.date)) {
                    validNotices.push(notice);
                }
            }
            
            const validCount = validNotices.length;
            
            if (validCount > 0) {
                // 只要还有2026年的数据，就重置计数器
                consecutiveEmptyCount = 0;
                allNotices.push(...validNotices);
                console.log(`第${currentPage}页: 共${notices.length}条，其中2026年${validCount}条，累计${allNotices.length}条`);
            } else {
                // 这一页没有2026年的数据，增加计数
                consecutiveEmptyCount++;
                console.log(`第${currentPage}页: 共${notices.length}条，其中2026年0条 (连续${consecutiveEmptyCount}页无2026年数据)`);
                
                // 如果连续多页都没有2026年数据，说明已经爬完了，结束循环
                if (consecutiveEmptyCount >= MAX_EMPTY_PAGES) {
                    console.log(`\n已连续${MAX_EMPTY_PAGES}页没有2026年的通知，爬取完成。`);
                    break;
                }
            }
            
            // 安全停止：防止无限循环（最多爬取200页）
            if (currentPage > 200) {
                console.log(`\n已达到安全页数限制(200页)，停止爬取。`);
                break;
            }
            
            currentPage++;
            await delay(500); // 延迟0.5秒
            
        } catch (error) {
            console.error(`第${currentPage}页请求失败:`, error.message);
            consecutiveEmptyCount++;
            
            // 如果连续失败，也停止爬取
            if (consecutiveEmptyCount >= MAX_EMPTY_PAGES) {
                console.log(`\n连续${MAX_EMPTY_PAGES}页请求失败，停止爬取。`);
                break;
            }
            currentPage++;
        }
    }
    
    // 保存结果
    await fs.writeFile('notices.json', JSON.stringify(allNotices, null, 2));
    
    console.log(`\n完成！`);
    console.log(`   - 共爬取 ${currentPage - consecutiveEmptyCount} 页`);
    console.log(`   - 共获得 ${allNotices.length} 条2026年的通知`);
    console.log(`   - 已保存到 notices.json`);
    
    // 输出统计信息
    if (allNotices.length > 0) {
        const departments = [...new Set(allNotices.map(n => n.department))];
        const dates = allNotices.map(n => n.date);
        const minDate = dates.reduce((a, b) => a < b ? a : b);
        const maxDate = dates.reduce((a, b) => a > b ? a : b);
        
        console.log(`\n统计:`);
        console.log(`   - 涉及部门: ${departments.length} 个`);
        console.log(`   - 日期范围: ${minDate} 至 ${maxDate}`);
        
        console.log(`\n数据预览（前3条）：`);
        allNotices.slice(0, 3).forEach((notice, i) => {
            console.log(`\n${i+1}. ${notice.department} ${notice.title}`);
            console.log(`   日期: ${notice.date}`);
            console.log(`   链接: ${notice.link}`);
        });
    }
}

// 运行
main().catch(console.error);
