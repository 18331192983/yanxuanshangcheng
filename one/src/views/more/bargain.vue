<template>
  <div>
    <div class="home-bargain">
      <div>
        <i class="el-icon-arrow-left" @click="prev"></i>
        <span>砍价列表</span>
      </div>
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
        aaa:{}
      }
    },
    created() {
     _shouye.bargin().then((res)=>{
        this.bargain=res.data.data.goodsMap
        this.userid=res.data.data.result
      })
    },
    methods: {
      prev(){
        this.$router.go(-1)
      },
      shai(v,i){
        this.aaa=this.userid.filter((item)=>{
          if(item.goodsId==v.id){
            return item.id
          }
        })
        console.log(this.aaa)
        this.$store.commit('kjiD',this.aaa.id)
      }
    },
  }
</script>

<style lang="scss" scoped>
 .home-bargain{
    width: 100%;
    >div{
      height: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      background: #ffffff;
      i{
        position: absolute;
        left: 0.4rem;
        font-size: 0.25rem;
      }
      span{
        font-size: 0.25rem;
      }
    }
    >ul{
      margin-top: 1rem;
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