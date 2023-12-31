# Web标准

- **Web标准构成** ：
  
  结构(Structure)(**HTML**)(骨架)
  
  表现(Presentation)(**CSS**)（皮肤）
  
  行为(Behavior)(**JavaScript**)（运动）

HTML：超文本标签语言。是一个标记语言，而不是编程语言。

# 1.基本语法

## 1.1 基本语法

1. 标签是尖括号包围的关键词，例如`<html>`

2. 标签一般是成对出现的。`<html> </html>` 分别为开始标签和结束标签

3. 有少部分的单标签 `<br />` 

## 1.2 标签关系

双标签分为：**包含关系**和**并列关系** 。

写在双标签里的就是那个双标签的子标签。并列的就是并列标签。

# 2.基本结构标签

## 2.1 基本结构标签

```html
<html>
    <head>
        <title> 我的第一个页面</title> //标题，显示在网页最上方
    </head>
    <body>
        Hello World! //主体部分
    </body>
</html>
```

上面这串代码就可以直接在html文件里运行了。很简单。

所有东西都是包含在html里的，title是包含在head里的。

## 2.2 vscode快捷键

```
shift+alt+↓ 快速复制一行
ctrl+d 选定多个相同单词（修改方便）
ctr+alt+↑（↓） 添加多个光标
ctrl+h 全局替换单词
ctrl+g 快速定位到某一行
shift+alt+光标拖动 选中一个区块
```

# 3. 网页开发工具

# 4.常用标签

## 4.1 文本标签

- 标题标签 <h1> - <h6>     h几就是几级标签，越大越重要。单独一行出现，加粗放大。

- 段落标签 <p></p> 在内的文字属于一段

- 换行标签 <br/>

- 加粗标签 <strong></strong> 或<b></b>

- 倾斜标签<em></em>或<i></i>

- 删除线 <del></del> <s></s>

- 下划线 <ins></ins> <u></u>

- 盒子 <div> 或<span>(div独占一行，属于一个大盒子，span是小盒子)

## 4.2 图像标签

`<img src = "..."/>`

| 属性     | 属性值  | 说明                      |
| ------ | ---- | ----------------------- |
| src    | 图片路径 | 必须要有                    |
| alt    | 文本   | 替换文本，图片显示不出来的时候可以显示这个文字 |
| title  | 文本   | 提示文本，鼠标放在图片上可以显示文字      |
| width  | 像素   | 宽度                      |
| height | 像素   | 高度                      |
| border | 像素   | 边框粗细                    |

例子：

`<img src="图片.jpg" title = "这是个图片" width = "500"/>`

### 图像路径

- **相对路径**：

若html文件和图片处于**同一级**，那么直接输入图片名称即可`<img src="图片.jpg"/>`

若图片处于html文件**下一级**（html文件与图片文件夹同级），那么用斜杠进入文件夹：

`<img src="图片文件夹/图片.jpg"/>`

若图片处于html**上一级**，（图片与html文件夹同级） 用../`<img src="../图片.jpg" />`

同理，上上一级为`../../`

- **绝对路径（使用较少）**

指图片从盘符开始的绝对位置，或完整的网络地址。

## 4.3 超链接标签

**语法：**

`<a href="跳转目标" target="目标窗口的弹出方式"> 文本或图像 </a>`

| 属性     | 作用                                       |
| ------ | ---------------------------------------- |
| href   | 必须的属性、跳转到另外的url网址，有href就有超链接功能           |
| target | 指定打开方式，默认为_self，替换当前网页。在新窗口打开网页需要用_blank |

href不仅可以指定外部网络链接，还可以

1. 指定内部链接。`href = "xxxx.html"`就可以直接指定同一级的另外一个html文件。

2. 指定文件下载链接。点击后是下载。`href = "xxx.zip"`

3. 空链接。暂定超链接时可以用井号留白。`href = "#"`

而且，一对<a>之间的东西也可以是图像。图像就用上文的图像展示方式展示即可。（可以加一个title用于提示！）

**锚点链接：**（在同一个网页内部跳转到某个位置）

1. 在连接文本的href属性中，设置属性值为#名字的形式。`<a href="#two">第2集</a>`

2. 找到目标位置标签，里面添加一个id属性=刚才的名字，`<h3 id="two">第2集介绍</h3>`

想要返回顶部也很简单，给body一个id，然后给一个跳转到body的链接即可。

# 5 注释和特殊字符

注释：

`<!--xxxx-->`

在html中，很多特殊字符很难打出来，毕竟有可能语法错误，这时候就需要特殊字符。

其他的特殊字符需要的时候查一下就好了，这里只写三个最主要的

| 特殊字符 | 代码       | 解释               |
| ---- | -------- | ---------------- |
| <    | `&lt;`   | 小于号，less than    |
| >    | `&gt;`   | 大于号，greater than |
|      | `&nbsp;` | 一个空格             |

# 6 表格标签

主要用于显示、展示数据。

## 6.1基本语法：

```html
<table>
    <tr>
        <td>单元格内的文字</td>
        ...
    </tr>
    ...
</table>
```

