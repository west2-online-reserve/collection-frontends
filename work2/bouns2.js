// const obj = {
//     a: {
//       b: {
//         c: 1
//       }
//     }
//   };
//   get(obj, 'a.b.c', 2); // 返回 1
//   get(obj, 'a.b.d', 2); // 返回 2
//   get(obj, 'a.b.d.e.f.g', 2); // 返回 2


function get(obj, path, defaultValue) {
    // 将 path 字符串使用 split('.') 方法分割成一个由各个属性名组成的数组 keys。
    const keys = path.split('.');
    
    let result = obj;
    
    for (let key of keys) {
        // 代码检查当前的 result 是否为对象并且包含当前遍历到的 key 属性。
        if (result && typeof result === 'object' && key in result) {
            // 如果是，则将 result 更新为该属性对应的值；
            result = result[key];
        } else {
            // 否则，直接返回 defaultValue，表示路径不存在，无法获取属性值
            return defaultValue;
        }
    }
    
    return result !== undefined ? result : defaultValue;
}
