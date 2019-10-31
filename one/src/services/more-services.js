



import HTTP from '../utils/http'
const _http = new HTTP()
class Move {
  specialTwo (id) {
    return _http.request({
      url: `small4/cms/news/detail?id=${id}`,
    })
  }
  classifyTwo (id) {
    return _http.request({
      url: `small4/shop/goods/list`,
    })
  }
}
export default Move