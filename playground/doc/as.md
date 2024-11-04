# As 的用法

## 一、类型断言

```ts
value as Type
```

### 场景1：编译器推断不够明确时

```ts
let someValue:any = 'Hello World'
let strLength:number = (someValue as string).length
```

### 场景2：使用联合类型时的类型断言

如果我们有一个联合类型，且我们确定某个值是其中一种类型，可以通过 as 断言来缩小类型范围

```ts
type Shape = Circle | Square

function handleShape(shape: Shape) {
    if ((shape as Circle).radius {
        // 告诉编译器，`shape` 是 `Circle` 类型，可以访问 radius 属性
        console.log((shape as Circle).radius)
    }
}
```

## 二、重新映射键（Remapping Keys in Mapped Types）

在映射类型中，`as` 也可以用来重新映射对象的键。

### 场景1：修改键名
```ts
type Person = {
    name: string
    age: number
}

type UppercaseKeys<T> = {
    // Uppercase<K & string> 的作用是将键名转换为大写形式。
    [K in keyof T as Uppercase<K & string>]: T[K]
}

// {NAME: string; AGE: number}
type UppercasePerson = UppercaseKeys<Person>
```

### 场景2：过滤键

```ts
type foo = {
    [key: string]: any;
    foo(): void;
}

type RemoveIndexSignature<T> = {
    [K in keyof as K extends string ? K : never] : T[K]
}

// { foo(): void }
type A = RemoveIndexSignature<Foo>
```