- # React 的 `useCallback` 深度解析

  `useCallback` 是 React 提供的性能优化 Hook，用于**记忆化函数引用**，避免不必要的函数重建。下面我将全面解析它的工作原理和实际应用。

  ## 基本语法

  ```
  const memoizedCallback = useCallback(
    () => {
      // 函数逻辑
    },
    [dependencies] // 依赖数组
  );
  ```

  ## 核心作用

  | 场景       | 无优化             | 使用 `useCallback`     |
  | :--------- | :----------------- | :--------------------- |
  | 函数创建   | 每次渲染都新建     | 依赖不变时返回相同引用 |
  | 子组件渲染 | 可能触发不必要渲染 | 避免不必要的子组件渲染 |

  ## 工作原理

  1. **记忆函数引用**：

     - 当依赖项不变时，返回上次创建的函数
     - 依赖变化时，返回新函数

  2. **与 `useMemo` 关系**：

     ```
     // 这两者等价
     useCallback(fn, deps) === useMemo(() => fn, deps)
     ```

  ## 正确使用场景

  ### 1. 优化子组件渲染

  ```
  // 子组件
  const Child = React.memo(({ onClick }) => {
    console.log('Child渲染');
    return <button onClick={onClick}>点击</button>;
  });
  
  // 父组件
  function Parent() {
    const [count, setCount] = useState(0);
    
    // ✅ 使用useCallback避免每次渲染都传递新函数
    const handleClick = useCallback(() => {
      setCount(c => c + 1);
    }, []);
    
    return (
      <div>
        <Child onClick={handleClick} />
        <div>计数: {count}</div>
      </div>
    );
  }
  ```

  ### 2. 作为依赖项的稳定引用

  ```
  useEffect(() => {
    // 需要稳定的函数引用
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]); // 依赖项需要稳定
  
  // ✅ 使用useCallback稳定引用
  const handleResize = useCallback(() => {
    console.log(window.innerWidth);
  }, []);
  ```

  ## 常见误区

  ### 1. 过度使用

  ```
  // ❌ 不必要的useCallback
  const handleClick = useCallback(() => {
    console.log('点击');
  }, []); // 简单函数不需要记忆化
  
  // ✅ 直接定义即可
  const handleClick = () => console.log('点击');
  ```

  ### 2. 依赖项处理不当

  ```
  // ❌ 缺少必要依赖
  const [count, setCount] = useState(0);
  const logCount = useCallback(() => {
    console.log(count); // 闭包陷阱，总是打印初始值
  }, []); // 缺少count依赖
  
  // ✅ 正确声明依赖
  const logCount = useCallback(() => {
    console.log(count);
  }, [count]); // count变化时创建新函数
  ```

  ## 性能优化策略

  ### 1. 与 `React.memo` 配合使用

  ```
  const ExpensiveComponent = React.memo(({ compute }) => {
    // 只在props变化时重新渲染
    const result = compute();
    return <div>{result}</div>;
  });
  
  function Parent() {
    const [data, setData] = useState([]);
    
    // ✅ 记忆化计算函数
    const compute = useCallback(() => {
      return expensiveCalculation(data);
    }, [data]);
    
    return <ExpensiveComponent compute={compute} />;
  }
  ```

  ### 2. 动态函数生成

  ```
  function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
  
    // ✅ 动态生成搜索函数
    const getSearchHandler = useCallback((searchType) => {
      return () => {
        fetch(`/api/search?q=${query}&type=${searchType}`)
          .then(res => res.json())
          .then(setResults);
      };
    }, [query]); // query变化时重新生成函数
  
    return (
      <div>
        <button onClick={getSearchHandler('web')}>网页搜索</button>
        <button onClick={getSearchHandler('image')}>图片搜索</button>
      </div>
    );
  }
  ```

  ## 何时应该使用

  1. **函数作为子组件的prop**（特别是被 `` 优化的组件）
  2. **函数作为其他Hook的依赖项**（如 `useEffect`）
  3. **创建成本高的函数**（如复杂计算或动态生成函数）

  ## 何时可以不用

  1. **简单事件处理器**（不传递给子组件）
  2. **内联函数**（如 `<button onClick={() => {}}>`）
  3. **性能影响可以忽略时**（过早优化是万恶之源）

  ## 总结

  `useCallback` 是 React 性能优化工具箱中的重要工具，但需要合理使用：

  - ✅ **正确使用**：能有效减少不必要的渲染和计算
  - ❌ **滥用**：反而会增加内存使用和比较开销
  - 🔍 **评估需求**：结合性能分析工具（React DevTools）判断是否真的需要

  记住：**不是所有函数都需要 `useCallback`**，只在确实能带来性能提升时使用它。
