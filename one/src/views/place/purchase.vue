<template>
  <div class="content">
    <div class="fanhui">
      <i class="el-icon-arrow-left" @click="prev"></i>
      <span>确认订单</span>
    </div>
    <router-link class="site" tag="div" to="/user_address">
      <i class="el-icon-location-outline"></i>
      <div>
        <h1>{{list | information}}</h1>
        <p>{{list.address}}</p>
      </div>
      <i class="el-icon-arrow-right"></i>
    </router-link>
    <div class="color"></div>
    <div class="list">
      <p>商品列表</p>
      <ul>
        <li v-for="(item,index) in shop" :key="index">
          <img :src="item.pic" alt="" class="list-left">
          <div class="list-center">
            <h1>{{item.name}}</h1>
            <div>{{item.chicun}}</div>
            <p>{{item.color}}</p>
          </div>
          <div class="list-right">
            <h2>¥{{item.price}}</h2>
            <p>x{{item.num}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="color"></div>
    <div class="peisong">
      <span>配送方式</span>
      <span>快递</span>
    </div>
    <div class="beizhu">
      <p>备注</p>
      <input type="text" placeholder="如需备注请输入">
    </div>
    <div class="color"></div>
    <div class="rmb">
      <span>商品金额</span>
      <span>¥{{price}}</span>
    </div>
    <div class="footer">
      <p>合计¥{{price}}</p>
      <div @click="tijiao">提交订单</div>
    </div>
  </div>
</template>

<script>
import Shouye from '../../services/shouye-services'
const _shouye= new Shouye()
import storage from '../../model/storage'
  export default {
    data() {
      return {
        list:{}
      }
    },
    methods: {
      prev(){
        this.$router.go(-1)
      },
      tijiao(){
         this.$router.push('/payment')
      }
    },
    created() {
      this.$store.state.token=storage.get('token')
      let token=this.$store.state.token.token
      
          _shouye.purchase(token).then(res=>{
        this.list=res.data.data
      })
     
      
    },
    filters:{
      information(val){
        return val.linkMan+val.mobile
      }
    },
    computed: {
      shop(){
        return this.$store.state.shop
      },
      price(){
        return this.$store.getters.price
      }
    },
  }
</script>

<style lang="scss" scoped>
.content{
  width: 100%;
  .fanhui{
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
  }
}
.site{
  width: 100%;
  height: 1.5rem;
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  i{
    font-size: 0.4rem;
    color: gray;
  }
  >div{
    >P{
      margin-top: 0.2rem;
      font-size: 0.16rem;
    }
  }
}
.color{
  width: 100%;
  height: 0.15rem;
  background: #f0f0f0;
}
.list{
  >P{
    line-height: 1rem;
    text-indent: 0.26rem;
    border-bottom: 0.01rem solid #f0f0f0;
  }
  ul{
    width: 6.16rem;
    margin: 0 auto;
    li{
      width: 100%;
      height: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .list-left{
        width: 1.4rem;
        height: 1.6rem;
      }
      .list-center{
        height: 1.22rem;
        div{
          margin-top: 0.4rem;
          color: gray;
        }
        p{
          color: gray;
        }
      }
      .list-right{
        height: 1.22rem;
        p{
          margin-top: 0.4rem;
          color: gray;
        }
      }
    }
  }
}
.peisong{
  margin: 0 auto;
  width: 5.9rem;
  height: 0.8rem;
  border-bottom: 0.01rem solid #f0f0f0;
  line-height: 0.8rem;
  display: flex;
  justify-content: space-between;
}
.beizhu{
  margin: 0 auto;
  width: 5.9rem;
  height: 0.8rem;
  border-bottom: 0.01rem solid #f0f0f0;
  line-height: 0.8rem;
  display: flex;
  p{
    width: 1.46rem;
  }
  input{
    outline: none;
    border: 0rem;
  }
}
.rmb{
   margin: 0 auto;
  width: 5.9rem;
  height: 2rem;
  border-bottom: 0.01rem solid #f0f0f0;
  line-height: 0.8rem;
  display: flex;
  justify-content: space-between;
}
.footer{
  width: 7.5rem;
  height: 1rem;
  display: flex;
  position: fixed;
  bottom: 0;
  z-index: 100;
  background: white;
  p{
    margin-left: 3.3rem;
    width: 2rem;
    color: red;
    line-height: 1rem;
  }
  div{
    width: 2.25rem;
    height: 1rem;
    background: #b7282e;
    color: white;
    text-align: center;
    line-height: 1rem;
  }
}
</style>