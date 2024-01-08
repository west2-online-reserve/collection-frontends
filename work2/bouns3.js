// 实现一个对象obj，当访问obj中任意一个属性或者或者任意一个属性赋值时，自动在控制台中输出当前访问或者赋值的属性的值和之前的值
let obj = {
  a: 1,
  b: 2
};

let handler = {
  // 捕获对目标对象的属性访问
  get: function(target, property) {
    console.log(`访问属性 ${property}，当前值为 ${target[property]}`);
    return target[property];
  },
  // 捕获对目标对象的赋值操作。
  set: function(target, property, value) {
    console.log(`设置属性 ${property}，新值为 ${value}，之前的值为 ${target[property]}`);
    target[property] = value;
  }
};

obj = new Proxy(obj, handler);

const a = obj.a;
obj.b = 3;
