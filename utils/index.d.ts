export type Expect<T extends true> = T
export type ExpectTrue<T extends true> = T
export type ExpectFalse<T extends false> = T
export type IsTrue<T extends true> = T
export type IsFalse<T extends false> = T

// 为什么使用 T 作为间接比较参数?
// 1. 避免直接比较
// 直接比较 X extends Y ? true : false 或 Y extends X ? true : false 在一些复杂类型（例如对象类型、联合类型）中可能不能准确地判断出两个类型是否完全相同。
//  使用 T 可以间接地比较 X 和 Y，通过泛型函数和条件类型来模拟更精确的类型相等判断。

// 2. ts 的系统类型是基于结构型类型系统
// 使用 T 来构造一个泛型函数 <T>() => T extends X ? 1 : 2，这个函数的返回类型依赖于 T 是否能赋值给 X。
//  因为 TypeScript 的类型系统是基于结构性类型系统（structural typing）的，所以当我们比较函数类型时，如果两个函数具有相同的签名和返回类型，它们会被认为是相同的类型。
export type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false
export type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true

// https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
export type IsAny<T> = 0 extends (1 & T) ? true : false
export type NotAny<T> = true extends IsAny<T> ? false : true

export type Debug<T> = { [K in keyof T]: T[K] }
export type MergeInsertions<T> =
  T extends object
    ? { [K in keyof T]: MergeInsertions<T[K]> }
    : T

export type Alike<X, Y> = Equal<MergeInsertions<X>, MergeInsertions<Y>>

export type ExpectExtends<VALUE, EXPECTED> = EXPECTED extends VALUE ? true : false
export type ExpectValidArgs<FUNC extends (...args: any[]) => any, ARGS extends any[]> = ARGS extends Parameters<FUNC>
  ? true
  : false

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never
