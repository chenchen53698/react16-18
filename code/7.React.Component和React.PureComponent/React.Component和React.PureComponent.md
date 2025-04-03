在 React 中，`React.Component` 和 `React.PureComponent` 是两种基类组件，它们在状态管理和性能优化上有显著区别。以下是它们的核心差异、使用场景和最佳实践：

------

### **1. 核心区别**

| **特性**       | `React.Component`                      | `React.PureComponent`                      |
| :------------- | :------------------------------------- | :----------------------------------------- |
| **浅比较机制** | 无                                     | 自动对 `props` 和 `state` 进行浅比较       |
| **性能优化**   | 需手动实现 `shouldComponentUpdate`     | 内置浅比较，减少不必要的渲染               |
| **适用场景**   | 动态数据频繁变化                       | 数据稳定或可预测变化                       |
| **继承方式**   | `class MyComp extends React.Component` | `class MyComp extends React.PureComponent` |

------

### **2. 浅比较（Shallow Comparison）详解**

`PureComponent` 通过浅比较决定是否重新渲染：

```
// 浅比较逻辑（伪代码）
function shouldUpdate(nextProps, nextState) {
  return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
}
```

- **浅比较规则**：
  - 基本类型（如 `string`、`number`）：直接比较值。
  - 引用类型（如 `object`、`array`）：比较引用地址（非深层属性）。

#### **示例：浅比较的影响**

```
// 父组件
state = { 
	items: [{ id: 1 }] 
};

// 情况1：引用未变（不触发子组件更新）
this.setState({ items: this.state.items });

// 情况2：引用改变（触发子组件更新）
this.setState({ items: [...this.state.items] });
```

------

### **3. 使用场景对比**

#### **何时用 `Component`？**

- 数据变化频繁且不可预测。

- 需要完全控制渲染逻辑（手动实现 `shouldComponentUpdate`）。

- 使用动态生成的 `props`（如内联函数或对象）：

  ```
  <Child onClick={() => {...}} />  // 内联函数导致 PureComponent 失效
  ```

#### **何时用 `PureComponent`？**

- `props` 和 `state` 为基本类型或稳定引用。
- 渲染成本高的大型列表/表格。
- 避免不必要的子组件更新（性能敏感场景）。

------

### **4. 代码示例**

#### **`React.Component` 基础用法**

```
class MyComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // 手动控制更新逻辑
    return nextProps.id !== this.props.id;
  }

  render() {
    return <div>{this.props.value}</div>;
  }
}
```

#### **`React.PureComponent` 自动优化**

```
class MyPureComponent extends React.PureComponent {
  render() {
    return <div>{this.props.value}</div>; // 自动浅比较 props
  }
}
```

------

### **5. 性能陷阱与解决方案**

#### **陷阱1：动态生成 `props`**

```
// ❌ 每次渲染生成新对象，导致 PureComponent 失效
<MyPureComponent style={{ color: 'red' }} />

// ✅ 解决方案：提取为常量或使用 memoization
const styles = { color: 'red' };
<MyPureComponent style={styles} />
```

#### **陷阱2：深层嵌套数据**

```
state = { nested: { count: 0 } };

// ❌ 浅比较无法检测深层变化
this.setState({ nested: this.state.nested });

// ✅ 解决方案：创建新引用
this.setState({ nested: { ...this.state.nested, count: 1 } });
```

#### **陷阱3：函数作为 `props`**

```
// ❌ 内联函数每次渲染引用不同
<MyPureComponent onClick={() => {...}} />

// ✅ 解决方案：绑定实例方法或使用 useCallback
class Parent extends React.Component {
  handleClick = () => {...}; // 实例方法
  render() {
    return <MyPureComponent onClick={this.handleClick} />;
  }
}
```

------

### **6. 与函数组件的对比**

| **场景**       | 类组件方案              | 函数组件等价方案             |
| :------------- | :---------------------- | :--------------------------- |
| **基础组件**   | `extends Component`     | `function Comp(props)`       |
| **自动浅比较** | `extends PureComponent` | `React.memo(Comp, areEqual)` |
| **手动优化**   | `shouldComponentUpdate` | `React.memo` 的第二个参数    |

函数组件的 `React.memo` 示例：

```
const MyMemoComp = React.memo(
  function MyComp(props) {
    return <div>{props.value}</div>;
  },
  (prevProps, nextProps) => prevProps.value === nextProps.value // 自定义比较
);
```

------

### **7. 最佳实践**

1. **优先使用 `PureComponent`**：
   在数据稳定的场景下，默认继承 `PureComponent` 可减少无意义渲染。
2. **避免动态 `props`**：
   将内联对象/函数提取为常量或实例方法。
3. **复杂数据结构的处理**：
   使用不可变数据（如 Immer.js）或手动深比较。
4. **性能监控**：
   结合 React DevTools 的 "Highlight Updates" 检测冗余渲染。

------

### **总结**

- **`Component`**：灵活但需手动优化，适合高度动态的场景。
- **`PureComponent`**：通过浅比较自动优化性能，适合数据引用稳定的场景。
- **现代替代**：新项目建议使用函数组件 + `React.memo` + `useMemo`/`useCallback` 组合。
