type Fn = (a: number, b: number) => number;

const fn: Fn = (a, b) => a + b;

// 测试调用
const result = fn(5, 10);
console.log(result);