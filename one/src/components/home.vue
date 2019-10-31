<template>
  <div>
    <el-carousel height="7rem" width="100%">
      <el-carousel-item v-for="(item,key) in banner" :key="key">
        <img :src="item.picUrl" alt="" class="small home-imgOne">
      </el-carousel-item>
    </el-carousel>
    <div class="home-nav">
      <ul>
        <router-link to="" tag="li">
          <img src="../assets/cd1.png" alt="">
          <p>签到</p>
        </router-link>
        <router-link to="" tag="li">
          <img src="../assets/cd2.png" alt="">
          <p>礼券</p>
        </router-link>
        <router-link to="" tag="li">
          <img src="../assets/cd3.png" alt="">
          <p>砍价</p>
        </router-link>
        <router-link to="" tag="li">
          <img src="../assets/cd4.png" alt="">
          <p>专栏</p>
        </router-link>
      </ul>
    </div>
    <div class="home-bargain">
      <div>全民砍价</div>
      <ul>
        <router-link tag="li" to="" v-for="(item,index) in bargain" :key="index">
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
        </router-link>
      </ul>
      <p class="color"></p>
    </div>
    <div class="aaa">
      <div>精选专题</div>
      <div ref="wrapper" class="scroll">
        <ul>
          <li v-for="(item,index) in article" :key="index">
            <img :src="item.pic" alt="">
            <p>{{item.title}}</p>
            <p>{{item.descript}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="recommend">
      <div>人气推荐</div>
      <ul>
        <li v-for="(item,index) in recommend" :key="index">
          <img :src="item.pic" alt="">
          <h5>{{item.name}}</h5>
          <p>{{item.characteristic}}</p>
          <div>¥{{item.minPrice}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
export default {
  
  computed: {
    
  },
  methods: {
    
  },
  data() {
    return {
      banner:[],//轮播图数据
      bargain:[],//砍价的数据
      article:[], //精选专题
      recommend:[]//人气推荐
    }
  },
  created() {
    axios.get("https://api.it120.cc/small4/banner/list").then((res)=>{
      this.banner=res.data.data
    })
    axios.get("https://api.it120.cc/small4/shop/goods/kanjia/list").then((res)=>{
      this.bargain=res.data.data.goodsMap
    })
    axios.get("https://api.it120.cc/small4/cms/news/list").then((res)=>{
      this.article=res.data.data
    })
    axios.get("https://api.it120.cc/small4/shop/goods/list").then((res)=>{
      this.recommend=res.data.data.splice(8,4)
      console.log(this.recommend)
    })
  },
  mounted() {
    this.$nextTick(()=>{
      this.scroll=new BScroll(this.$refs.wrapper,{
            scrollX: true,
            scrollY: false,
      })
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .home-imgOne{
    width: 100%;
    height: 100%;
  }
  .home-nav{
    width: 100%;
    height: 2.4rem;
    background: #f5f5f5;
    ul{
      height: 2.1rem;
      background: white;
      display: flex;
      align-items: center;
      li{
        width: 25%;
        text-align: center;
            img{
          width: 0.8rem;
          height: 0.8rem;
          display: block;
          margin: 0 auto;
        }
      }
    }
  }
  .home-bargain{
    width: 100%;
    >div{
      width: 100%;
      height: 0.96rem;
      line-height: 0.96rem;
      font-size: 0.28rem;
      text-align: center;
      background: url(../assets/bg1.png) no-repeat 4.4rem;
      background-size: 0.32rem 0.32rem;
    }
    >ul{
      height: 7.8rem;
      overflow: hidden;
      >li{
      width: 100%;
      height: 2.6rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-top: 0.01rem solid gray;
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
          margin-top: 0.9rem;
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
  .aaa{
    width: 100%;
    height: 6.57rem;
    >div{
      width: 100%;
      height: 0.96rem;
      line-height: 0.96rem;
      font-size: 0.28rem;
      text-align: center;
      background: url(../assets/bg1.png) no-repeat 4.4rem;
      background-size: 0.32rem 0.32rem;
    }
    >.scroll{
      width: 7.5rem;
      height: 5.3rem;
      overflow: hidden;
      >ul{
        width: 33rem;
        height: 5.3rem;
        display: flex;
        justify-content: space-around;
       >li{
         width: 6.4rem;
         height: 5.3rem;
         >img{
           width: 6.4rem;
           height: 4rem;
         }
         >p{
           line-height: 0.2rem;
           text-align: left;
           overflow:hidden;
           white-space:nowrap;
           text-overflow:ellipsis;
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
.recommend{
   width: 100%;
    >div{
      width: 100%;
      height: 0.96rem;
      line-height: 0.96rem;
      font-size: 0.28rem;
      text-align: center;
      background: url(../assets/bg1.png) no-repeat 4.4rem;
      background-size: 0.32rem 0.32rem;
    }
    ul{
      width: 100%;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      height: 5rem;
      li{
        width: 45%;
        height: 5rem;
        position: relative;
        img{
          width: 100%;
          height: 4.5rem;
        }
        h5{
          position: absolute;
          top: 3.8rem;
          left: 0rem;
        }
        p{
          position: absolute;
          top: 4.1rem;
          left: 0rem;
        }
        div{
          color: red;
        }
      }
    }
}

</style>
