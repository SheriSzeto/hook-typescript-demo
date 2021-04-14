# React Hook + TS 购物车实战

## 总结

- 如何抽象自定义hook
- 如何使用react suspense中的useRequest
- 如何使用useMemo, useCallback优化性能
- 如何使用hook+ts编写业务组件

## useRequest

useRequest 是一个超级强大，且生产完备的网络请求 Hooks，目前已经成为蚂蚁中台最佳实践内置网络请求方案。在蚂蚁内部中台应用，写网络请求，都推荐用 useRequest。

### 基础用法
```javascript
import { useRequest } from '@umijs/hooks';
​
function getUsername() {
  return Promise.resolve('jack');
}
​
export default () => {
  const { data, error, loading } = useRequest(getUsername)
  
  if (error) return <div>failed to load</div>
  if (loading) return <div>loading...</div>
  return <div>Username: {data}</div>
}
```