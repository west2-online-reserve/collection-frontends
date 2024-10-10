# html基础

## html简介
- html是超文本标记语言，用于描述网页结构,应该关注的是语义，而不是样式
- html由标签组成，标签由尖括号包围，如`<html>`，`<head>`，`<body>`等
- 标签分为行内标签和块级标签，行内标签不会独占一行，块级标签会独占一行
## html基本格式
```html
<!DOCTYPE html>
<!--声明文档-->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!--定义字符编码方式-->
    <!--注释-->
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```

## html标签
### 分类1-常用文档标签
- html
> html标签是根标签，所有的标签都在html标签内
- head
> head标签用于包含网页的元数据，如标题，字符编码，样式表，脚本等
- body
> body标签用于包含网页的内容，如文本，图片，链接等
- title
```html
<title>搜索结果的文字，标签页的名称</title>
```
- meta
```html
<meta name="keyword" content="网上购物,网上商城">
<meta name="description" content="专业的网上购物商城">
<!--name是数据名，content是数据内容-->
<!--优化浏览器对网页的搜索-->
```
```html
<meta http-equiv="refresh" content="5;url=http://www.baidu.com">
<!--5秒后跳转到百度-->
```
- base
```html
<base target="_blank">
<!--所有链接都在新窗口打开-->
```
- link
> link标签用于定义文档与外部资源的关系，如样式表，图标等
```html
<link rel="stylesheet" href="style.css">
<!--链接到CSS文档-->
```
- style
> style标签用于定义文档的样式，可以包含CSS代码
```html
<style>
    body {
        background-color: red;
    }
</style>
```
- script
> script标签用于定义文档的脚本，可以包含JavaScript代码
```html
<script>
    alert("Hello World!");
</script>
```
### 分类2-常用内容样式标签
#### 基本板块？
- div
> div标签用于定义一个块级元素，可以包含其他元素
```html
<div>div内容</div>
```
- span
> span标签用于定义一个行内元素，可以包含其他元素
```html
<span>span内容</span>
```
- h1-h6
>h1-h6标签用于定义标题，h1-h6标签的权重依次递减，h1在一个网页一般只使用一个
```html
<hgroup>
    <h1>主标题</h1>
    <h2>副标题</h2>
</hgroup>
```
#### 板块内容？
- p 
> p标签用于定义段落
```html
<p>段落内容</p>
```
- img
```html
<img src="image.jpg" alt="图片描述" title="鼠标悬停提示">
<!--src是图片地址，alt是图片描述，title是鼠标悬停提示-->
```
>属性width="100px" height="100px" 默认单位是像素px

>好像不很支持大图缩小，小图放大

