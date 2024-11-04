/*
  9142 - CheckRepeatedChars
  -------
  by Hong (@RThong) #中等 #union #string

  ### 题目

  判断一个string类型中是否有相同的字符
  ```ts
  type CheckRepeatedChars<'abc'>   // false
  type CheckRepeatedChars<'aba'>   // true
  ```

  > 在 Github 上查看：https://tsch.js.org/9142/zh-CN
*/

/* _____________ 你的代码 _____________ */
// type CheckRepeatedChars<T extends string> = T extends `${infer F}${infer R}`
//   ? R extends `${string}${F}${string}`
//     ? true
//     : CheckRepeatedChars<R>
//   : false

// 'abc' => 'a' | 'b' | 'c'
type Utils<T extends string, U = ''> = T extends `${infer F}${infer R}`
  ? Utils<R, F | U>
  : Exclude<U, ''>

type CheckRepeatedChars<T extends string> = T extends `${infer F}${infer R}`
  ? F extends Utils<R> ? true : CheckRepeatedChars<R>
  : false

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type A<T, U> = T extends U ? 1 : 2
type a = A<'a', 'c' | 'b'>

type cases = [
  Expect<Equal<CheckRepeatedChars<'abc'>, false>>,
  Expect<Equal<CheckRepeatedChars<'abb'>, true>>,
  Expect<Equal<CheckRepeatedChars<'cbc'>, true>>,
  Expect<Equal<CheckRepeatedChars<''>, false>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/9142/answer/zh-CN
  > 查看解答：https://tsch.js.org/9142/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
