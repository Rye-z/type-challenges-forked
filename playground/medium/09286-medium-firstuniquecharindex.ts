/*
  9286 - FirstUniqueCharIndex
  -------
  by jiangshan (@jiangshanmeta) #中等 #string

  ### 题目

  Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1. (Inspired by [leetcode 387](https://leetcode.com/problems/first-unique-character-in-a-string/))

  > 在 Github 上查看：https://tsch.js.org/9286/zh-CN
*/

/* _____________ 你的代码 _____________ */
// type FirstUniqueCharIndex<
//   T extends string,
//   U extends string[] = [],
// > = T extends `${infer F}${infer R}`
//   ? F extends U[number]
//     // 如果重复，则对剩下的字符串进行处理
//     ? FirstUniqueCharIndex<R, [...U, F]>
//     // 如果不重复，则检查一下 F 是否在剩余的字符串中，存在则说明不唯一
//     : R extends `${string}${F}${string}`
//       ? FirstUniqueCharIndex<R, [...U, F]>
//       : U['length']
//   : -1

type FirstUniqueCharIndex<
  T extends string,
  U extends string[] = [],
> = T extends `${infer F}${infer R}`
  // 检查是否重复
  ? R extends `${string}${F}${string}`
    // 重复则检查剩下的字符串
    ? FirstUniqueCharIndex<R, [...U, F]>
    // 这一步是获取 F 的 index
    : F extends U[number] ? FirstUniqueCharIndex<R, [...U, F]> : U['length']
  : -1

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type a = FirstUniqueCharIndex<'aabb'>
type B = '' extends 'bb' ? true : false
type b = B
type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<'aaa'>, -1>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/9286/answer/zh-CN
  > 查看解答：https://tsch.js.org/9286/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