>jepg(颜色较丰富)、png（颜色丰富，不支持动图，透明复杂图效果好）、gif（颜色较少，支持动图）、webp(颜色丰富，体积小，但兼容性差)、base64（将图片转换为base64编码，可以直接嵌入到html中,图片和网页需要一起加载时使用）
- li
> li标签用于定义列表项
- ul
> ul标签用于定义一个无序列表
```html
<ul>
    <li>列表项1</li>
    <li>列表项2</li>
    <li>列表项3</li>
</ul>
```
- ol
> ol标签用于定义一个有序列表
```html
<ol>
    <li>列表项1</li>
    <li>列表项2</li>
    <li>列表项3</li>
</ol>
```
- dl
> dl标签用于定义一个定义列表
```html
<dl>
    <dt>列表项1</dt>
    <dd>描述</dd>
    <dt>列表项2</dt>
    <dd>描述</dd>
</dl>
```
>列表可以互相嵌套
#### 文本简单布局？
- br
> 用于换行
```html
content1<br>content2
```
- hr
>用于水平线
```html
<hr>
```
#### 文本具体展示？
- a
> a标签用于定义一个超链接，href属性用于指定链接的目标地址
```html
<a href="#">回到顶部</a>
<a href="index.html">跳转到index.html</a>
<a href="baidu.com">跳转到百度</a>
<a href="#id">跳转到id</a>
<!--""可以是外部网页链接，
也可以是同一目录下的其它html文件,
"#"则是顶部,
id是元素属性,不能重复，"#id"跳转到相应位置-->

<!--
    ./表示在当前目录找
    ../表示在上一级目录找
    ./xxx/xxx一级一级往下找
-->

<!--在开发中可以用"#"占位
    或用"javascript:;"占位，不会发生跳转
-->
```
```html
<a href="#" target="_self">跳转到"#"</a>
<!--本标签页跳转-->
<a href="#" target="_blank">跳转到"#"</a>
<!--从新标签页打开-->
```
- em
> em标签用于强调文本，文本会以斜体显示
```html
<em>content1</em>
```
- strong
> strong标签用于强调文本，文本会以粗体显示
```html
<strong>content1</strong>
```
- code
> code标签用于显示代码
```html
<code>
    content1
```
### 分类3-常用块/行级标签
#### 块级标签
>特点：不可以和其他元素保持在同一行（独占一行），自动换行，能设置宽高
- div
- p
- h1-h6
- ul
- ol
- li
- dl
- dt
- dd
- blockquote 引用
#### 行级标签
>特点：和其他元素保持在同一行，不可以自动换行，不能设置宽高,但是可以设置内边距和外边距，主要用来包裹文字
- span
- a
- img
- input
- button
- label
- select
- option
- textarea
- q
#### 行内块级标签
>特点：可以和其他元素保持在在一行，还能能设置宽高
- img
- input
- button
- label
- select
- option
- textarea
- code
>一般会在块元素中使用行内块元素，而不会在行元素中放块元素。（块元素内可以放大部分元素）

>网页中一般通过块元素布局

>p元素内不可以放块元素
### 布局标签（不常用）
- header
> header标签用于定义网页的头部
- footer
> footer标签用于定义网页的底部
- nav
> nav标签用于定义网页的导航栏
- article
> article标签用于定义网页的文章内容
- section
> section标签用于定义网页的章节内容
- aside
> aside标签用于定义网页的侧边栏内容
- main
> main标签用于定义网页的主要内容
- figure
> figure标签用于定义网页的图片内容
- figcaption
> figcaption标签用于定义网页的图片标题
- details
### 内联框架(不常用)
- iframe
> iframe标签用于定义一个内联框架，可以包含其他网页的内容
```html
<iframe src="https://www.baidu.com" width="500px" height="500px"></iframe>
<!--src是网页地址-->
<!--属性：
    width height
    frameborder="0" 去掉边框
-->
```
### 音视频标签（不常用）
- audio(ie8以下不支持)
> audio标签用于定义音频
```html
<audio src="audio.mp3" controls></audio>
<!--src是音频地址-->
<!--属性：
    controls 显示播放控件
    autoplay 自动播放,但大部分浏览器不支持
    loop 循环播放
-->
<audio controls>
    浏览器不支持
    <!--浏览器不支持时显示-->
    <source src="">
    <source src="">
    <!--自动寻找能播放的-->
</audio>
```
- video
> video标签用于定义视频
```html
<video src="video.mp4" controls></video>
<!--src是视频地址-->
<!--属性：-->
```
- embed
## 工具
- 文档查询 zeal w3cschool 菜鸟
- 网页右键查看源代码（源代码，检查）

# CSS基础
## CSS选择器

