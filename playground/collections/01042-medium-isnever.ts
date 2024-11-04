/*
  1042 - IsNever
  -------
  by hiroya iizuka (@hiroyaiizuka) #中等 #union #utils

  ### 题目

  Implement a type IsNever, which takes input type `T`.
  If the type of resolves to `never`, return `true`, otherwise `false`.

  For example:

  ```ts
  type A = IsNever<never> // expected to be true
  type B = IsNever<undefined> // expected to be false
  type C = IsNever<null> // expected to be false
  type D = IsNever<[]> // expected to be false
  type E = IsNever<number> // expected to be false
  ```

  > 在 Github 上查看：https://tsch.js.org/1042/zh-CN
*/

/* _____________ 你的代码 _____________ */

// [T] extends [never] => https://github.com/type-challenges/type-challenges/issues/614
// - TypeScript treats never as an empty union when distributing over conditionals.

// [in simple english can someone explain to me when to use the never type ? : r/typescript](https://www.reddit.com/r/typescript/comments/14lskcm/in_simple_english_can_someone_explain_to_me_when/?rdt=55388)
// - it’s super useful when doing type logic.
//   Imagine you are like “if T extends string return foobar else throw”.
//   But you can’t really throw in type logic. You return “never” and now the resulting type is unusable.
type IsNever<T> = [ T ] extends [ never ] ? true : false

type a = IsNever<{ name: string }['obj']>
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<never | string>, false>>,
  Expect<Equal<IsNever<''>, false>>,
  Expect<Equal<IsNever<undefined>, false>>,
  Expect<Equal<IsNever<null>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<{}>, false>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/1042/answer/zh-CN
  > 查看解答：https://tsch.js.org/1042/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
