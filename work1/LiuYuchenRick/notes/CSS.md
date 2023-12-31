美化网页！

# 1.简介

## 1.1 语法规范

`选择器{属性:值；}`

## 1.2 CSS代码风格

```css
<style>
h3{
    color:pink;
    font-size:20px;
}
</style>
```

展开式风格，更加直观。

# 2 基础选择器

## 2.1 标签选择器

- 作用：选择标签

用标签名作选择器，将某个标签全部选择出来，快速修改同类型的所有标签。

不能进行差异化选择

## 2.2 类选择器

```css
/*类名前面要有点*/
.类名{
    属性:属性值;
    属性:属性值;
}
```

利用class属性进行调用，改变具体标签的样式。

`<div class = "red">变红色</div>`

- 多类名：一个标签可以有多个类名，多个类名之间要用空格分割开。
  
  （避免属性重复书写，像，很像啊！）

## 2.3 id选择器

```html
 #id名{
     属性:属性值：
 }

 <div id = "id名">...</div>
```

id选择器**只能被调用一次**，别人就不能使用了。所以id选择器一般用于特殊的元素上。

## 2.4 通配符选择器

```css
*{
    属性:属性值
}
```

选择页面中**所有**元素(标签)

# 3 文字属性

（属性只是举例，更多的需查看css手册）

1. `font-family:"Microsoft Yahei","Times new Roman"`  修改字体。多个字体之间用逗号分隔。 一般可以用于`<body>`。

2. `font-size:20px;` 文字大小，也可以给body指定一个大小。(px是像素大小)

3. `font-wight:700;` 文字加粗 实际开发中后边更多使用的是数字而不是单词。也可以让标题变细（400是默认细）

4. `font-style:italic;` italic是斜体。normal是变成不倾斜。
- 复合属性：原本需要把多个文字属性写在同一个指示器里，现在可以用一句话写完。

`font:font-style font-weight font-size/line-height font-family;`

顺序不能改变。如：

`font:italic 700 16px/1.5 "Microsoft Yahei"; `

其中字号和字体必须出现，其他不要求。

这里的1.5指的是字体大小的1.5倍行高。

# 4 文本属性

- `color:red;`：颜色。英文，十六进制或RGB代码。

- `text-align:center;`：对齐文本。`left center right(`左、中、右)

- `text-decoration:underline` 装饰文本。`underline line-through overline none` 下划线，删除线，顶线，没线。（none很多用于删除超链接的默认下划线）

- `text-indent：10px;` 用于文本**首行**缩进

值得一提的是，这里可以不用px，而用**em**，1em为当前一个文字的大小。2em就是缩进两个字。

- `text-height：26px` 行高。

# 5 样式表

根据css写的位置不同，分为不同的样式表。

## 5.1 内部样式表

内部样式表是写在html文件 <head>标签里的<style>标签里。

- 可以方便控制当前页面整个页面的元素样式

- 结构清晰

- 缺点：没有与html完全分离。（一般是练习用的）

## 5.2 行内样式表

在标签内部直接写一个style属性，然后直接写css就行了。

`<div style ="color:red;">`

- 适用于修改简单样式

## 5.3 外部样式表

1. 新建.css文件。

2. 写css，不需要标签，只有样式。

3. 在html里用<link> herf引入css。
   
   `<link rel="stylesheet" href ="style.css">`

# 6 chrome调试工具

 F12

# 7 emmet语法

1. 生成标签+tab，就**成对**了。

2. 多个标签，用标签*数字即可。 `div*3`

3. 父子级关系：可以用>，如`ul>li`

4. 兄弟关系的标签：可以用+，如`div+p`

5. 生成带有类名或id名字的，直接`.demo`（点加类名，默认是`<div class="demo">`，想用其他的标签就可以在点前面写`p.demo` 就行) 或`#two`（井+id名）

6. 想生成带有顺序的类名，就可以用自增符号$。`.demo&*5` 就自动生成demo12345了。

7. 想生成的标签里默认文字，可以直接`div{操你妈}`
- 快速生成css样式

# 8 复合选择器

是由两个以上的基础选择器组合而成。

分为后代选择器，子选择器，并集选择器，伪类选择器。

## 8.1 后代选择器

```css
ol li{
    color:red;
}
```

这个意思是只对ol里面的li进行更改。元素1必须是父，2必须是子、孙等。

类选择器也可以。类选择器更精准

`.demo li a{}` 这个只对class为demo的标签里面的li里面的a进行更改。

## 8.2 子选择器

必须选**亲儿子**元素，不能是孙。

```css
.demo > a {

}
```

只对demo里的儿子a进行改变。

## 8.3 并集选择器

批量选择，用逗号分隔就可以集体声明了。（一般并集选择器都是竖着写）

```css
div,
p{

}
```

而且，任何形式的选择器都可以并集选择，也就是可以用后代选择，也可以子选择。

## 8.4 伪类选择器

向某些选择器添加特殊效果。都用冒号:指定。

### 超链接

- `a:link`: 选择所有未被访问的链接

- `a:visited`：选择所有已被访问的链接

- `a:hover`：选择鼠标指针位于其上的链接

- `a:active`：选择鼠标按下未弹起的链接

**注意事项:**

1. 为了确保生效，顺序不能变，必须是LVHA的顺序（link visited hover active)
   
   （love hate）

2. 链接a有浏览器的默认样式，在实际项目里都要单独指定样式。
   
   实际开发例子：

