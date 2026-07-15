// 使用条件类型 + 索引访问（推荐）
type First<T extends any[]> = T extends [] ? never : T[0];

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<['a', 'b', 'c']>, 'a'>>,
  Expect<Equal<First<[true, false, false]>, true>>,
  Expect<Equal<First<[]>, never>>,
]