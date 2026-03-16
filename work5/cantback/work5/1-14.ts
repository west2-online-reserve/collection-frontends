type First<T extends any[]> = T extends [] ? never : T[0]

// type First<T extends any[]> = T extends [infer F, ...infer rest] ? F : never
// infer F 代表第一个元素，rest 代表剩余元素
    

