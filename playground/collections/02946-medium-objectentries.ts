/*
  2946 - ObjectEntries
  -------
  by jiangshan (@jiangshanmeta) #中等 #object

  ### 题目

  Implement the type version of ```Object.entries```

  For example

  ```typescript
  interface Model {
    name: string;
    age: number;
    locations: string[] | null;
  }
  type modelEntries = ObjectEntries<Model> // ['name', string] | ['age', number] | ['locations', string[] | null];
  ```

  > 在 Github 上查看：https://tsch.js.org/2946/zh-CN
*/

/* _____________ 你的代码 _____________ */

//* @notice => 访问对象中不存在的属性，返回值是 never
type IsNever<T> = [ T ] extends [ never ] ? true : false
type f = IsNever<{ key: undefined }['obj']>

type ObjectEntries<T, U = Required<T>> = {
  [K in keyof U]: [K, U[K] extends never ? undefined : U[K]]
}[keyof U]

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type b = Partial<Model>
type a = ObjectEntries<b>
type c = ObjectEntries<Model>
type e = ObjectEntries<{ key?: undefined }>

type GetObjValueType<T> = T[keyof T]
type d = GetObjValueType<{ name?: string }>

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: string | undefined }>, ['key', string | undefined]>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/2946/answer/zh-CN
  > 查看解答：https://tsch.js.org/2946/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