> CSS样式由选择器和声明组成，声明由属性和值组成
### 常用选择器
```css
选择器{
    属性:值;
}
/*注释*/
#id{
    属性：值;
}
.class{
    属性：值;
}
/*<p class="class1 class2">content</p>*/
*{
    属性：值;
}
/*全部*/
选择器.class{
    属性：值;
}
/*多重选择器*/
```
### 复合选择器
```css
选择器.class{
    属性：值;
}/*交集选择器*/
.class1.class2{
}/*交集选择器*/
选择器，选择器{
    属性:值;
}
/*合并选择*/
```
### 关系选择器
```css
父元素>子元素{
    属性：值;
}
/*子元素 direct son*/
父元素 子元素{
    属性：值;
}
/*后代元素 all*/
父元素+子元素{
    属性：值;
}
/*相邻兄弟元素  next brother*/
父元素~子元素{
    属性：值;
}
/*通用兄弟元素  all later brother*/
```
### 属性选择器
```css
p[title]{}
p[title=abc]{

}
p[title^=abc]{

}
/*以abc开头*/
p[title$=abc]{

}
/*以abc结尾*/
p[title*=abc]{

}
/*包含abc*/
p[title~=abc]{

}
/*包含abc,用空格隔开*/
p[title|=abc]{
    
}
/*以abc开头，后面只能跟-*/
/*属性选择器*/
```
### 伪类选择器
```css
a:link{
    /*未访问,只改颜色*/
}
a:visited{
    /*已访问，只改颜色*/
}
a:hover{
    /*鼠标悬停*/
}
a:active{
    /*鼠标点击*/
}
p:nth-child(n){

}/*1,2,n,2n,even,odd*/
/*
:first-child
:last-child
:first-of-type
:last-of-type
:nth-of-type(n)
*/
p>li:not(:nth-of-type(2)){
    /*除了第二个li*/
}
/*伪类选择器*/
```
### 伪元素选择器
```css

p::first-letter{
    /*首字母*/
}
p::first-line{
    /*首行*/
}
p::before{
    content:'aaa';
    color:red;
    /*在元素内容之前插入内容*/
}
p::after{
    content:'content';
    color:red;
    /*在元素内容之后插入内容*/
}
/*伪元素选择器*/
```
## CSS编写位置
### 分类1-内联样式
> 在标签中添加style属性，属性值为css样式
```html
<p style="color: red;" front-size=30px>content1</p>

### 分类2-内部样式
> 在html文件中添加style标签，在style标签中添加css样式,开发中不常用
```html
<style>
    p{
        color: red;
    }
</style>
```
>在head中设置CSS样式，通过CSS选择器选择样式，但不能跨文件使用

### 分类3-外部样式
> 将CSS样式写到外部的文件中，在html中用link标签引入
```html
<link rel="stylesheet" href="./style.css">
```
## 选择器权重
内联样式 1000 <br>
id选择器 100<br>
类和伪类选择器 10<br>
标签选择器 1<br>
通配符选择器 0<br>
继承的样式没有权重 -1<br>
选择器权重相加，但不能跨级<br>
权重一样，写在后面的生效<br>
```css
.class1{
    color: red !important;
}
```
> !important可以提升选择器的权重，但一般不推荐使用

## CSS属性
### 长度
单位<br>
px 像素<br>
em 相对单位，1em=1 front-size,相对于当前元素的字体大小。默认是16px<br>
rem 相对单位，相对于根元素的字体大小<br>
```css
html{
    font-size: 16px;
}
```
% 相对单位，相对于父元素的宽度<br>
### 颜色
- 颜色名
- #十六进制
- rgb(r,g,b)
- rgba(r,g,b,a)
- hsl(h,s,l)
- hsla(h,s,l,a)
### 字体属性
```css
font-size: 30px;
/*字体大小*/
font-family: '宋体';
/*字体类型*/
font-weight: bold;
/*字体粗细*/
font-style: italic;
/*字体样式*/
font: italic bold 30px '宋体';
/*简写*/
```
### 文本属性
```css
text-align: center;
/*文本对齐方式*/
```
### border
>width和height属性是内容区域，所有元素都放置在内容区。
```css
/*基本属性*/
border-width: 1px;
/*边框宽度*/
border-style: solid;
/*边框样式*/
border-color: red;
/*简写*/
border: 1px solid red;

/*设定位置*/
border-top: 1px solid red;
border-right: 1px solid red;
border-bottom: 1px solid red;
border-left: 1px solid red;
/*位置和属性*/
border-top-width: 1px;
border-top-style: solid;
border-top-color: red;

/*简写规律*/
border-width: 1px 2px 3px 4px;
/*上 右 下 左*/
border-width: 1px 2px 3px;
/*上 左右 下*/
border-width: 1px 2px;
/*上下 左右*/
border-width: 1px;
/*上下左右*/

