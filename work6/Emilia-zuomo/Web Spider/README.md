# 🎓 福州大学通知爬虫 (FZU Notice Crawler)

一个基于 Node.js 的高性能、并发安全的福州大学通知公告抓取工具。支持列表页与详情页自动解析、GBK 编码自动转码、SQLite 持久化存储及 JSON 导出，适用于数据采集、信息聚合及校园资讯监控等场景。

## ✨ 核心特性

- **并发控制**：基于 `p-queue` 实现可配置并发数，避免触发目标站点反爬机制
- **编码兼容**：自动识别并转换 GBK/GB2312 编码，彻底解决中文乱码问题
- **双格式存储**：同时支持 SQLite 数据库持久化与 JSON 文件导出
- **智能过滤**：支持按发布日期自动筛选，仅抓取指定时间范围内的通知
- **详情抓取**：自动进入详情页提取正文内容与浏览量
- **容错设计**：网络请求超时重试、解析异常隔离，单条失败不影响整体流程

## 📦 技术栈

| 依赖             | 用途                             |
| :--------------- | :------------------------------- |
| `axios`          | HTTP 请求客户端                  |
| `cheerio`        | 服务端 HTML 解析（jQuery 语法）  |
| `p-queue`        | 异步任务队列与并发限制           |
| `better-sqlite3` | 高性能同步 SQLite 数据库驱动     |
| `util.TextDecoder` | Node.js 内置编码转换器         |

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install axios cheerio p-queue better-sqlite3
```

⚠️ better-sqlite3 为原生模块，安装时需要编译环境。Windows 用户请确保已安装 windows-build-tools，macOS/Linux 用户需安装 python3 和 make/gcc。


### 2. 修改配置

打开 crawler.js 顶部配置区，根据实际需求调整参数：

```javascript

const BASE_URL = 'https://info22.fzu.edu.cn/lm_list.jsp'; // 列表页地址
const WB_TREE_ID = '1460';                                // 栏目 ID
const START_DATE = new Date('2026-01-01');                // 起始抓取日期
const CONCURRENCY = 5;                                    // 并发数（建议 3~8）
const DB_PATH = './fzu_notices.db';                       // SQLite 输出路径
const JSON_PATH = './notices.json';                       // JSON 输出路径
```

### 3. 运行爬虫

```bash
node crawler.js
```

运行后控制台将实时输出抓取进度，完成后自动生成fzu_notices.db 和 notices.json 两个文件。

## 📂 输出说明

SQLite 表结构 (notices)

|字段	|类型	|说明
| :----------- | :-------------|---------------- |
|id	|INTEGER	|自增主键
|title	|TEXT	|通知标题
|department	|TEXT	|发布部门
|publish_date	|TEXT	|发布日期
|url	|TEXT (UNIQUE)	|通知链接（去重依据）
|content	|TEXT	|正文内容
|view_count	|INTEGER	|浏览量
|created_at	|DATETIME	|入库时间

JSON 格式示例

```json

[
  {
    "title": "关于2026年暑期放假安排的通知",
    "department": "校办公室",
    "publish_date": "2026-06-28",
    "url": "https://info22.fzu.edu.cn/info/1460/xxxxx.htm",
    "content": "各单位：\n根据学校工作安排...",
    "view_count": 3842
  }
]
```

## ⚙️ 选择器适配指南
由于高校网站可能不定期改版，若抓取结果为空，请按以下步骤排查：
1. 浏览器打开目标列表页 / 详情页，按 F12 审查元素
2. 确认列表项、标题链接、日期、正文容器的 CSS 选择器
3. 修改 crawlListPage 和 crawlDetail 函数中对应的选择器字符串

💡 提示：代码中已预留多组备选选择器（如 .list_item, .news_list li, table.list_table tr），覆盖了福大通知系统常见结构，通常无需手动修改。

## ⚠️ 免责声明
- 本工具仅供学习研究与技术交流使用
- 请合理设置 CONCURRENCY 并发数，避免对目标服务器造成负担
- 抓取内容版权归原作者所有，请勿用于商业用途或二次传播
- 使用者应自行遵守相关法律法规及目标站点的 robots.txt 协议