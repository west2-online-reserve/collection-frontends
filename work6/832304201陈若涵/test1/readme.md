# 福州大学通知爬虫工具说明
## 工具概述
这是一个用于爬取福州大学信息公开网通知公告的 Node.js 脚本，能够按日期筛选并将结果保存为 JSON 格式文件。该工具使用 cheerio 进行 HTML 解析，axios 处理 HTTP 请求，适合需要定期获取学校最新通知的场景。
## 核心功能
- 爬取福州大学信息公开网的通知公告
- 按指定日期筛选通知（只保留指定日期之后的通知）
- 自动处理分页，获取多页内容
- 将结果保存为 JSON 格式文件，包含标题、发布部门、日期和链接
## 依赖项
- cheerio: 用于解析 HTML 内容
- axios: 用于发送 HTTP 请求
- fs: Node.js 内置文件系统模块
- url: Node.js 内置 URL 处理模块
## 主要配置
脚本中的常量可根据需求修改：
``` 
const BASE_URL = "https://info22.fzu.edu.cn/lm_list.jsp"; // 爬取的基础URL
const START_DATE = "2025-07-01"; // 起始日期，只保留此日期之后的通知
const OUTPUT_FILE = "notices.json"; // 输出文件名称
```
## 核心函数说明
```parseNoticeItem(item, baseUrl)```
    - 功能：解析单个通知项
    - 参数：通知 HTML 元素和基础 URL
    - 返回：包含标题、部门、日期和完整 URL 的通知对象
```getTotalPages()```
    - 功能：获取总页数
    - 实现：通过分析分页信息计算总页数
```getNoticesByPage(pageNum)```
    - 功能：获取指定页面的所有通知
    - 参数：页码
    -返回：该页面所有通知的数组
```filterNoticesByDate(notices, startDate)```
    - 功能：按日期筛选通知
    - 参数：通知数组和起始日期
    - 返回：符合日期条件的通知数组
```- main()```
    - 功能：主函数，协调各部分工作
    - 流程：初始化→获取总页数→分页爬取→筛选→排序→保存结果
## 使用方法
1. 确保已安装 Node.js 环境
2. 安装依赖：```npm install cheerio axios```
3. 根据需要修改配置常量
4. 运行脚本：```node [脚本文件名].js```
5. 查看结果文件```notices.json```
## 输出格式
结果文件为 JSON 格式，每条通知包含以下字段：
- title: 通知标题
- department: 发布部门
- date: 发布日期
- url: 通知详情页链接
ps:通知按发布日期降序排列，最新的通知将显示在前面。