/*border样式*/
border-style: solid dashed dotted;
```
### padding
> padding是内边距，用于设置元素内容与元素边框之间的距离
```css
/*基本属性*/
padding-top: 10px;
padding-right: 10px;
padding-bottom: 10px;
padding-left: 10px;

/*简写同上*/
```
### margin
> margin是外边距，用于设置元素与元素之间的距离
```css
/*基本属性*/
margin-top: 10px;
margin-right: 10px;
margin-bottom: 10px;
margin-left: 10px;

/*简写同上*/
/*一般在右边和下边的值用来设置与右边和下边的元素的距离，如果右边和下边没有其它元素则不起效果。
一般设置上和左边的值*/
```
### 水平方向布局
> 元素在其父元素中水平方向的位置由以下属性决定：
> 1. margin-left
> 2. border-left
> 3. padding-left
> 4. width
> 5. padding-right
> 6. border-right
> 7. margin-right
> 8. 父元素内容宽度

>要求：如果7个值加起来大于父元素内容宽度，则元素会被挤出去<br>
首先，width默认是auto,margin-left和margin-right也可以是auto<br>
其次，前7个值加起来应该等于第8个值<br><br>
有auto的情况下:<br>
若width为auto,则width尽量大<br>
若margin-left和margin-right为auto,则平分剩余空间<br>
若margin-left和margin-right仅有一个为auto,则auto的值为剩余空间<br><br>
没有auto的情况下:<br>
调整magin-right的值，使7个值的和等于父元素内容宽度<br><br>
若7个值的和超过父元素内容宽度，让magin-right为负

>行内元素不支持width和height属性，但支持padding和margi和border属性，但只作用在元素左右，不影响上下布局。

### 垂直方向布局
>如果没有设置父元素高度：<br>
父元素高度由内容决定<br><br>
如果父元素设置高度，父元素该是多高就多高。<br><br>
如果内容超过父元素高度，内容会溢出，需要用到属性overflow

```css
overflow: visible;
/*默认值，内容不会被裁剪，会溢出*/
overflow: hidden;
/*内容会被裁剪，溢出部分不可见*/
overflow: scroll;
/*生成两个方向滚动条，用来查看完整内容*/
overflow: auto;
/*根据需要生成滚动条*/
overflow-x: scroll;
/*生成水平滚动条*/
overflow-y: scroll;
/*生成垂直滚动条*/
```
### 外边距的折叠
> 垂直方向上，相邻的两个元素的外边距会发生重叠，重叠的值为两个元素外边距中较大的那个。<br>
（相邻外边距其一未负，相加。皆为负，取绝对值大者。）<br>
父子元素相邻外边距，子元素会传递给父元素。（主要是上外边距）（可临时用padding和border解决，需要进行数字的调整）<br>

### display
> display属性用于设置元素的显示类型
```css
/*块级元素*/
display: block;
/*行内元素*/
display: inline;
/*行内块元素,一般不使用*/
display: inline-block;
/*元素隐藏，不保留位置，更常用*/
display: none;

visibility: visible;
/*元素可见*/
visibility: hidden;
/*元素不可见，保留位置*/
```
### 浏览器默认样式
>body的默认外边距是8px<br>
p和ul也有默认外边距<br>
```css
*{
    margin: 0;
    padding: 0;
}
/*练习常用写法，会有残留*/

/*使用重叠样式表，用link链接
-reset.css  去除默认样式
-normalize.css 统一样式
*/
``` 


### 盒子类型box-sizing
```CSS
box-sizing: border-box;
/*设置盒子类型为border-box，盒子的width和height属性包括border和padding*/

box-sizing: content-box;
/*设置盒子类型为content-box，盒子的width和height属性不包括border和padding*/
```
### box的其它属性
```css
outline: 1px solid red;
/*设置轮廓，但不占据空间,不属于元素，不会挤开其它元素*/


box-shadow:1px 1px  10px black;
/*设置阴影，不属于元素，不会挤开其它元素,分别设置向右、下偏移量,阴影模糊半径*/


