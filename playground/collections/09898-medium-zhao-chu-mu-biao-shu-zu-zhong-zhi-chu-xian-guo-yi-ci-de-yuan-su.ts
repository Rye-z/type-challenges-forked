/*
  9898 - 找出目标数组中只出现过一次的元素
  -------
  by X.Q. Chen (@brenner8023) #中等

  ### 题目

  找出目标数组中只出现过一次的元素。例如：输入[1,2,2,3,3,4,5,6,6,6]，输出[1,4,5]

  > 在 Github 上查看：https://tsch.js.org/9898/zh-CN
*/

/* _____________ 你的代码 _____________ */

type IncludesItem<U, T> =
  // 分发
  U extends U
    // 这里不能反过来写 T extends U，因为 U 中会包含 number，而 T 是具体的数字
    ? U extends T
      ? true
      : false
    : false

type FindEles<
  T extends any[],
  // 已经检索过的值
  U extends any[] = [],
> =
  // 当 T 不是一个空数组
  T extends [infer A, ...infer R]
    // [1,2,2,3]
    // ? IncludesItem<R[number] | U[number], A> extends true
    //   ? FindEles<R, [...U, A]>
    //   : [A, ...FindEles<R, U>]
    // : T
    ? IncludesItem<R[number] | U[number], A> extends false
      ? [A, ...FindEles<R, U>]
      : FindEles<R, [...U, A]>
    : T

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type a = FindEles<[1, 2, 2, 3]>
type cases = [
  Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>,
  Expect<Equal<FindEles<[1, 2, number]>, [1, 2, number]>>,
  Expect<Equal<FindEles<[1, 2, number, number]>, [1, 2]>>,
  Expect<Equal<FindEles<[1, 2, number, never]>, [1, 2, number, never]>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/9898/answer/zh-CN
  > 查看解答：https://tsch.js.org/9898/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/

// #######################

// 版本1（正确版本）的推导过程：
type FindEles1<T, U = []> = T extends [infer A, ...infer R]
  ? IncludesItem<R[number] | U[number], A> extends false
    ? [A, ...FindEles<R, U>]
    : FindEles<R, [...U, A]>
  : T

// 步骤1: [1, 2, 2, 3]
// A = 1, R = [2, 2, 3], U = []
// IncludesItem<2|2|3, 1> = false
// 结果: [1, ...FindEles<[2, 2, 3], []>]

// 步骤2: [2, 2, 3]
// A = 2, R = [2, 3], U = []
// IncludesItem<2|3, 2> = true
// 进入: FindEles<[2, 3], [2]>

// 步骤3: [2, 3]
// A = 2, R = [3], U = [2]
// IncludesItem<3|2, 2> = true
// 进入: FindEles<[3], [2, 2]>

// 步骤4: [3]
// A = 3, R = [], U = [2, 2]
// IncludesItem<never|2|2, 3> = false
// 结果: [3, ...FindEles<[], [2, 2]>]

// 步骤5: []
// 返回 []

// 最终结果：[1, 3]

// 版本2（错误版本）的推导过程：
type FindEles2<T, U = []> = T extends [infer A, ...infer R]
  ? IncludesItem<R[number] | U[number], A> extends true
    ? FindEles2<R, [...U, A]>
    : [A, ...FindEles2<R, U>]
  : T

// 步骤1: [1, 2, 2, 3]
// A = 1, R = [2, 2, 3], U = []
// IncludesItem<2|2|3, 1> = false
// 需要构建: [1, ...FindEles2<[2, 2, 3], []>]  // 但必须等待内部递归完成

// 步骤2: [2, 2, 3]
// A = 2, R = [2, 3], U = []
// IncludesItem<2|3, 2> = true
// 进入: FindEles2<[2, 3], [2]>

// 步骤3: [2, 3]
// TypeScript 无法确定这个递归链会在何时终止
// 因为每次构建结果时都需要等待后续递归完成
// 而后续递归又可能产生新的等待...

// #######################
