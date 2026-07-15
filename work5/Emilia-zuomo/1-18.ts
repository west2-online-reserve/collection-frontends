type Length<T extends readonly any[]> = T['length'] ;

import type { Equal, Expect } from '@type-challenges/utils'

const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const
const spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT'] as const

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  // 额外测试：空元组
  Expect<Equal<Length<[]>, 0>>,
  // 额外测试：只读元组
  Expect<Equal<Length<readonly [1, 2]>, 2>>,
]