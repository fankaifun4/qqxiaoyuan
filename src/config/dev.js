
// let testUrl = 'http://www.999lp.cn:8080'

let testUrl = 'https://www.999lp.cn'
let productUrl = 'http://158zfy.oicp.net:49335'
export const baseUrl = process.env.NODE_ENV === 'development' ? testUrl : productUrl
