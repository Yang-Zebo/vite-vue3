import Promise from 'bluebird'


Promise.config({
  // Enable warnings 启用警告
  warnings: false,
  // Enable long stack traces 启用长堆栈跟踪
  longStackTraces: false,
  // Enable cancellation 启用取消
  cancellation: true,
  // Enable monitoring 启用监视
  monitoring: true,
  // Enable async hooks 启用异步挂钩
  asyncHooks: false,
})
globalThis.Promise1 = Promise
