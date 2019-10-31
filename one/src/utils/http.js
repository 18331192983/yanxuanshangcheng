




// 第一个文件 -Axios 封装
import config from '../config'
import Axios from 'axios'
import Qs from 'qs'
import { reject } from 'q'
//定义HTTP类
class HTTP{
  //HTTP下面的方法
  request (params) {
    return new Promise((resolve, reject) => {
      Axios({
        method: params.type || 'get',
        url: config.baseUrl + params.url,
        data:Qs.stringify(params.data)
      }).then((res) => {
        // if (!res.code) {
        //   alert('请求成功')
        // }
        resolve(res)
      })
    })
  }
}
export default HTTP