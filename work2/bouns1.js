
//    写一段js代码，获取页面中Dom出现次数最多的前3个名称
//    尽可能使用ES6特性
//    不允许使用var，for关键字

    // 获取页面中所有DOM元素的标签名称
    const allTags = Array.from(document.getElementsByTagName("*")).map(element => element.tagName);


    // 统计每个DOM标签名称出现的次数
    const tagCounts = allTags.reduce((counts, tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
        return counts;
    }, {});

    // 将统计结果转换为数组，并按出现次数排序
    const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]);

    // 获取出现次数最多的前3个DOM名称
    const top3Tags = sortedTags.slice(0, 3);
    console.log(top3Tags);

    // Array.from 方法
    // 是 ES6 中新增的数组静态方法，用于将类数组对象或可迭代对象转换为真正的数组对象
    
    // 类数组对象：
    // 类数组对象是指具有数值键和 length 属性的对象，但没有数组对象所具有的方法，比如 push、pop 等。
    // 典型的类数组对象包括函数的参数对象 arguments，DOM 方法返回的节点列表（比如 document.querySelectorAll 的结果），以及通过 getElementsByTagName 获取的节点列表等。
    // 类数组对象可以通过下标访问元素，也可以使用 length 属性获取长度，但不能直接使用数组的各种方法。

    // 数组：
    // 数组是 JavaScript 中的一种内置对象，具有特定的方法和属性，比如 push、pop、forEach 等方法。
    // 数组是可以修改的（mutable），可以动态增删元素，而且可以通过索引直接访问或者修改元素。
    // 数组是典型的可迭代对象，因此可以在 for...of 循环中直接使用。

    // map 
    // 是数组对象的一个方法，用于创建一个新数组，其结果是对原数组中的每个元素调用一个提供的函数进行处理后得到的。
    // map 方法不会改变原始数组，而是返回一个新的数组

    // reduce 
    // const sumWithInitial = array1.reduce(
    //     (accumulator, currentValue) => accumulator + currentValue,
    //     initialValue,
    //   );