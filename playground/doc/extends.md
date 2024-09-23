## extends 的用法

### 1. 条件类型中的 extends...? :

`T extends string[] ? string: number`

#### 联合类型的分配原则

```ts
type T1 = 'a' | 'b' | 'c';
type T2 = Exclude<T1, 'a'>; // 'b' | 'c'

type Exclude<T, U> = T extends U ? never : T;
// 相当于
'a' extends U ? never 'a'
'b' extends U ? never 'b'
'c' extends U ? never 'c'

```


T 是否满足特定的条件

### 2. 在泛型约束中

```ts
function logLength<T extends { length: number }>(arg: T): void {
  console.log(arg.length);
}
```
可以用来约束泛型类型，确保传入的类型参数符合某些条件。

### 3. 继承

```ts
interface Animal {
    run: () => void
}

interface Dog extends Animal {
    bark: () => void
}
```