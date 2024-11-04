/*
  16259 - 将类型为字面类型（标签类型）的属性，转换为基本类型。
  -------
  by 前端子鱼 (@mwc) #中等

  ### 题目

  // 将类型为字面类型（标签类型）的属性，转换为基本类型。

  type PersonInfo = {
    name: 'Tom',
    age: 30,
    married: false,
    addr: {
      home: '123456',
      phone: '13111111111'
    }
  }

  // 要求结果如下：
  type PersonInfo = {
    name: string,
    age: number,
    married: boolean,
    addr: {
      home: string,
      phone: string
    }
  }

  > 在 Github 上查看：https://tsch.js.org/16259/zh-CN
*/

/* _____________ 你的代码 _____________ */

/*
#### 关于 valueOf ####

在 TypeScript/JavaScript 中，所有基本类型的字面量都有对应的包装类型，比如：

字符串字面量有 String 包装类型
数字字面量有 Number 包装类型
布尔字面量有 Boolean 包装类型

这些包装类型都有 valueOf() 方法，返回对应的基本类型：

"Tom".valueOf() 返回 string 类型
30.valueOf() 返回 number 类型
false.valueOf() 返回 boolean 类型

*/
type ToPrimitive<T> = T extends object ? (
  T extends (...args: any[]) => unknown ? Function : {
    [Key in keyof T]: ToPrimitive<T[Key]>
  }
) : (
  T extends { valueOf: () => infer P } ? P : T
)

// true => 基础类型是其包装类型的子类型
type a = object extends Object ? true : false
// false
type b = Object extends object ? false : true

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type PersonInfo = {
  name: 'Tom'
  age: 30
  married: false
  addr: {
    home: '123456'
    phone: '13111111111'
  }
  hobbies: ['sing', 'dance']
  readonlyArr: readonly ['test']
  fn: () => any
}

type ExpectedResult = {
  name: string
  age: number
  married: boolean
  addr: {
    home: string
    phone: string
  }
  hobbies: [string, string]
  readonlyArr: readonly [string]
  fn: Function
}

type cases = [
  Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/16259/answer/zh-CN
  > 查看解答：https://tsch.js.org/16259/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
