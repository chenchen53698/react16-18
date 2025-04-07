- # `useEffect` 与 `useLayoutEffect` 的三大核心区别

  `useEffect` 和 `useLayoutEffect` 都是 React 用于处理副作用的 Hook，但它们在执行时机、使用场景和性能影响上有显著差异。以下是两者的三大关键区别：

  ## 1. 执行时机不同（核心区别）

  |                | `useEffect`                | `useLayoutEffect`                       |
  | :------------- | :------------------------- | :-------------------------------------- |
  | **触发时机**   | 在浏览器**绘制后**异步执行 | 在 DOM 更新后但浏览器**绘制前**同步执行 |
  | **执行顺序**   | 稍后执行，不阻塞渲染       | 立即执行，会阻塞浏览器渲染              |
  | **可视化流程** | 渲染 → 绘制 → useEffect    | 渲染 → useLayoutEffect → 绘制           |

  ```
  // 示例：观察执行顺序
  function Example() {
    useEffect(() => {
      console.log('useEffect - 绘制后执行');
    });
    
    useLayoutEffect(() => {
      console.log('useLayoutEffect - 绘制前执行');
    });
    
    return <div>测试执行顺序</div>;
  }
  // 控制台输出顺序：
  // 1. useLayoutEffect - 绘制前执行
  // 2. useEffect - 绘制后执行
  ```

  ## 2. 使用场景不同

  ### `useEffect` 适用场景：

  - 数据获取
  - 订阅事件
  - 手动修改 DOM（不需要立即反馈时）
  - 其他不需要阻塞页面渲染的副作用

  ```
  // 典型的数据获取示例
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);
  ```

  ### `useLayoutEffect` 适用场景：

  - 读取或修改 DOM 布局（如元素尺寸、位置）
  - 执行动画初始设置
  - 在用户看到UI不一致之前修复布局问题
  - 需要同步更新 DOM 的场景

  ```
  // 测量DOM元素尺寸
  useLayoutEffect(() => {
    const { width } = divRef.current.getBoundingClientRect();
    setWidth(width); // 在绘制前更新宽度，避免闪烁
  }, []);
  ```

  ## 3. 性能影响不同

  | 方面          | `useEffect`      | `useLayoutEffect`  |
  | :------------ | :--------------- | :----------------- |
  | **渲染阻塞**  | 不阻塞           | 阻塞，可能影响性能 |
  | **闪烁风险**  | 可能导致布局闪烁 | 避免布局闪烁       |
  | **SSR兼容性** | 服务端渲染安全   | 会在服务端产生警告 |

  **关键性能建议**：

  - 默认优先使用 `useEffect`（大多数场景）
  - 只在需要同步计算布局时使用 `useLayoutEffect`
  - 避免在 `useLayoutEffect` 中执行耗时操作

  ```
  // 性能敏感场景的正确选择
  function Tooltip() {
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const ref = useRef(null);
  
    // ✅ 使用useLayoutEffect避免位置计算导致的闪烁
    useLayoutEffect(() => {
      const { top, left } = calculatePosition(ref.current);
      setPosition({ top, left });
    }, []);
  
    return <div ref={ref} style={{ position: 'absolute', ...position }}>提示</div>;
  }
  ```

  ## 补充说明：服务端渲染(SSR)行为

  |                     | `useEffect` | `useLayoutEffect` |
  | :------------------ | :---------- | :---------------- |
  | **服务端执行**      | 不执行      | 会执行但产生警告  |
  | **客户端hydration** | 正常执行    | 正常执行          |

  jsx

  复制

  ```
  // 服务端渲染时的安全写法
  if (typeof window !== 'undefined') {
    // 只在客户端执行
    useLayoutEffect(() => {
      // 客户端特定逻辑
    }, []);
  }
  ```

  ## 总结决策树

  1. **是否需要同步更新DOM？**
     - 是 → 使用 `useLayoutEffect`
     - 否 → 进入下一步
  2. **是否涉及布局计算/避免闪烁？**
     - 是 → 使用 `useLayoutEffect`
     - 否 → 使用 `useEffect`
  3. **是否在服务端渲染中使用？**
     - 是 → 优先 `useEffect` 或条件执行
     - 否 → 根据前两点决定

  记住：**`useLayoutEffect` 是 `useEffect` 的同步版本**，它们的API完全相同，只是执行时机不同。正确选择可以优化用户体验和性能。
