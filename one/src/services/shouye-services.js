// 第二个文件: M层
// M： 数据
// V：视图
// C： 业务逻辑层

import HTTP from '../utils/http'
const _http = new HTTP()
class Shouye{
  //轮播
  banner () {
    return _http.request({
      url:"small4/banner/list"
    })
  }
  // 全民砍价
  bargin () {
    return _http.request({
      url:"small4/shop/goods/kanjia/list"
    })
  }
  article () {
    return _http.request({
      url:"small4/cms/news/list"
    })
  }
  recommend () {
    return _http.request({
      url:"small4/shop/goods/list"
    })
  }
  //分类
  classify () {
    return _http.request({
      type: 'post',
      url:"small4/shop/goods/category/all"
    })
  }
  // 登录接口
  login (obj) {
    return _http.request({
      type: 'post',
      url: "small4/user/m/login?deviceId=007&deviceName=monkey",
      data: {
        mobile: obj.mobile,
        pwd: obj.pwd
      }
    })
  }
  // 手机验证码接口
  shouji (obj) {
    console.log(obj)
    return _http.request({
      type: 'post',
      url: "small4/verification/sms/get",
      data: {
        mobile:obj.mobile,
        key: obj.key,
        picCode: obj.picCode
      }
    })
  }
  //注册
  zhuce (obj) {
    return _http.request({
      type: 'post',
      url: "small4/user/m/register",
      data: {
        mobile: obj.mobile,
        pwd:obj.pwd,
        code: obj.code
      }
    })
  }
  //获取省份数据
  provine () {
    return _http.request({
      type: 'post',
      url:'common/region/province'
    })
  }
  //获取市级数据
  city (id) {
    return _http.request({
      type: 'post',
      url: 'common/region/child',
      data: {
        pid:id
      }
    })
  }
  //登录to-ken检测
  token (ken) {
    return _http.request({
      type: 'post',
      url: 'small4/user/check-token',
      data: {
        token:ken
      }
    })
  }
  //商品评价
  evaluate (id) {
    return _http.request({
      type: 'post',
      url: 'small4/shop/goods/reputation',
      data: {
        goodsId: id
      }
    })
  }
  // 砍价详情
  kanjia (obj) {
    return _http.request({
      type: 'post',
      url: 'small4/shop/goods/kanjia/info',
      data: {
        kjid: obj.kjid,
        joiner:obj.joiner
      }
    })
  }
  //砍一刀
  kanyidao (obj) {
    return _http.request({
      type: 'post',
      url: 'small4/shop/goods/kanjia/help',
      data: {
        token:obj.token,
        kjid: obj.kjid,
        joinerUser: obj.joinerUser
      }
    })
  }
  //默认收货地址
  purchase (token) {
    return _http.request({
      type: 'post',
      url: 'small4/user/shipping-address/default',
      data: {
        token: token
      }
    })
  }
  //收货地址列表
  address (token) {
    return _http.request({
      type: 'post',
      url: 'small4/user/shipping-address/list',
      data: {
        token: token
      }
    })
  }
  //添加收货地址
  addAddress (obj) {
    return _http.request({
      type: 'post',
      url: 'small4/user/shipping-address/add',
      data: {
        address: obj.address,
        cityId: obj.cityId,
        code: obj.code,
        linkMan: obj.linkMan,
        mobile: obj.mobile,
        provinceId: obj.provinceId,
        token:obj.token
      }
    })
  }
  //尺码价钱
  chima (obj) {
    return _http.request({
      type: 'post',
      url: 'small4/shop/goods/price',
      data: {
        goodsId: obj.goodsId,
        propertyChildIds: obj.propertyChildIds
      }
    })
  }
  //获取订单列表
  chima (obj) {
    return _http.request({
      type: 'post',
      url: 'small4/shop/goods/price',
      data: {
        token
      }
    })
  }
}


export default Shouye