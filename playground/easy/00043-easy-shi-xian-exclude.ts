/*
  43 - 实现 Exclude
  -------
  by Zheeeng (@zheeeng) #简单 #built-in #union

  ### 题目

  实现内置的 `Exclude<T, U>` 类型，但不能直接使用它本身。

  > 从联合类型 `T` 中排除 `U` 中的类型，来构造一个新的类型。

  例如：

  ```ts
  type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
  ```

  > 在 Github 上查看：https://tsch.js.org/43/zh-CN
*/

/* _____________ 你的代码 _____________ */
// T extends U：表示检查 T 是否可以赋值给 U。
// 如果 T 可以赋值给 U（即它是 U 的子类型），那么我们返回 never，否则返回 T。
// 使用条件类型 T extends U ? never : T，可以在联合类型中排除指定的类型。

// 当条件类型中的参数是联合类型时，TypeScript 会将联合类型拆解成每个成员，并分别应用条件。
// `type MyExclude<T, U> = T extends U ? never : T;`
// 如果 T 是 'a' | 'b' | 'c'，那么在计算过程中，TypeScript 实际上是这样进行的：
//  等同于 =>
// 'a' extends 'a' ? never : 'a'   // 结果是 never
// 'b' extends 'a' ? never : 'b'   // 结果是 'b'
// 'c' extends 'a' ? never : 'c'   // 结果是 'c'
type MyExclude<T, U> = T extends U ? never : T

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, string | number>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/43/answer/zh-CN
  > 查看解答：https://tsch.js.org/43/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
