<template>
  <div>
    <div class="header">
      <div class="user">
        <i class="el-icon-user"></i>
      </div>
      <div class="register">
        <router-link class="pTwo" tag="p" to="/login" v-show="!ken">点击登录</router-link>
        <p v-show="ken">{{ken}}</p>
        <p class="pThree">积分:0</p>
        <p v-show="ken" @click="tuichu">退出登录</p>
      </div>
    </div>
    <div class="hot">新上线更稳定的付费快递查询接口</div>
    <div class="color"></div>
    <div class="order">
      <p class="pOne">
        <i class="el-icon-s-order iOne"></i>
        <span>我的订单</span>
      </p>
      <p>
        <i class="el-icon-arrow-right"></i>
      </p>
    </div>
    <div class="orders">
      <ul>
        <li>
          <img src="../../assets/yanxuan_01.jpg" alt="">
          <p>待付款</p>
        </li>
        <li>
          <img src="../../assets/yanxuan_02.jpg" alt="">
          <p>待发货</p>
        </li>
        <li>
          <img src="../../assets/yanxuan_03.jpg" alt="">
          <p>待收货</p>
        </li>
        <li>
          <img src="../../assets/yanxuan_04.jpg" alt="">
          <p>待评价</p>
        </li>
      </ul>
    </div>
    <div class="color"></div>
    <div class="nav">
      <ul>
        <li>
          <img src="../../assets/yanxuan_05.jpg" alt="">
          <p>我的余额</p>
        </li>
        <li>
          <img src="../../assets/yanxuan_06.jpg" alt="">
          <p>我的砍价</p>
        </li>
        <li>
          <img src="../../assets/yanxuan_07.jpg" alt="">
          <p>我的礼券</p>
        </li>
        <li>
          <img src="../../assets/yanxuan_08.jpg" alt="">
          <p>我的收藏</p>
        </li>
        <li>
          <img src="../../assets/yanxuan_10.png" alt="">
          <p>我的地址</p>
        </li>
        <li>
          <img src="../../assets/yanxuan_09.jpg" alt="">
          <p>联系客服</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import storage from '../../model/storage'
  export default {
    data() {
      return {
      }
    },
    created() {
         this.$store.state.token=storage.get('token')
    },
    computed: {
      ken(){
          if(this.$store.state.token){
            return this.$store.state.token.token
          }
      }
    },
    methods: {
      tuichu(){
        storage.remove('token')
        this.$router.push('/kongbai')
      }
    },
  }
</script>

<style lang="scss" scoped>
.header{
  width: 100%;
  height: 6rem;
  background: #d7c7a6;
  display: flex;
  align-items: center;
  .user{
    width: 1.55rem;
    height: 1.55rem;
    background: #ffffff;
    border-radius: 100%;
    line-height: 2.15rem;
    text-align: center;
    margin-left: 0.25rem;
    i{
      font-size: 1rem;
    }
  }
  .register{
    width: 1.5rem;
    height: 1.2rem;
    margin-left: 0.25rem;
    .pTwo{
      color: white;
      font-size: 0.3rem;
    }
    .pThree{
      width: 1.2rem;
      height: 0.4rem;
      background: #b3a078;
      color: white;
      line-height: 0.4rem;
      margin-top: 0.3rem;
      text-indent: 0.1rem;
      border-radius: 0.1rem;
    }
  }
}
.hot{
  width: 100%;
  height: 0.85rem;
  line-height: 0.85rem;
  color: red;
  text-indent: 0.7rem;
  background: url(../../assets/bg2.png) no-repeat 0.25rem;
  background-size: 0.26rem 0.26rem;
}
.color{
  height: 0.2rem;
  width: 100%;
  background: #f0f0f0;
}
.order{
  height: 1rem;
  width: 6.8rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .pOne{
    display: flex;
    align-items: center;
    i{
      color: orange;
    }
  }
}
i{
  font-size: 0.4rem;
}
.orders{
  width: 100%;
  height: 1.4rem;
  border-top: 0.01rem solid #f0f0f0;
  ul{
    height: 1.4rem;
    display: flex;
    align-items: center;
    li{
      width: 25%;
      text-align: center;
      img{
        width: 0.6rem;
        height: 0.6rem;
        margin: 0 auto;
      }
      p{
        margin-top: 0.15rem;
      }
    }
  }
}
.nav{
  width: 100%;
  height: 4.35rem;
  ul{
    height: 3.35rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    li{
      width: 33.3%;
      text-align: center;
      img{
        width: 0.6rem;
        height: 0.6rem;
        display: block;
        margin: 0 auto;
      }
      p{
        margin-top: 0.15rem;
      }
    }
  }
}
</style>