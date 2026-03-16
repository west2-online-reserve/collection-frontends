const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const baseUrl = 'https://info22.fzu.edu.cn/';
const frontUrl = 'https://info22.fzu.edu.cn/lm_list.jsp?totalpage=1079';
const backUrl = '&wbtreeid=1460';

async function crawlPages() {
  let pageNum = 1;
  const datas = [];
  let shouldContinue = true;

  while (shouldContinue) {
    try {
      console.log(`正在抓取第 ${pageNum} 页...`);
      const response = await axios.get(`${frontUrl}&PAGENUM=${pageNum}${backUrl}`);
      const html = response.data;
      const $ = cheerio.load(html);

      const pageItems = [];
      $('div[class="list fl"]').find('UL').find('li').each(function(i, elem) {
        const data = {
          office: $(this).find('a[class="lm_a"]').text().trim(),
          title: $(this).find('a[class="lm_a"]').next().attr('title'),
          link: baseUrl + $(this).find('a[class="lm_a"]').attr('href'),
          time: $(this).find('span').text().trim()
        };

        if (new Date(data.time) < new Date('2025-01-01')) {
          shouldContinue = false;
          return false; // 终止each循环
        }
        
        pageItems.push(data);
      });

      if (pageItems.length === 0) {
        shouldContinue = false;
      } else {
        datas.push(...pageItems);
        pageNum++;
      }

      // 添加延迟避免请求过快
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`抓取第 ${pageNum} 页时出错:`, error.message);
      shouldContinue = false;
    }
  }
  return datas;
}

(async () => {
  try {
    const results = await crawlPages();
    console.log('共抓取到:', results.length, '条数据');
    
    // 保存到文件
    fs.writeFileSync(
      path.join(__dirname, 'notices.json'),
      JSON.stringify(results, null, 2)
    );
    console.log('数据已保存到 notices.json');
  } catch (error) {
    console.error('程序出错:', error);
  }
})();
