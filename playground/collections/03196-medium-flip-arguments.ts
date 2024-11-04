/*
  3196 - Flip Arguments
  -------
  by jiangshan (@jiangshanmeta) #中等 #arguments

  ### 题目

  Implement the type version of lodash's ```_.flip```.

  Type ```FlipArguments<T>``` requires function type ```T``` and returns a new function type which has the same return type of T but reversed parameters.

  For example:

  ```typescript
  type Flipped = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>
  // (arg0: boolean, arg1: number, arg2: string) => void
  ```

  > 在 Github 上查看：https://tsch.js.org/3196/zh-CN
*/

/* _____________ 你的代码 _____________ */

// @notice
// type FlipArguments<T> = T extends (infer F, ...args: infer A) => infer R ? () => R : never
// (infer F, ...args: infer A) 这一部分是非法的，因为 TypeScript 中无法这样逐个推断函数参数。infer 只能应用在整个参数列表上，而不能分别推断每个参数。

type Reverse<T extends unknown[]> = T extends [infer F, ...infer R] ? [...Reverse<R>, F] : []

type FlipArguments<T extends (...args: any[]) => any> = T extends (...args: infer P) => infer U
  ? (...args: Reverse<P>) => U
  : never

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FlipArguments<() => boolean>, () => boolean>>,
  Expect<Equal<FlipArguments<(foo: string) => number>, (foo: string) => number>>,
  Expect<Equal<FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>, (arg0: boolean, arg1: number, arg2: string) => void>>,
]

type errors = [
  // @ts-expect-error
  FlipArguments<'string'>,
  // @ts-expect-error
  FlipArguments<{ key: 'value' }>,
  // @ts-expect-error
  FlipArguments<['apple', 'banana', 100, { a: 1 }]>,
  // @ts-expect-error
  FlipArguments<null | undefined>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/3196/answer/zh-CN
  > 查看解答：https://tsch.js.org/3196/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
