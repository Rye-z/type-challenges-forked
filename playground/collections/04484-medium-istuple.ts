/*
  4484 - IsTuple
  -------
  by jiangshan (@jiangshanmeta) #中等 #tuple

  ### 题目

  Implement a type ```IsTuple```, which takes an input type ```T``` and returns whether ```T``` is tuple type.

  For example:

  ```typescript
  type case1 = IsTuple<[number]> // true
  type case2 = IsTuple<readonly [number]> // true
  type case3 = IsTuple<number[]> // false
  ```

  > 在 Github 上查看：https://tsch.js.org/4484/zh-CN
*/

/* _____________ 你的代码 _____________ */

// tuple 的长度是固定的 => tuple['length'] 是一个具体的数字
// tuple['length'] extends number = true
// number extends tuple['length'] = false

// number is just a type (const x: number = 1).
// To be a tuple, T['length'] needs to exact number type (1, 2, 42, etc) and not just number type.
// Exact number extends number and number does not extends exact number but extends itself.
// So we can check if T['length'] is exact number or not by checking if number extends T['length'] or not

// for T['length']: number
// = `number extends T['length']`
// = `number` extends 1
// = true

// for T['length']: 1 or any exact number
// = `number extends T['length']`
// = number extends 1
// = false

type IsTuple<T> = [T] extends [never]
  ? false
  : T extends readonly any[]
    ? number extends T['length'] ? false : true
    : false

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type a = IsTuple<number[]>
type cases = [
  Expect<Equal<IsTuple<[]>, true>>,
  Expect<Equal<IsTuple<[number]>, true>>,
  Expect<Equal<IsTuple<readonly [1]>, true>>,
  Expect<Equal<IsTuple<{ length: 1 }>, false>>,
  Expect<Equal<IsTuple<number[]>, false>>,
  Expect<Equal<IsTuple<never>, false>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/4484/answer/zh-CN
  > 查看解答：https://tsch.js.org/4484/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
