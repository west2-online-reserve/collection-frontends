# 部署在本地

# 运行方法
因为福大通知系统需要cookie，我没有校园网，需要手动复制添加cookie，参数`COOKIE_HEADER`


爬取数据
在`/task1/config/config.js`中配置mysql
```SHELL
node scraper.js
```

接口服务
```SHELL
node server.js
```
# 查询接口
1. `GET /notices`
获取全部数据
2. `GET /notices?limit=20&page=1`
分页查询，参数：
* limit
* page
3. `GET /notices/:id`
   点查询

# 说明

文章点击数动态加载，cheerio不支持运行JS，除了用Puppeteer不知道咋拿