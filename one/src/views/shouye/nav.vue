<template>
  <div>
    <div class="home-nav">
      <ul>
        <router-link to="/sigin" tag="li">
          <img src="../../assets/cd1.png" alt="">
          <p>签到</p>
        </router-link>
        <router-link to="/gift" tag="li">
          <img src="../../assets/cd2.png" alt="">
          <p>礼券</p>
        </router-link>
        <router-link to="/bargain" tag="li">
          <img src="../../assets/cd3.png" alt="">
          <p>砍价</p>
        </router-link>
        <router-link to="special" tag="li">
          <img src="../../assets/cd4.png" alt="">
          <p>专栏</p>
        </router-link>
      </ul>
    </div>
    <p class="color"></p>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
.home-nav{
    width: 100%;
    height: 2.1rem;
    background: white;
    position: relative;
    border-radius: 20% 20% 0 0;
    top: -0.37rem;
    z-index: 2;
    ul{
      height: 2.1rem;
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
.color{
  width: 100%;
  height: 0.1rem;
  background: #f5f5f5;
}
</style>