border-radius: 50%;
/*设置圆角，50%为圆形*/
border-top-left-radius: 10px;
border-top-right-radius: 10px;
border-bottom-left-radius: 10px;
border-bottom-right-radius: 10px;
border-radius: 10px 20px 30px 40px;
/*左上 右上 右下 左下
左上 右上/左下 右下
左上/右下 右上/左下
*/

border-top-left-radius: 10px 20px;
/*分别表示水平和垂直的半径*/

box-radius:50%;
/*设置圆形*/
```
### 浮动
```css
float: left;
/*元素向左浮动*/
float: right;
/*元素向右浮动*/
float: none;
/*默认，元素不浮动*/
```
>如果设置了浮动模式:<br>
（实现块水平布局）<br>
1.元素会脱离文档流，不再占据原来的位置而是向左或向右移动，直到碰到父元素的边界或另一个浮动元素。<br>
2.水平布局等式不再成立，不再占据原来的位置，故下边的元素会向上移动。<br>
3.如果上面是不浮动的块级元素，则浮动元素无法占据上面元素的位置。<br>
4.浮动元素在垂直方向上不会高于先于它浮动的元素。<br>
5.浮动元素超出一行时，向下移动。<br>
6.浮动元素不会盖住文字，可以用来实现文字环绕。<br>
7.浮动元素脱离文档流后，性质会发生改变，变为类似行内块元素，可以设置宽高，默认宽高由内容撑开，且不独占一行。

### 清除浮动
```css
clear: left;
/*清除左浮动*/
clear: right;
/*清除右浮动*/
clear: both;
/*清除左右浮动*/
```
### 弹性盒flex
>弹性盒是一种布局模型，可以用来实现复杂布局，如水平或垂直方向的布局，以及元素的排列和分布。<br>
```css
display: flex;
display: inline-flex;/*较少*/
/*设置元素为弹性容器，弹性容器的直接子元素是弹性元素*/

/*对弹性容器：*/
flex-direction: row;/*row-reverse*/
/*设置主轴方向为水平方向*/
flex-direction: column;/*column-reverse*/
/*设置主轴方向为垂直方向*/

flex-wrap: wrap;/*默认值nowrap，其它wrap-reverse*/
/*设置元素在位置不够时换行*/

flex-flow: row wrap;/*direction和wrap属性简写*/

justify-content: center;
/*设置主轴方向上的对齐方式，居中*/
/*
-flex-start沿主轴前端排列
-flex-end沿主轴后端排列
-space-between沿主轴两端排列，元素之间等距
-space-around空白平均到元素两侧
-space-evenly空白平均到元素的一侧，兼容性不好*/

align-items: center;
/*设置交叉（辅）轴方向上的对齐方式，居中*/
/*
-stretch 主轴上一线上元素长度相同
-flex-start 沿交叉轴起边排列
-flex-end 沿交叉轴后端排列
-center 沿交叉轴居中排列
-baseline 沿(文字)基线对齐，少用
*/

align-content: center;/*设置多行元素在交叉轴方向上的对齐方式，居中*/
/*属性值与justify-content类似*/

/*对弹性元素：*/
flex-grow: 1;
/*设置弹性元素的放大比例，默认为0，即如果存在剩余空间，也不放大*/
/*剩余空间会按数字比例分配*/

flex-shrink: 1;
/*设置弹性元素的缩小比例，默认为1，即如果空间不足，该元素将缩小*/
/*剩余空间会按数字和元素大小分配*/

flex-basis: auto;/*默认值*/
/*设置的是元素在主轴上的大小，可能覆盖width和height属性*/

flex:1 1 auto;/*grow shrink basis的简写*/
/*属性值：
initial : 0 1 auto
auto : 1 1 auto
none : 0 0 auto
*/

order: 1;
/*设置弹性元素的排列顺序，默认为0，数值越小越靠前*/

/*在弹性元素的选择器中设置*/
align-self: stretch;
/*用来覆盖align-items,给弹性元素单独设置值*/

/*以上都在弹性容器选择器中设置*/
```