```css
a{
    color:#333;
}
a:hover{
    color:#369;
    text-decoration:underline;
}
```

### :focus

选取获取光标的表单元素。

```css
input:focus{
    background_color:pink;
}
```

这样，假如input里是一个text，那么当选中这个文本框的时候，文本框背景颜色会变成粉色。

# 9 元素显示模式

html里一般分为**块元素**和**行内元素**。

## 块元素：

div、h、ul、ol、li等。

1. 自己独占一行。

2. 高度宽度内外边距都可以自定义。

3. 默认的宽度与父级宽度一样

4. 是一个盒子（容器），里面可以放行内元素，也可以放块元素。

注意：文字类元素内不能放块元素（如p、h等）

## 行内元素

span、a、b、em、i、del、s、ins、strong等

1. 相邻行内元素可显示在一行里。

2. 高，宽直接设置是无效的，默认宽度就是内容的宽度。

3. 只能容纳文本和其他行内元素。

注意：链接里不能再放连接。特殊情况`<a>`可以放块元素，但给a转换一下块模式最安全。

## 行内块元素

有几个特殊标签，既有行内元素的性质，又有块元素的性质。

img input td 等

特点：

1. 和相邻行内块元素在一行上（一行可显示多个），但之间有空白缝隙。（行内元素特点）

2. 高度，行高，宽度，内外边距都可以设置（块元素特点）

## 9.1 元素显示模式转换

特殊情况下，需要一些元素显示模式的转换（如增加链接`<a>`的触发范围）

- 转换为块元素：`display:block;`（使用最多）

- 转换为行内元素：`display:inline;`（行内元素不允许设置宽高）

- 转换为行内块元素：`display:inline-block;`（使用较多）

## 9.2 小技巧：让文字垂直居中

- **让文字的行高与盒子的高度一样即可**。
  
  ```css
  div{
      height:40px;
      line-height:40px
  }
  ```
  
  如果行高小于盒子高度，文字就偏上；大于盒子高度，文字就偏下。

# 10 背景

## 10.1 背景颜色

`background-color:transparent`（透明的背景）

右边的颜色可以是英语，十六进制或RGB代码。

## 10.2 背景图片

用于小的装饰图片（logo）或超大背景图片，便于调整宽高。

`background-image:url();`

不要丢了这个url。括号里面填链接。

## 10.3 背景平铺

`background-repeat:repeat|no-repeat|repeat-x|repeat-y;`

如果背景图较小，盒子大，默认会复制很多份图片（默认是平铺的）。这时候可以设置不平铺，或按x、y方向平铺。

## 10.4 背景位置(重要)

一般在body里的图片都是行内元素，而且很难定义它的很多属性，所以logo和大背景图片都用背景图片，其**位置**就及其重要。

`background-position:`

- **方位单位**
  
  left、top、right、center、bottom这些。可以两个一起写，如top right就是右上角,center bottom就是下中，left center就是左中。（相对于盒子的位置）

- **精确单位**

        冒号后边跟两个像素值，分别是x值和y值，不能颠倒顺序。（原点是左上角）。

        如果只指定了一个值，那么一定是x值，y值默认居中。

- **混合单位**

        可以将上述两种单位混合使用，但第一个必须是横轴，第二个必须是纵轴。

        如：`background-position:40px center;`

## 10.5 背景固定（附着）

当网页下滑时，背景图片到底是固定的，还是随着页面滚动的。这个叫做固定或附着。

`background-attachment:scroll|fixed;`

其中，scroll是默认值，随着内容滚动而滚动。

fixed：图像固定。

## 10.6 背景复合写法

类似于文本复合写法。

`background:transparent url(image.jpg repeat-y fixed top)`

顺序分别是：背景颜色 背景图片地址 背景平铺 背景滚动 背景位置

## 10.7 背景颜色半透明

新版CSS有很多半透明的盒子效果。

`background:rgba(0,0,0,0.3);`

后边分别是rgb参数和透明度，000是黑色，0.3是透明度为30%。实际开发中写成.3也行。

# 11 三大特性

## 层叠性

- 先后相同的选择器进行了同一个样式的更改，取最后的更改（后来者居上）。

## 继承性

- 子标签会继承父标签的某些样式（主要是文字相关的，text、font、line之类的）

## 优先级（选择器权重）

!important 重要的 > 行内样式style=""  > ID选择器  > 类、伪类选择器  >  标签选择器 > 继承

| 名字         | 权重      |
| ---------- | ------- |
| !important | 无限大     |
| 行内样式       | 1,0,0,0 |
| id选择器      | 0,1,0,0 |
| 类选择器       | 0,0,1,0 |
| 标签选择器      | 0,0,0,1 |
| 继承         | 0,0,0,0 |

权重大的会覆盖权重小的样式更改

权重一样的，执行层叠性。

（在样式更改后边，输入!important 这句样式的权重最高）

**复合选择器的优先级权重会叠加**。

如：`li{color:red;}  ul li{color:pink;} `

此时是粉色，因为ul li权重是0,0,0,2  li只是0,0,0,1

再如：

```css
.nav li{
    color:red;
}
.pink{
    color:pink
}


<ul class="nav">
    <li class = "pink">  文字文字 </li>
</ul>
```

这里文字是红色。因为上边的权重为0,0,1,1 而下边权重仅为0,0,1,0.
