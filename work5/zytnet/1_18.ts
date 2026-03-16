/* _____________ 你的代码 _____________ */

// 定义 Length 类型，T 需是只读数组类型
type Length<T extends readonly any[]> = T['length'];

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const
const spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT'] as const

type cases = [
  // 期望 Length<typeof tesla> 的结果是 4
  Expect<Equal<Length<typeof tesla>, 4>>,
  // 期望 Length<typeof spaceX> 的结果是 5
  Expect<Equal<Length<typeof spaceX>, 5>>,
  // @ts-expect-error 表示期望这里会出现类型错误，因为 5 不是只读数组类型
  Length<5>,
  // @ts-expect-error 表示期望这里会出现类型错误，因为 'hello world' 不是只读数组类型
  Length<'hello world'>,
]