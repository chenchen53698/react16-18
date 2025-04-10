`Object.defineProperty()` 是 JavaScript 中用于直接在对象上定义新属性或修改现有属性的重要方法，它提供了对属性行为的精确控制。

## 基本语法

```
Object.defineProperty(obj, prop, descriptor)
```

### 参数说明

- `obj`：要定义属性的对象
- `prop`：要定义或修改的属性名称（String 或 Symbol）
- `descriptor`：要定义或修改的属性描述符

## 属性描述符类型

### 1. 数据描述符（Data Descriptor）

```
{
  value: any,          // 属性值
  writable: boolean,   // 是否可写（默认false）
  enumerable: boolean, // 是否可枚举（默认false）
  configurable: boolean // 是否可配置/删除（默认false）
}
```

### 2. 存取描述符（Accessor Descriptor）

```
{
  get: function() {},  // 获取属性值函数
  set: function() {},  // 设置属性值函数
  enumerable: boolean, // 是否可枚举
  configurable: boolean // 是否可配置
}
```

> ⚠️ 数据描述符和存取描述符不能混用（不能同时有 `value` 和 `get/set`）

## 使用示例

### 示例1：基本属性定义

```
const obj = {};

// 定义不可枚举、不可写、不可配置的属性
Object.defineProperty(obj, 'hiddenProp', {
  value: 'secret',
  writable: false,
  enumerable: false,
  configurable: false
});

console.log(obj.hiddenProp); // "secret"
console.log(Object.keys(obj)); // [] (不可枚举)
obj.hiddenProp = 'new'; // 静默失败（严格模式会报错）
delete obj.hiddenProp; // false (不可删除)
```

### 示例2：存取器属性



```
const user = {
  firstName: 'John',
  lastName: 'Doe'
};

Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.firstName} ${this.lastName}`;
  },
  set(value) {
    [this.firstName, this.lastName] = value.split(' ');
  },
  enumerable: true
});

console.log(user.fullName); // "John Doe"
user.fullName = 'Jane Smith';
console.log(user.firstName); // "Jane"
```

### 示例3：实现属性验证

javascript

复制

```
function createValidatedObject() {
  const obj = {};
  let internalValue = 0;

  Object.defineProperty(obj, 'validatedProp', {
    get() {
      return internalValue;
    },
    set(newValue) {
      if (typeof newValue !== 'number') {
        throw new TypeError('Value must be a number');
      }
      if (newValue < 0 || newValue > 100) {
        throw new RangeError('Value must be between 0-100');
      }
      internalValue = newValue;
    },
    enumerable: true
  });

  return obj;
}

const validatedObj = createValidatedObject();
validatedObj.validatedProp = 50; // 正常
validatedObj.validatedProp = 'abc'; // 抛出TypeError
```

## 重要特性

### 1. 默认值差异

- 使用 `Object.defineProperty()` 时，描述符属性默认为 `false`
- 普通属性赋值（`obj.prop = value`）创建的属性默认为：
  - `writable: true`
  - `enumerable: true`
  - `configurable: true`

### 2. 配置限制

- 当 `configurable: false` 时：
  - 不能更改除 `writable` 从 `true` 改为 `false` 之外的任何特性
  - 不能删除属性
- 当 `writable: false` 时，属性值不能被重写

### 3. 批量定义属性

可以使用 `Object.defineProperties()` 定义多个属性：

```
Object.defineProperties(obj, {
  prop1: {
    value: true,
    writable: true
  },
  prop2: {
    value: 'Hello',
    writable: false
  }
});
```

## 实际应用场景

### 1. 实现不可变对象

```
function createImmutableObject(data) {
  const immutable = {};
  Object.keys(data).forEach(key => {
    Object.defineProperty(immutable, key, {
      value: data[key],
      writable: false,
      configurable: false
    });
  });
  return immutable;
}
```

### 2. 实现观察者模式

```
function observe(obj, property, callback) {
  let value = obj[property];
  
  Object.defineProperty(obj, property, {
    get() { return value; },
    set(newValue) {
      const oldValue = value;
      value = newValue;
      callback(property, oldValue, newValue);
    },
    enumerable: true,
    configurable: true
  });
}

const user = { name: 'John' };
observe(user, 'name', (prop, oldVal, newVal) => {
  console.log(`${prop} changed from ${oldVal} to ${newVal}`);
});

user.name = 'Jane'; // 输出: name changed from John to Jane
```

### 3. 兼容旧版浏览器

实现类似现代 JavaScript 特性的 polyfill：

```
// 简单的Array.prototype.find的polyfill
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
      for (let i = 0; i < this.length; i++) {
        if (predicate(this[i], i, this)) {
          return this[i];
        }
      }
      return undefined;
    },
    configurable: true,
    writable: true
  });
}
```

## 注意事项

1. **性能考虑**：频繁使用 `Object.defineProperty()` 可能影响性能
2. **严格模式**：在严格模式下，违反 `writable: false` 会抛出错误
3. **原型链**：定义在原型上的属性会影响所有实例
4. **Symbol属性**：可以使用 Symbol 作为属性名

## 浏览器兼容性

- 所有现代浏览器完全支持
- IE9+ 支持（IE8 有部分支持）
- Node.js 所有版本支持

`Object.defineProperty()` 是 JavaScript 元编程的重要工具，合理使用可以实现许多高级特性，但也应谨慎使用以避免不必要的复杂性。
