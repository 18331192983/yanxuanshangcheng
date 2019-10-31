<template>
  <div>
    <transition name="fade">
      <router-view/>
    </transition>
    <ul class="footer">
      <router-link tag="li" to="/" exact active-class="red">
       <i class="el-icon-s-home"></i>
       <p>首页</p>
      </router-link>
      <router-link tag="li" to="/classify" active-class="red">
        <i class="el-icon-suitcase-1"></i>
        <p>分类</p>
      </router-link>
      <router-link tag="li" to="/cart" active-class="red">
        <i class="el-icon-shopping-cart-2"></i>
        <span class="num">{{num}}</span>
        <p>购物车</p>
      </router-link>
      <router-link tag="li" to="/user" active-class="red">
        <i class="el-icon-user"></i>
        <p>个人</p>
      </router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    computed: {
       //计算数量
      num(){
        return this.$store.getters.num
      }
    },
  }
</script>

<style lang="scss" scoped>
.footer{
  width: 100%;
  height: 1.3rem;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0rem;
  background: #ffffff;
  z-index: 99;
  border-top: 0.01rem solid #f0f0f0;
  li{
    width: 25%;
    text-align: center;
    i{
      font-size: 0.5rem;
    }
    .num{
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 100%;
      background: red;
      text-align: center;
      line-height: 0.4rem;
      color: white;
      display: inline-block;
      position: absolute;
      left: 4.9rem;
    }
  }
}
.red{
  color: red;
}
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter {
  transform: translateX(100%);
  opacity: 0;
}
.fade-leave-to{
  position: absolute;
  transform: translateX(-100%);
  opacity: 0;
}
</style>