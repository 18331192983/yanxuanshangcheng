<template>
  <div>
    <p class="pOne" ><i tag="i"  class="el-icon-arrow-left" @click="prev"></i></p>
    <div class="jifen">
      <p>您的可用积分为</p>
      <h1>999</h1>
    </div>
    <div class="color"></div>
    <div class="qiandao">
      <div class="divOne"><span>签到</span></div>
      <div class="divTwo">
        <div>
          <div>
            <p class="pTwo">消费购物</p>
            <p class="pThree">购物完成，确认收货后立即返积分</p>
          </div>
          <div class="divFor">去购物</div>
        </div>
      </div>
      <router-link class="divTwo" tag="div" to="/gift">
        <div>
          <div>
            <p class="pTwo">积分兑换</p>
            <p class="pThree">积分兑好礼,20积分即可兑换礼券</p>
          </div>
          <div class="divFor">去兑换</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      prev(){
        this.$router.go(-1)
      }
    },
  }
</script>

<style lang="scss" scoped>
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
.jifen{
  width: 100%;
  height: 4.23rem;
  background: #f3ecdc;
  text-align: center;
  p{
    padding-top: 1.7rem;
    font-size: 0.3rem;
    color: #9a9a9a;
  }
  h1{
    margin-top: 0.7rem;
    font-size: 0.37rem;
    color: #b4a17a;
  }
}
.color{
  height: 1.3rem;
  width: 100%;
  background: #e8e1cf;
}
.qiandao{
  width: 7.5rem;
  height: 6.2rem;
  .divOne{
    width: 3.2rem;
    height: 0.7rem;
    border-radius: 1rem;
    background: #b3a078;
    margin: 0 auto;
    font-size: 0.35rem;
    color: white;
    text-align: center;
    margin-top: 0.5rem;
    span{
      font-size: 0.3rem;
      line-height: 0.7rem;
      display: inline-block;
    }
  }
  .divTwo{
    width: 6.9rem;
    height: 1.6rem;
    background: #f4ebe2;
    border-radius: 0.2rem;
    margin: 0 auto;
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    >div{
      width: 5.3rem;
      height: 0.8rem;
      display: flex;
      justify-content: space-between;
      .pTwo{
        font-size: 0.3rem;
        color: #e7c7a7;
      }
      .pThree{
        font-size: 0.2rem;
        margin-top: 0.1rem;
        color: #e7c7a7;
      }
      .divFor{
        background: #e1b68c;
        width: 0.9rem;
        height: 0.5rem;
        text-align: center;
        line-height: 0.5rem;
        color: white;
        border-radius: 0.1rem;
      }
    }
  }
}
</style>