1. `<table>`用于定义表格

2. `<tr>`用于定义表格中的行，必须嵌套在table中。

3. `<td>`用于定义单元格，必须嵌套在tr中。

4. `<th>`表示表格的表头，也是嵌套在tr中的。（也算是单元格，会加粗居中表示）
- 有时候表格会很长，这时候可以用`<thead>`和`<tbody>`进行区分表头和表身
  
  ```html
  <table>
      <thead>
      <tr>
          <th>...</th>
          <th>...</th>
          <th>...</th>
      </tr>
      </thead>
      <tbody>
      <tr>
          <td>...</td>
          <td>...</td>
          <td>...</td>
      </tr>
      <tr>
          <td>...</td>
          <td>...</td>
          <td>...</td>
      </tr>
      </tbody>
  </table>
  ```

## 6.2 表格属性

属性不常用，后面要用CSS来设置。

这些属性要写到table标签里面。

| 属性名         | 属性值                   | 描述                     |
| ----------- | --------------------- | ---------------------- |
| align       | left   center   right | 表格相对于周围元素的对齐方式         |
| border      | 1或""                  | 是否拥有边框。默认为""无边框，1表示有边框 |
| cellpadding | 像素值                   | 规定单元边缘与其内容的空白，默认为1     |
| cellspacing | 像素值                   | 规定单元格之间的空白，默认为2        |
| width       | 像素值或百分比               | 表格的宽度                  |

## 6.3 合并单元格

- 跨行合并：rowspan = "个数"

- 跨列合并：colspan = "个数"

所以，合并单元格分三步

1. 确定是跨行还是跨列

2. 找到目标单元格，合并方式="合并数量"。
   
   `<td rowspan = "2"></td>`

3. 删除多余单元格

# 7 列表标签

整齐有序，布局更自由。

分为无序列表、有序列表、自定义列表。

## 7.1 无序列表（重点）

```html
<ul>
    <li>....</li>
    <li>....</li>
    <li>....</li>
</ul>
```

1. 无序列表各个项之间没有顺序，是并列的。

2. ul里面只能嵌套li，嵌套其他的是不行的

3. li相当于一个容器，可以容纳所有的东西。

4. ul的具体样式会在css里面设置。

## 7.2 有序列表

```html
<ol>
    <li>....</li>
    <li>....</li>
    <li>....</li>
</ol>
```

ol里只能有li

## 7.3 自定义列表

```html
<dl>
    <dt>名词1</dt>
    <dd>名词1解释1</dd>
    <dd>名词1解释2</dd>
<dl>
```

# 8 表单

目的：收集用户信息。

组成：表单域、表单控件(按钮，选项，填空等)、提示信息（文字）。

## 8.1 表单域

`<form>`范围内的表单元素信息会被提交给服务器。

基本语法：

```html
<form action = "url地址 method = "提交方式" name = "名字">
    表单元素控件
</form>
```

| 属性     | 属性值      | 作用                |
| ------ | -------- | ----------------- |
| action | url      | 接收数据服务器程序的url地址   |
| method | get/post | 提交的方式，取值为get或post |
| name   | 名称       | 以区分多个表单           |

## 8.2 表单控件

### **input 输入（单标签）**

`<input type = "属性值" />`

- **type的属性值**们：
1. **text** ：输入单行字段

2. **password** ：输入密码字段

3. **radio** :单选按钮 `性别：男<input type="radio" />女<input type="radio" />`，三个radio必须拥有同一个name值才能实现多选一。

4. **checkbox** ：多选按钮

5. **submit**：提交表单至服务器

6. **reset**：将表单重置

7. **button**：普通按钮，通过JavaScript启动脚本

8. **file**：上传文件
- 除了type之外的属性值:

| 属性        | 属性值     | 描述                                    |
| --------- | ------- | ------------------------------------- |
| name      | 自定义     | 定义input的名称                            |
| value     | 自定义     | 规定input元素的值（对于text是框中默认值，对于选项按钮是选项的值） |
| checked   | checked | 页面打开时默认选中（单选或多选默认选中）                  |
| maxlength | 正整数     | 规定输入字符的最大长度                           |

## 8.3 label标签

用于绑定一个表单元素，当点击文本时，光标会自动跳转到对应的表单元素上，增大点击面积，增强用户体验。

```html
<label for="sex"> 男</label><input type = "radio" name="sex" id="sex"/>
```

label有一个属性`for` 可以指向一个表单元素的id。

## 8.4 其他元素

- 下拉元素`<select>`

```html
籍贯
<select>
    <option>北京</option>
    <option>河南</option>
    <option>日本</option>
</select>
```

1. select中至少包含一对`<option>`

2. `<option>`中定义`selected = "selected"`，当前项为默认选中项
- 文本域`<textaera>`
  
  可以输入很多文字的文本框。
  
  ```html
  今日反馈：
  <textarea>
      。。。。。。
  </textarea>
  ```

cols为每行字符数，rows是显示的行数。但实际开发中都是用CSS来改变大小

# 查阅文档

- W3C

- 百度

- MDN
