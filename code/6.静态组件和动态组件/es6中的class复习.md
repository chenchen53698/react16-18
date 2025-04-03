### **1. 基本语法**

```
class Person {
  // 构造函数（初始化实例）
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // 实例方法（添加到原型）
  greet() {
    return `Hello, my name is ${this.name}!`;
  }

  // 静态方法（直接通过类调用）
  static info() {
    return 'This is a Person class';
  }
}

// 使用
const alice = new Person('Alice', 25);
console.log(alice.greet()); // "Hello, my name is Alice!"
console.log(Person.info()); // "This is a Person class"
```

#### **关键点**：

- `constructor`：类的构造函数，通过 `new` 调用时执行。
- 实例方法：定义在类的原型上，所有实例共享。
- 静态方法：用 `static` 声明，直接通过类名调用（如 `Person.info()`），不与实例绑定。

------

### **2. 继承（extends 和 super）**

ES6 类通过 `extends` 实现继承，子类需在 `constructor` 中调用 `super()`：



```
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age); // 必须首先调用父类构造函数
    this.grade = grade;
  }

  study() {
    return `${this.name} is studying in grade ${this.grade}`;
  }
}

// 使用
const bob = new Student('Bob', 20, 12);
console.log(bob.greet()); // 继承自Person: "Hello, my name is Bob!"
console.log(bob.study()); // "Bob is studying in grade 12"
```

#### **注意**：

- 子类必须在 `constructor` 中先调用 `super()`，才能使用 `this`。

- 可以重写父类方法：

  ```
  class Student extends Person {
    greet() {
      return `${super.greet()} I'm a student.`;
    }
  }
  ```

------

### **3. Getter 和 Setter**

通过 `get` 和 `set` 定义访问器属性：

```
class Rectangle {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }

  // Getter
  get area() {
    return this._width * this._height;
  }

  // Setter
  set width(value) {
    if (value > 0) {
      this._width = value;
    }
  }
}

// 使用
const rect = new Rectangle(10, 20);
console.log(rect.area); // 200（调用getter）
rect.width = 30;        // 调用setter
```

------

### **4. 静态属性和私有字段**

#### **静态属性**（ES2022）：-

```
class Config {
  static apiUrl = 'https://api.example.com';
}

console.log(Config.apiUrl); // 直接通过类访问
```

#### **私有字段**（ES2022，前缀 `#`）：

```
class Counter {
  #count = 0; // 私有字段

  increment() {
    this.#count++;
  }

  get value() {
    return this.#count;
  }
}

const counter = new Counter();
counter.increment();
console.log(counter.value); // 1
// console.log(counter.#count); // 报错：私有字段不可外部访问
```

------

### **5. 类与原型链的关系**

ES6 的 `class` 本质仍是基于原型的语法糖：

```
class Foo {}
console.log(typeof Foo); // "function"（类本质是函数）

// 等价于旧写法
function OldFoo() {}
OldFoo.prototype.method = function() {};
```

#### **区别**：

- `class` 声明不会提升（必须先声明后使用）。
- 类内部方法不可枚举（`Object.keys` 不会列出它们）。
- 类必须通过 `new` 调用，否则报错。

------

### **6. 类表达式**

类可以像函数一样用表达式定义：

```
const Animal = class {
  constructor(name) {
    this.name = name;
  }
};

const dog = new Animal('Dog');
```

------

### **7. 与 React 类组件的关系**

React 类组件基于 ES6 类：

```
class MyComponent extends React.Component {
  state = { count: 0 };

  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        Clicked {this.state.count} times
      </button>
    );
  }
}
```

------

### **8. 常见问题**

#### **Q: 类中的箭头函数 vs 普通方法**

- **箭头函数**：自动绑定 `this`，但每个实例会创建新函数（内存开销）。

  ```
  class Example {
    handleClick = () => {
      console.log(this); // 始终指向实例
    };
  }
  ```

- **普通方法**：需手动绑定 `this`，但原型共享更省内存。

  ```
  class Example {
    handleClick() {
      console.log(this); // 需通过 .bind(this) 或构造函数绑定
    }
  }
  ```

#### **Q: 如何实现抽象类？**

JavaScript 没有原生抽象类，但可通过抛出错误模拟：

```
class AbstractClass {
  constructor() {
    if (new.target === AbstractClass) {
      throw new Error('Cannot instantiate abstract class');
    }
  }
}
```

------

### **总结**

- **用途**：ES6 `class` 提供清晰的 OOP 语法，适合封装复杂逻辑。
- **核心特性**：构造函数、继承、静态成员、getter/setter。
- **注意事项**：理解其原型本质，合理选择方法定义方式（箭头函数或普通方法）。
- **现代开发**：结合私有字段和静态属性（ES2022）提升代码组织性。
