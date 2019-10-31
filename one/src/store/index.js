import Vue from 'vue'
import Vuex from 'vuex'
import { privateEncrypt } from 'crypto'
Vue.use(Vuex)
import storage from '../model/storage'

const store = new Vuex.Store({
  // 状态管理对象
  state: {
    token: [], //存储登录数据
    spid: '', //商品id
    kjiD: "",  //砍价的id
    shop: [],//购物车的数据
    isShow: false,
    aaa: {
      allchecked: true
    }
  },
  // 方法
  mutations: {
    // 登录的点击事件
    login (state,object) {
      state.token.push(object)
    },
    //商品id
    spid (state,id) {
      state.spid=id
    },
    //砍价id
    kjiD (state, id) {
      state.kjiD=id
    },
    //加入购物车的点击事件
    add (state, obj) {
      let index=state.shop.findIndex((i) => {
        return i.chimaId==obj.chimaId&&i.colorId==obj.colorId
      })
      if (index == -1) {
        state.shop.push(obj)
      } else {
        state.shop[index].num++
      }
      // storage.set('shopping',state.shop)
    },
    //减点击事件
    jian (state,index) {
      state.shop[index].num--
      if (state.shop[index].num <= 0) {
        state.shop[index].num=1
      }
    },
    //加点击事件
    jia (state, index) {
      state.shop[index].num++
    },
    //选中删除点击事件
    del (state) {
      let arr=[]
      state.shop.forEach((item) => {
        if (item.checked == false) {
          arr.push(item)
        } else {
          item.num=1
        }
      })
      state.shop = arr
    },
    //复选框的change事件
    checked (state) {
      let bool = state.shop.every((i) => {
        return i.checked==true
      })
      state.aaa.allchecked = bool
    },
    //全选的点击事件
    bbb (state) {
      state.shop.forEach((i) => {
        i.checked = state.aaa.allchecked
      })
    },
    //本地存储判断全选框的值
    createaaa (state,aaa) {
      state.shop = aaa
      let obj = state.shop.every((i) => {
        return i.checked == true
      })
      state.aaa.allchecked = obj
    }
  },
  // 计算属性
  getters: {
    // 计算数量
    num (state) {
      let num=0
      state.shop.forEach((i) => {
        if (i.checked == true) {
          num += i.num
        }
      })
      return num
    },
    //计算价格
    price (state) {
      let price = 0;
      state.shop.forEach((i) => {
        if (i.checked == true) {
          price += i.num * i.price
        }
      })
      return price
    }
  }
})
export default store