// 防抖 当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定时间到来之前，又触发了事件，就重新开始延时。
export function debounce(fn, wait) {
  let timeout = null //定义一个定时器
  return function() {
    if (timeout !== null) {
      clearTimeout(timeout)
    } //清除这个定时器
    timeout = setTimeout(fn, wait)
  }
}
// 节流 当持续触发事件时，保证在一定时间内只调用一次事件处理函数。
export function throttle(func, delay) {
  let timer = null
  let startTime = Date.now() //设置开始时间
  return function() {
    let curTime = Date.now()
    let remaining = delay - (curTime - startTime) //剩余时间
    let context = this
    let args = arguments
    clearTimeout(timer)
    if (remaining <= 0) {
      // 第一次触发立即执行
      func.apply(context, args)
      startTime = Date.now()
    } else {
      timer = setTimeout(func, remaining) //取消当前计数器并计算新的remaining
    }
  }
}
// 深克隆
export function deepClone(obj) {
  // 先判断出基础数据类型和方法
  if (obj === null || typeof obj !== 'object') {
    return obj
    // null undefined number string boolen symbol bigint function
    // 遇到这几个类型直接返回出去
  }
  // 预防环形对象的处理
  if (!deepClone.cached) {
    // 创建一个 WeakMap 对象挂载在 deepClone 的属性 cached 上
    deepClone.cached = new WeakMap() // 虚引用map
  }
  // 如果 obj 已经保存过，无需执行后续
  if (deepClone.cached.has(obj)) {
    return deepClone.cached.get(obj)
  }
  // 判断几大类型
  if (obj instanceof Map) {
    // 新建一个map 替代老Map
    let tmp = new Map()
    // 让 obj 作为 key, tmp 作为 value 保存在 deepClone.cached 的属性上
    deepClone.cached.set(obj, tmp)
    for (let [key, value] of obj) {
      // of 取值 in 是取 key
      tmp.set(key, deepClone(value))
      // value可能是引用数据类型，需要递归处理！！
    }
    return tmp
  } else {
    if (obj instanceof Set) {
      let tmp = new Set()
      deepClone.cached.set(obj, tmp)
      for (let val of obj) {
        tmp.add(deepClone(val))
        // value可能是引用数据类型，需要递归处理！！
      }
      return tmp
    } else {
      if (obj instanceof RegExp) {
        let tmp = new RegExp(obj)
        deepClone.cached.set(obj, tmp)
        return tmp
      } else {
        if (obj instanceof Date) {
          let tmp = new Date(obj)
          deepClone.cached.set(obj, tmp)
          return tmp
        } else {
          // 还剩下数组和普通对象类型的数据
          // 创建一个跟 obj 相同的数据类型
          // 由于实例的 constructor 指向 它的构造器（构造函数），所以可以 new 出相同数据类型
          let tmp = new obj.constructor()
          deepClone.cached.set(obj, tmp)
          for (let key in obj) {
            tmp[key] = deepClone(obj[key])
            // obj[key]可能是引用数据类型， 需要递归处理！！
          }
          return tmp
        }
      }
    }
  }
}
// 把标准时间格式化
export function formatStandardTime(standardTime, format = 'YYYY-MM-DD') {
  let year = standardTime.getFullYear()
  let month =
    standardTime.getMonth() + 1 < 10
      ? '0' + (standardTime.getMonth() + 1)
      : standardTime.getMonth() + 1
  let day =
    standardTime.getDate() < 10
      ? '0' + standardTime.getDate()
      : standardTime.getDate()
  let hours =
    standardTime.getHours() < 10
      ? '0' + standardTime.getHours()
      : standardTime.getHours()
  let minutes =
    standardTime.getMinutes() < 10
      ? '0' + standardTime.getMinutes()
      : standardTime.getMinutes()
  let seconds =
    standardTime.getSeconds() < 10
      ? '0' + standardTime.getSeconds()
      : standardTime.getSeconds()
  switch (format) {
    case 'YYYY-MM-DD':
      return `${ year }-${ month }-${ day }`
    case 'YYYY-MM-DD hh:mm:ss':
      return `${ year }-${ month }-${ day } ${ hours }:${ minutes }:${ seconds }`
  }
}