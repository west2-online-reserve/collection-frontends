# 环境要求

- Node.js >= 14
- npm 或 yarn

---

# 安装依赖

在项目根目录执行：

```bash
npm install axios cheerio p-queue
```

或者：

```bash
yarn add axios cheerio p-queue
```

---

# 启动项目

执行：

```bash
node webSpider.js "你的Cookie"
```
# CMD 启动方式（推荐）
为了方便使用，本项目提供了：

```txt
start-webSpider.cmd
```

启动脚本。

相比直接使用：

```bash
node webSpider.js "Cookie"
```

CMD 启动方式更加适合：

- 不熟悉命令行的用户
- 频繁更新 Cookie
- Windows 环境快速启动

---
## 使用方法
```text
1. 以管理员身份运行 `start-with-input.cmd`
2. 输入 `webSpider.js` 所在的完整目录路径
3. 等待脚本自动完成依赖安装
4. 输入 cookie（可以右键粘贴）并启动爬虫
```
---



```text
该爬虫运行刚需对应网站的cookie可从 https://info22-443.webvpn.fzu.edu.cn/lm_list.jsp?urltype=tree.TreeTempUrl&wbtreeid=1460 中获取
打开开发者工具
按 F12 键
或右键页面 → 选择"检查"
切换到 Network（网络）标签
点击顶部的 Network
如果没有看到请求，刷新页面（F5）
找到任意请求
点击任意一个请求（如第一个 document 类型或 .html 文件）
复制 Cookie
点击 Headers（标头）标签
滚动到 Request Headers（请求标头）区域
找到 Cookie: 这一行
复制整行 Cookie 的值（从开头到结尾）
然后打开start-webSpider.cmd，输入Cookie即可开始工作
爬取的结果字段会以
```
```json
    {
        "department": "【教务处】",
        "title": "福州大学关于开展2025-2026学年本科教学优秀奖评选工作的通知",
        "url": "https://info22-443.webvpn.fzu.edu.cn/content.jsp?urltype=news.NewsContentUrl&wbtreeid=1310&wbnewsid=40521",
        "date": "2026-04-20",
        "content": [
          "正文"
        ],
        "clickCount": 774
    },
```
方式存储，注意content是一个数组



