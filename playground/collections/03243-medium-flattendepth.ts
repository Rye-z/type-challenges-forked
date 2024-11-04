/*
  3243 - FlattenDepth
  -------
  by jiangshan (@jiangshanmeta) #中等 #array

  ### 题目

  Recursively flatten array up to depth times.

  For example:

  ```typescript
  type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
  type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
  ```

  If the depth is provided, it's guaranteed to be positive integer.

  > 在 Github 上查看：https://tsch.js.org/3243/zh-CN
*/

/* _____________ 你的代码 _____________ */

// type FlattenDepth<
//   T extends any[],
//   U extends any[] = [],
// > = T extends [infer F, ...args: infer R]
//   ? F extends any[] ? FlattenDepth<[...F, ...R], U> : [...U, F, FlattenDepth<R>]
//   : T
// type FlattenDepth<
//   T extends any[],
//   D extends number = 1,
//   U extends any[] = [],
// >
//   = T extends [infer F, ...args: infer R]
//     ? F extends any[]
//       ? (
//           U['length'] extends D
//             ? FlattenDepth<[...F, D, ...R]>
//             : [...FlattenDepth<F, D, [0, ...U]>, ...FlattenDepth<R, D, U>]
//         )
//       : [F, ...FlattenDepth<R>]
//     : T
type FlattenDepth<
  T extends any[],
  C extends number = 1,
  U extends any[] = [], // 用来记录递归深度的辅助类型
> = T extends [infer F, ...infer R] // 通过模式匹配提取数组的第一个元素 F 和剩余元素 R
  ? F extends any[] // 判断 F 是否为数组
    ? U['length'] extends C // 如果当前深度 `U['length']` 已经等于展开深度 C，停止递归
      ? [F, ...FlattenDepth<R, C, U>] // 不再展开 F，直接拼接 F 和对剩余元素 R 进行展开
      : [ // 如果深度未达到 C，继续递归
          ...FlattenDepth<F, C, [0, ...U]>, // 递归展开 F，增加深度计数
          ...FlattenDepth<R, C, U>, // 递归处理剩余的 R，深度保持不变
        ]
    : [F, ...FlattenDepth<R, C, U>] // 如果 F 不是数组，直接将 F 拼接到结果中，递归处理 R
  : T // 当数组为空时，递归结束，返回数组

type test<T extends any[] = [], D extends number = 1> = T['length'] extends D ? T['length'] : false

type b = test
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type a = FlattenDepth<[1, [2, [3, 4]]]>
type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/3243/answer/zh-CN
  > 查看解答：https://tsch.js.org/3243/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
