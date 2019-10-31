<template>
  <div class="box">
      <router-link class="pOne" tag="p" to="/"><i tag="i"  class="el-icon-arrow-left"></i></router-link>
    <div class="block Block">
      <el-carousel height="7.5rem">
        <el-carousel-item v-for="(item,index) in pics" :key="index">
          <img :src="item.pic" alt="" class="small">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="content">
      <p class="pTwo">{{list.characteristic}}</p>
      <p class="pThree">{{list.name}}</p>
      <div class="divOne">
        <p>
          <span class="spanOne">底价¥{{list.minPrice}}</span>
          <span class="spanTwo">原价{{list.originalPrice}}</span>
        </p>
        <p class="pFor">库存{{list.stores}}</p>
      </div>
    </div>
    <div class="color"></div>
    <div class="shop">
      <ul>
        <li @click="jieshao" :class="{red:isShow}">商品介绍</li>
        <li @click="pingjia" :class="{red:!isShow}">商品评价</li>
      </ul>
      <div v-html="html" v-show="isShow">
      </div>
    </div>
    <div v-show="!isShow" class="pinglun">
        <ul>
          <li v-for="(item,index) in evaluate" :key="index">
            <div class="left">
              <i class="el-icon-user"></i>
            </div>
            <div class="right">
              <div class="right-top">
                <p>匿名用户</p>
                <div>{{item.goods.goodReputationStr}}</div>
              </div>
              <div class="right-center">
                {{item.goods.goodReputationRemark}}
              </div>
              <div class="right-bottom">
                <p>{{item.goods.dateReputation}}</p>
                <div>选择规格{{item.goods.goodsName}}</div>
              </div>
            </div>
            
          </li>
        </ul>
      </div>
    <router-link class="footer" tag="div" to="/barginInfo">立即发起砍价，最低可砍刀1元</router-link>
    </div>
</template>

<script>
import Shop from '../../services/shop-services'
const _shop = new Shop()
import Shouye from '../../services/shouye-services'
const _shouye= new Shouye()
  export default {
    data() {
      return {
        list:{},
        pics:[],
        html:[],
        evaluate:[],
        isShow:true,
        id:''
      }
    },
    created() {
      let { id } = this.$route.query
      this.$store.commit('spid',id)
      _shop.detail(id).then(res=>{
        this.list=res.data.data.basicInfo
        this.pics=res.data.data.pics
        this.html=res.data.data.content
        console.log(res)
      })
      _shouye.evaluate(id).then(res=>{
        let {data} =res.data
        this.evaluate=data
      })
    },
    methods: {
      jieshao(){
        this.isShow=true
      },
      pingjia(){
        this.isShow=false
      }
    },
  }
</script>

<style lang="scss" scoped>
.Block{
  width: 100%;
  height: 7.5rem;
  img{
    width: 100%;
    height: 7.5rem;
  }
}
.box{
  .pOne{
    position: fixed;
    top: 0.5rem;
    left: 0.5rem;
    border-radius: 100%;
    background: #f0f0f0;
    z-index: 100;
    i{
      font-size: 0.3rem;
      color: black;
    }
  }
}
.content{
  width: 7rem;
  height: 2.8rem;
  margin: 0 auto;
  .pTwo{
    font-size: 0.3rem;
    padding-top: 0.4rem;
  }
  .pThree{
    margin-top: 0.4rem;
    font-size: 0.2rem;
    color: gray;
  }
  .divOne{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 0.4rem;
    .spanOne{
      color: red;
      display: inline-block;
      width: 1.3rem;
      font-size: 0.25rem;
    }
    .spanTwo,.pFor{
      color: gray;
      font-size: 0.25rem;
    }
  }
}
.color{
  width: 100%;
  height: 0.2rem;
  background: #f0f0f0;
}
.shop{
  width: 100%;
  ul{
    width: 100%;
    display: flex;
    li{
      width: 50%;
      height: 0.7rem;
      line-height: 0.7rem;
      text-align: center;
      font-size: 0.3rem;
    }
  }
}
.footer{
  width: 100%;
  position: fixed;
  bottom: 0rem;
  height: 1rem;
  background: red;
  border-top: 0.01rem solid #f0f0f0;
  line-height: 1rem;
  color: white;
  text-align: center;
  font-size: 0.3rem;
}
.pinglun{
  width: 7.5rem;
  height: 10rem;
  li{
    width: 6.66rem;
    height: 2.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    .left{
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 100%;
      background: #f5f5f5;
      text-align: center;
      line-height: 1.2rem;
      i{
        font-size: 1rem;
      }
    }
    .right{
      width: 5.3rem;
      height: 1.9rem;
      .right-top{
        display: flex;
        width: 1.6rem;
        height: 0.33rem;
        justify-content: space-between;
        align-items: center;
        div{
          width: 0.54rem;
          height: 0.33rem;
          background: red;
          text-align: center;
          line-height: 0.33rem;
          border-radius: 0.05rem;
          color: white;
        }
      }
      .right-center{
        margin-top: 0.25rem;
      }
      .right-bottom{
        margin-top: 0.25rem;
        width: 4.55rem;
        display: flex;
        justify-content: space-between;
      }
    }
   }
}
.red{
  border-bottom: 0.01rem solid red;
}
</style>