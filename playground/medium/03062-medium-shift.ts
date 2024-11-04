/*
  3062 - Shift
  -------
  by jiangshan (@jiangshanmeta) #中等 #array

  ### 题目

  Implement the type version of ```Array.shift```

  For example

  ```typescript
  type Result = Shift<[3, 2, 1]> // [2, 1]
  ```

  > 在 Github 上查看：https://tsch.js.org/3062/zh-CN
*/

/* _____________ 你的代码 _____________ */

// @notice => unknown
// [any 类型，unknown 类型，never 类型 - TypeScript 教程 - 网道](https://wangdoc.com/typescript/any)
// 1. unknown 为了解决 any 可以赋值给任何值的问题，算是严格版的 any
// 2. unknown 赋值给 除 any 和 unknown 以外的变量都会报错
// 3. unknown 不能调用 unknown 类型的变量和方法属性
type Shift<T> = T extends [unknown, ...args: infer R] ? [...R] : []

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  // @ts-expect-error
  Shift<unknown>,
  Expect<Equal<Shift<[]>, []>>,
  Expect<Equal<Shift<[1]>, []>>,
  Expect<Equal<Shift<[3, 2, 1]>, [2, 1]>>,
  Expect<Equal<Shift<['a', 'b', 'c', 'd']>, ['b', 'c', 'd']>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/3062/answer/zh-CN
  > 查看解答：https://tsch.js.org/3062/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
