<template>
  <div>
    <p class="pOne"><i tag="i"
         class="el-icon-arrow-left"
         @click="prev"></i></p>
    <img src="../../assets/lunbo3.jpg"
         alt=""
         class="images">
    <div class="Input">
      <input type="text">
      <p>兑换</p>
    </div>
    <div class="card">
      <div class="price">
        <div class="divOne">1<span>元</span></div>
        <div class="divTwo">
          <p>满减1</p>
          <p>满100元使用</p>
        </div>
        <div class="divThree">
          立即领取
        </div>
      </div>
      <div class="footer">
        领取7天内有效
      </div>
    </div>
    <div class="card">
      <div class="price">
        <div class="divOne">0<span>元</span></div>
        <div class="divTwo">
          <p>满减</p>
          <p>满10元使用</p>
        </div>
        <div class="divThree">
          立即领取
        </div>
      </div>
      <div class="footer">
        领取7天内有效
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    prev () {
      this.$router.go(-1)
    }
  },
}
</script>

<style lang="scss" scoped>
.pOne {
  position: fixed;
  top: 0.5rem;
  left: 0.5rem;
  border-radius: 100%;
  background: #f0f0f0;
  z-index: 100;
  i {
    font-size: 0.3rem;
    color: black;
  }
}
.images {
  width: 7.5rem;
  height: 3rem;
}
.Input {
  width: 6.78rem;
  height: 1.76rem;
  margin: 0 auto;
  border: 0.01rem solid orange;
  display: flex;
  justify-content: space-around;
  align-items: center;
  input {
    width: 4.5rem;
    height: 0.6rem;
    border: 0.01rem solid orange;
    outline: none;
  }
  p {
    width: 1.2rem;
    height: 0.6rem;
    text-align: center;
    color: white;
    background: #ec7877;
    line-height: 0.6rem;
    border-radius: 0.1rem;
  }
}
.card{
  width: 7rem;
  height: 2.4rem;
  background: #ec7877;
  border-radius: 0.1rem;
  margin: 0 auto;
  margin-top: 0.4rem;
  color: white;
  padding-top: 0.4rem;
  position: relative;
  .price{
    margin: 0 auto;
    width: 6.4rem;
    height: 1.2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .divOne{
      font-size: 0.3rem;
    }
    .divTwo{
      p{
        line-height: 0.6rem;
        font-size: 0.3rem;
      }
    }
    .divThree{
      width: 1.4rem;
      height: 0.5rem;
      background: rgba(255, 255, 255, 0.5);
      color: white;
      border-radius: 0.1rem;
      line-height: 0.5rem;
      text-align: center;
    }
  }
  .footer{
    height: 0.6rem;
    width: 6.9rem;
    background: #cc7773;
    position: absolute;
    bottom: 0rem;
    border-radius: 0 0 0.1rem 0.1rem;
    line-height: 0.6rem;
    padding-left: 0.1rem;
  }
}
</style>