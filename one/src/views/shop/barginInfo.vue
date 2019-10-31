<template>
  <div>
    <div class="box">
      <p class="pOne" @click="prev"><i class="el-icon-arrow-left"></i></p>
      <div class="user">
        <i class="el-icon-user"></i>
      </div>
      <div class="title">我发现一件好货，来帮我砍到最低价吧~</div>
      <div class="content">
        <img :src="list.pic" alt="" class="left">
        <div class="right">
          <h1>{{list.name}}</h1>
          <div class="divOne">
            <span class="spanOne">底价¥{{list.minPrice}}</span>
            <span class="spanTwo">原价{{list.originalPrice}}</span>
          </div>
        </div>
      </div>
      <div class="kanjia">
        <div class="kanjia-top" v-for="(item,index) in kanjia" :key="index">
          当前价<span class="spanOne">{{list.originalPrice-rmb}}</span>元,以砍<span class="spanOne">{{item.cutPrice}}</span>元
        </div>
        <div class="kanjia-center">
          <span class="spanOne" v-show="!kanjia.length" @click="kan">自己先砍一刀</span> 
          <span class="spanOne" v-show="kanjia.length">已当前价格购买</span>
          <span class="spanTwo">邀请好友砍价</span>
        </div>
        <div class="kanjia-bottom">
          <span class="spanOne">09</span> :
          <span class="spanOne">08</span> :
          <span class="spanOne">07</span> :
          <span class="spanOne">06</span>
        </div>
      </div>
      <div class="haoyou">{{kanjia.length}}名好友帮砍</div>
      <div class="bangkan" v-for="(item,index) in kanjia" :key="index">
        <div>
          <img src="../../assets/cd2.png" alt="">
          <span>{{item.dateAdd}}</span>
        </div>
        <p>砍掉{{item.cutPrice}}元</p>
      </div>
    </div>
  </div>
</template>

<script>
import storage from '../../model/storage'
import Shouye from '../../services/shouye-services'
const _shouye= new Shouye()
import Shop from '../../services/shop-services'
const _shop = new Shop()
  export default {
    data() {
      return {
        list:{},
        kanjia:[]
      }
    },
    created() {
      this.$store.state.token=storage.get('token')
      let obj={
        kjid:this.$store.state.kjiD,
        joiner:this.$store.state.token.uid
      }
      console.log(obj)
      _shouye.kanjia(obj).then(res=>{
        this.kanjia=res.data.data.helps
        console.log(res)
      })
      _shop.detail(this.$store.state.spid).then(res=>{
        this.list=res.data.data.basicInfo
        console.log(res)
        console.log(this.$store.state.spid)
      })
    },
    methods: {
      prev(){
        this.$router.go(-1)
      },
      kan(){
        let obj={
          token:this.$store.state.token.token,
          kjid:this.$store.state.kjiD,
          joinerUser:this.$store.state.token.uid
        }
        _shouye.kanyidao(obj).then(res=>{
          this.$router.push('./kongbai')
        })
      }
    },
    computed: {
      rmb(){
        let rmb=0;
        this.kanjia.forEach((i)=>{
          rmb+=i.cutPrice
        })
        return rmb
      }
    },
  }
</script>

<style lang="scss" scoped>
.box{
  width: 7.5rem;
  height: 8rem;
  background: #cebe9c;
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
   .user{
    width: 1.55rem;
    height: 1.55rem;
    background: #ffffff;
    border-radius: 100%;
    line-height: 2.15rem;
    text-align: center;
    margin-left: 0.25rem;
    position: absolute;
    top: 0.7rem;
    left: 2.8rem;
    i{
      font-size: 1rem;
    }
  }
  .title{
    width: 100%;
    color: white;
    font-size: 0.25rem;
    text-align: center;
    padding-top: 2.5rem;
  }
  .content{
  width: 6.6rem;
  height: 1.85rem;
  border-radius: 0.1rem;
  background: #f6edde;
  margin: 0 auto;
  margin-top: 0.3rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
    .left{
      width: 1.23rem;
      height: 1.54rem;
    }
    .right{
      width: 3.64rem;
      height: 1.3rem;
      .divOne{
        margin-top: 0.3rem;
        .spanOne{
          color: #b19a73;
          font-size: 0.25rem;
        }
        .spanTwo{
          color: gray;
          margin-left: 0.8rem;
          text-decoration: line-through;
          font-size: 0.25rem
        }
      }
    }
  }
}
.kanjia{
  width: 100%;
  text-align: center;
  height: 3.2rem;
  color: white;
  .kanjia-top{
    height: 1.16rem;
    line-height: 1.16rem;
    .spanOne{
          font-size: 0.25rem;
        }
  }
  .kanjia-center{
    .spanOne{
      width: 3rem;
      height: 0.88rem;
      line-height: 0.88rem;
      background: #b0a48c;
      display: inline-block;
      text-align: center;
      border-radius: 0.1rem;
    }
    .spanTwo{
      width: 2rem;
      height: 0.88rem;
      border: 0.01rem solid #b0a48c;
      display: inline-block;
      line-height: 0.88rem;
      border-radius: 0.1rem;
    }
  }
  .kanjia-bottom{
    margin-top: 0.2rem;
    width: 100%;
    .spanOne{
      width: 0.45rem;
      height: 0.45rem;
      background: #b3a078;
      color: white;
      border-radius: 0.1rem;
      display: inline-block;
      margin-left: 0.1rem;
      text-align: center;
      line-height: 0.45rem;
    }
  }
}
.haoyou{
  width: 100%;
  height: 0.4rem;
  line-height: 0.4rem;
  text-align: center;
  font-size: 0.25rem;
}
.bangkan{
  width: 7.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  div{
    display: flex;
    align-items: center;
  }
  p{
    font-size: 0.3rem;
  }
}
</style>