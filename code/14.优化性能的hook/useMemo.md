# React `useMemo` 深度解析

`useMemo` 是 React 提供的性能优化 Hook，用于**记忆化计算结果**，避免不必要的重复计算。下面我将全面解析它的工作原理和最佳实践。

## 基本语法

```
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

## 核心特性

| 特性         | 说明                                  |
| :----------- | :------------------------------------ |
| **记忆化**   | 只有当依赖项变化时才重新计算          |
| **返回值**   | 记忆化的计算结果（不是函数）          |
| **执行时机** | 在渲染阶段同步执行（与useEffect不同） |
| **优化目标** | 避免昂贵的重复计算                    |

## 工作原理

1. **首次渲染**：
   - 执行计算函数
   - 缓存结果
   - 返回计算结果
2. **后续渲染**：
   - 检查依赖项是否变化
   - 无变化 → 返回缓存值
   - 有变化 → 重新计算并缓存新值

```
// 概念实现（非真实源码）
function useMemo(factory, deps) {
  const [memoized, setMemoized] = useState(() => [deps, factory()]);
  
  if (hasDepsChanged(memoized[0], deps)) {
    setMemoized([deps, factory()]);
  }
  
  return memoized[1];
}
```

## 正确使用场景

### 1. 昂贵计算优化

```
function ComplexComponent({ list }) {
  // ✅ 只有list变化时才重新排序
  const sortedList = useMemo(() => {
    return [...list].sort((a, b) => a.value - b.value);
  }, [list]);

  return <List items={sortedList} />;
}
```

### 2. 引用稳定性

```
function Form() {
  const [name, setName] = useState('');
  
  // ✅ 保持config引用稳定
  const config = useMemo(() => ({
    color: 'blue',
    fontSize: name.length > 10 ? 'small' : 'large'
  }), [name.length]);
  
  useEffect(() => {
    // 只有当config真正变化时才执行
    applyConfig(config);
  }, [config]);
  
  return <input value={name} onChange={e => setName(e.target.value)} />;
}
```

### 3. 派生状态计算

```
function Dashboard({ transactions }) {
  // ✅ 避免每次渲染都重新计算
  const { income, expense } = useMemo(() => {
    return transactions.reduce(
      (acc, curr) => {
        curr.amount > 0 ? acc.income += curr.amount : acc.expense += Math.abs(curr.amount);
        return acc;
      },
      { income: 0, expense: 0 }
    );
  }, [transactions]);
  
  return (
    <div>
      <p>收入: {income}</p>
      <p>支出: {expense}</p>
    </div>
  );
}
```

## 性能优化策略

### 1. 与 `React.memo` 配合



```
const ExpensiveChild = React.memo(({ data }) => {
  // 渲染逻辑
});

function Parent({ rawData }) {
  // ✅ 记忆化传递给子组件的数据
  const processedData = useMemo(() => processData(rawData), [rawData]);
  
  return <ExpensiveChild data={processedData} />;
}
```

### 2. 避免不必要计算

javascript

复制

```
function Component({ a, b }) {
  // ✅ 跳过不需要的计算
  const result = useMemo(() => {
    if (a === null) return null;
    return expensiveCalculation(a, b);
  }, [a, b]);
  
  return <div>{result}</div>;
}
```

## 常见误区

### 1. 过度使用

javascript

复制

```
// ❌ 简单计算不需要useMemo
const value = useMemo(() => 1 + 1, []); 

// ✅ 直接计算即可
const value = 1 + 1;
```

### 2. 依赖项错误

javascript

复制

```
// ❌ 缺少必要依赖
const [count, setCount] = useState(0);
const doubled = useMemo(() => count * 2, []); // 总是返回初始值

// ✅ 正确声明依赖
const doubled = useMemo(() => count * 2, [count]);
```

### 3. 副作用滥用

javascript

复制

```
// ❌ 错误 - 副作用应使用useEffect
useMemo(() => {
  fetchData().then(setData); // 副作用代码
}, []);

// ✅ 正确 - 只用于计算
const processedData = useMemo(() => transform(data), [data]);
```

## 高级用法

### 1. 自定义比较逻辑

javascript

复制

```
function useDeepMemo(factory, deps) {
  const ref = useRef({ deps, value: factory() });
  
  if (!deepEqual(ref.current.deps, deps)) {
    ref.current = { deps, value: factory() };
  }
  
  return ref.current.value;
}

// 使用
const config = useDeepMemo(() => ({ theme: 'dark' }), [userPrefs]);
```

### 2. 记忆化组件

jsx

复制

```
const MemoizedComponent = useMemo(() => 
  React.memo(({ props }) => <Component {...props} />)
, []);

function Parent() {
  return <MemoizedComponent props={...} />;
}
```

## 性能测量建议

1. 使用 React DevTools Profiler 分析组件渲染
2. 比较使用 `useMemo` 前后的渲染时间
3. 重点关注：
   - 计算函数的执行频率
   - 组件重新渲染的原因

## 总结

`useMemo` 是 React 性能优化工具箱中的重要工具，合理使用可以：

- ✅ **提升性能**：避免不必要的昂贵计算
- ✅ **稳定引用**：保持对象/数组引用稳定
- ✅ **优化子组件**：减少不必要的子组件渲染

**使用原则**：

1. 先写出清晰代码，再优化性能瓶颈
2. 使用性能分析工具验证优化效果
3. 避免过早和过度优化

记住：**不是所有计算都需要 `useMemo`**，只在确实能带来性能提升时使用它。
