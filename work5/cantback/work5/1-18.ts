/* _____________ 你的代码 _____________ */

type Length<T extends readonly any[]> = T['length']

// 元组的 length 属性，表示元组的长度。