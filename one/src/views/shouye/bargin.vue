<template>
  <div>
    <div class="home-bargain">
      <router-link tag="div" to="/bargain">全民砍价</router-link>
      <ul>
        <router-link tag="li" :to="{ path:'/barginTwo',query:{id:item.id}}" v-for="(item,index) in bargain" :key="index">
          <div @click="shai(item,index)">
              <div class="left">
              <img :src="item.pic" alt="">
            </div>
            <div class="right">
              <h5>{{item.name}}</h5>
              <p class="pOne">{{item.characteristic}}</p>
              <ol>
                <li>
                  <p class="pTwo">¥{{item.minPrice}}.00</p>
                  <p>底价</p>
                </li>
                <li class="liOne">
                  <p>¥{{item.originalPrice}}.00</p>
                  <p>原价</p> 
                </li>
                <li  class="liOne">
                  <p>{{item.stores}}件</p>
                  <p>限量</p>
                </li>
              </ol>
            </div>
          </div>
        </router-link>
      </ul>
      <p class="color"></p>
    </div>
  </div>
</template>

<script>
import Shouye from '../../services/shouye-services'
const _shouye= new Shouye()
  export default {
    data() {
      return {
        bargain:[],//砍价的数据
        userid:[],
        aaa:[]
      }
    },
    created() {
     _shouye.bargin().then((res)=>{
        this.bargain=res.data.data.goodsMap
        this.userid=res.data.data.result
      })
    },
    methods: {
      shai(v,i){
        this.aaa=this.userid.filter((item)=>{
          if(item.goodsId==v.id){
            return item.id
          }
        })
        this.$store.commit('kjiD',this.aaa[0].id)
      }
    },
  }
</script>

<style lang="scss" scoped>
 .home-bargain{
    width: 100%;
    >div{
      width: 100%;
      height: 0.96rem;
      line-height: 0.96rem;
      font-size: 0.28rem;
      text-align: center;
      background: url(../../assets/bg1.png) no-repeat 4.4rem;
      background-size: 0.32rem 0.32rem;
    }
    >ul{
      width: 100%;
      height: 7.8rem;
      overflow: hidden;
      >li{
            width: 100%;
            height: 2.6rem;
        >div{
            width: 100%;
            height: 2.6rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-top: 0.01rem solid #f0f0f0;
      .left{
        width: 2.3rem;
        height: 2.3rem;
        img{
          width: 2.3rem;
          height: 2.3rem;
          display: block;
        }
      }
      .right{
        width: 4.6rem;
        height: 2.3rem;
        h5{
          font-size: 0.22rem;
        }
        .pOne{
          height: 0.4rem;
          color: #cecece;
          font-size: 0.22rem;
          margin-top: 0.28rem;
        }
        ol{
          width: 4rem;
          margin-top: 0.7rem;
          display: flex;
          justify-content: space-between;
          li{
            text-align: center;
              .pTwo{
              color: red;
            }
          }
          .liOne{
            color: #b3b3b3;
          }
        }
      }
    }
    }
  }
  }
  .color{
  width: 100%;
  height: 0.1rem;
  background: #f5f5f5;
}
</style>