
let testUrl = 'http://www.999lp.cn:8080'

// let testUrl = 'http://158zfy.oicp.net:49335'
let productUrl = 'http://www.999lp.cn:8080'
export const baseUrl = process.env.NODE_ENV === 'development' ? testUrl : productUrl
