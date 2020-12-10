// 1. 向 jQuery 扩展一个方法
// document.cookie === 'a=100; b=200; c=300'
$.extend({
    getCookie (key) {
      const obj = {}
      const tmp = document.cookie.split('; ')
      // tmp === [ 'a=100', 'b=200', 'c=300' ]
      for (let i = 0; i < tmp.length; i++) {
        // t === ['a', '100']
        // t === ['b', '200']
        // t === ['c', '300']
        const t = tmp[i].split('=')
        // 一个一个的添加到 obj 里面
        // obj = { a: 100, b: 200, c: 300 }
        obj[t[0]] = t[1]
      }
  
      // 如果 key 传递了, 那么 key 就是一个 'a'
      // 那么返回 obj['a']
      // 如果 key 没有传递, 那么 key 就是一个 undefined
      // 那么返回 obj
      return key ? obj[key] : obj
    },
    setCookie (key, value, expires) {
      // 过期时间如果没有传递, 直接设置
      if (!expires) {
        document.cookie = key + '=' + value
        return
      }
  
      // 传递了过期时间, 设置一个时间向前调整八个小时
      const time = new Date()
      time.setTime(time.getTime() - 1000 * 8 * 60 * 60 + expires * 1000)
      document.cookie = `${key}=${value};expires=` + time
    },
    delCookie (key) {
      $.setCookie(key, '', -1)
    }
  })

  
  