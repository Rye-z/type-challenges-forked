> [TypeScript 中的子类型、逆变、协变是什么？ · Issue #54 · sl1673495/blogs](https://github.com/sl1673495/blogs/issues/54)

## 子类型特征

子类型一定比父类型 **更加具体**

Dog 是 Animal 的子类型
```ts
class Animal = {
    age: number
}

class Dog = {
    age: number
    bark: () => void
}

let animal = new Animal()

let dog = new Dog()

animal = dog
```

```ts
type Parent = 'a' | 'b' | 'c'
type Son = 'a' | 'b'

let parent: Parent
let son: Son

parent = son // ✅ok
son = parent // ❌error! parent 有可能是 'c'
```
