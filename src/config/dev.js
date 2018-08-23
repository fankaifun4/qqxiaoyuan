
let testUrl = 'http://www.999lp.cn:8080'

export const baseUrl = process.env.NODE_ENV === 'development' ? testUrl : 'http://www.999lp.cn:8080' // 根据 process.env.NODE_ENV 的值判断当前是什么环境

