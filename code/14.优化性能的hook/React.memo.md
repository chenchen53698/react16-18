# React.memo 深度解析

React.memo 是 React 提供的高阶组件，用于优化函数组件的渲染性能。下面我将全面解析它的工作原理和使用技巧。

## 基本概念

### 1. 定义

```
const MemoizedComponent = React.memo(Component, arePropsEqual?)
```

### 2. 作用

- 记忆化组件：当父组件重新渲染时，如果props未变化，则跳过子组件的渲染
- 相当于类组件中的 `PureComponent`，但用于函数组件

## 核心特性

### 1. 浅比较（默认行为）

```
const MyComponent = React.memo(function MyComponent(props) {
  /* 使用 props 渲染 */
});

// 等同于：
React.memo(MyComponent, (prevProps, nextProps) => {
  return shallowEqual(prevProps, nextProps);
});
```

### 2. 自定义比较函数

```
function Article({ content }) {
  return <article>{content}</article>;
}

const MemoizedArticle = React.memo(Article, (prevProps, nextProps) => {
  // 只有当content长度变化超过10%时才重新渲染
  const prevLen = prevProps.content.length;
  const nextLen = nextProps.content.length;
  return Math.abs(prevLen - nextLen) / prevLen < 0.1;
});
```

## 使用场景

### 1. 纯展示组件

```
const UserAvatar = React.memo(({ user }) => (
  <img 
    src={user.avatarUrl} 
    alt={user.name}
  />
));
```

### 2. 频繁渲染的组件

```
const HeavyList = React.memo(({ items }) => (
  <ul>
    {items.map(item => (
      <ListItem key={item.id} item={item} />
    ))}
  </ul>
));
```

### 3. 配合useCallback使用

```
const SubmitButton = React.memo(({ onSubmit }) => (
  <button onClick={onSubmit}>提交</button>
));

function Form() {
  const [text, setText] = useState('');
  
  // ✅ 使用useCallback避免每次渲染都传递新函数
  const handleSubmit = useCallback(() => {
    console.log('提交:', text);
  }, [text]);
  
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <SubmitButton onSubmit={handleSubmit} />
    </>
  );
}
```

## 性能优化原理

1. **渲染流程**：
   - 父组件渲染 → 生成子组件新props
   - React比较新旧props
   - 如果props未变化，复用上次渲染结果
2. **比较算法**：
   - 基本类型：`prev === next`
   - 对象/数组：浅比较（只比较第一层属性）

## 最佳实践

### 1. 正确使用条件

- 组件经常使用相同的props重新渲染
- 组件渲染成本较高（如复杂计算或大量DOM节点）
- 组件是纯函数（相同props总是相同输出）

### 2. 避免滥用

```
// ❌ 不推荐 - 简单组件不需要memo
const SimpleButton = React.memo(({ children }) => (
  <button>{children}</button>
));

// ✅ 推荐 - 保留简单组件原样
const SimpleButton = ({ children }) => (
  <button>{children}</button>
);
```

### 3. 组合优化策略

```
function Parent() {
  const [count, setCount] = useState(0);
  const [items] = useState([...]);
  
  // ✅ 组合useMemo和React.memo
  const processedItems = useMemo(() => (
    items.map(processItem)
  ), [items]);
  
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>计数: {count}</button>
      <MemoizedItemList items={processedItems} />
    </div>
  );
}

const MemoizedItemList = React.memo(({ items }) => (
  <ul>
    {items.map(item => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
));
```

## 常见问题

### 1. props比较失效

jsx

复制

```
// ❌ 对象字面量每次都是新的引用
<MemoizedComponent style={{ color: 'red' }} />

// ✅ 解决方案
const style = useMemo(() => ({ color: 'red' }), []);
<MemoizedComponent style={style} />
```

### 2. 函数props问题

jsx

复制

```
// ❌ 每次渲染都创建新函数
<MemoizedComponent onClick={() => {}} />

// ✅ 使用useCallback
const handleClick = useCallback(() => {}, []);
<MemoizedComponent onClick={handleClick} />
```

### 3. 子组件问题

jsx

复制

```
// ❌ children属性也会导致重新渲染
<MemoizedComponent>
  <Child /> {/* 每次都是新实例 */}
</MemoizedComponent>

// ✅ 解决方案
const children = useMemo(() => <Child />, []);
<MemoizedComponent>
  {children}
</MemoizedComponent>
```

## 性能测量

使用 React DevTools 检查：

1. 组件是否真的减少了渲染次数
2. props比较是否按预期工作
3. 比较函数是否成为性能瓶颈

## 总结

React.memo 是函数组件性能优化的重要工具，但需要合理使用：

- ✅ **适用场景**：复杂组件、频繁渲染、相同props重复渲染
- ❌ **避免滥用**：简单组件、props经常变化、过早优化
- 🔍 **配合工具**：使用性能分析工具验证优化效果

记住：**不是所有组件都需要记忆化**，优先解决明显的性能瓶颈。
