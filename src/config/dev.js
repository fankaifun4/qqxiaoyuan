
// let testUrl = 'http://www.999lp.cn:8080'

let testUrl = 'https://www.999lp.cn'
let productUrl = 'https://www.999lp.cn'
export const baseUrl = process.env.NODE_ENV === 'development' ? testUrl : productUrl
