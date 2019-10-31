<template>
  <div class="content">
    <div class="header" v-show="shop.length">
      <p v-show="isShow" class="pOne" @click="bianji">编辑</p>
      <p v-show="!isShow" class="pOne" @click="wancheng">完成</p>
      <p>购物车</p>
    </div>
    <div class="header" v-show="!shop.length">
      <p class="pTwo">购物车</p>
    </div> 
    <div class="list" v-show="shop.length">
      <ul>
        <li v-for="(item,index) in shop" :key="index">
          <van-checkbox v-model="item.checked" @change="checked"></van-checkbox>
          <img :src="item.pic" alt="">
          <div class="information">
            <h1>{{item.name}}</h1>
            <p>{{item | user}}</p>
            <div>
              <p class="pOne">¥{{item.price}}</p>
              <p class="pTwo">
                <span class="spanOne" @click="jian(index)" :class="{gray:item.num==1}">-</span>
                <span class="spanTwo">{{item.num}}</span>
                <span @click="jia(index)" class="spanThree">+</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="wu" v-show="!shop.length">
      <i class="el-icon-shopping-cart-full"></i>
      <p>去添加点什么吧</p>
    </div>
    <div class="recommend">
      <div>猜你喜欢</div>
      <ul>
        <router-link v-for="(item,index) in recommend" :key="index" :to="{ path:'/detail',query:{id:item.id}}" tag="li">
          <img :src="item.pic" alt="">
          <h5>{{item.name}}</h5>
          <p class="over">{{item.characteristic}}</p>
          <div>¥{{item.minPrice}}</div>
        </router-link>
      </ul>
    </div>
    <div class="tishi" v-show="bool">
      <div>
        <h1>错误</h1>
        <p>请选择商品</p>
        <h2 @click="tishi">确定</h2>
      </div>
    </div>
    <div class="footer" v-show="shop.length">
      <p><van-checkbox v-model="All.allchecked" @input="all">全选</van-checkbox></p>
      <p class="heji">合计¥{{price}}</p>
      <p v-show="isShow" class="pOne" @click="xiadan">下单</p>
      <p v-show="!isShow" class="pOne" @click="del">删除</p>
    </div>
  </div>
</template>

<script>
import Shouye from '../../services/shouye-services'
const _shouye=new Shouye() 
import storage from '../../model/storage'
  export default {
    data() {
      return {
        isShow:true,
        recommend:[],//人气推荐
        bool:false
      }
    },
    computed: {
      shop(){
        return this.$store.state.shop
      },
      // 计算价钱
      price(){
        return this.$store.getters.price
      },
     //
     All(){
       return this.$store.state.aaa
     }
    },
    filters:{
      user(val){
        return val.chicun+val.color
      }
    },
    methods: {
      //编辑的点击事件
      bianji(){
        this.isShow=false
        this.shop.forEach((i)=>{
          i.checked=false
        })
      },
      //完成的点击事件
      wancheng(){
        this.isShow=true
        this.shop.forEach((i)=>{
          i.checked=true
        })
      },
      //减点击事件
      jian(index){
        this.$store.commit('jian',index)
      },
      //加点击事件
      jia(index){
        this.$store.commit('jia',index)
      },
      //删除的点击事件
      del(){
        this.$store.commit('del')
      },
      //复选框的change事件
      checked(){
        this.$store.commit('checked')
      },
      //全选的change事件
      all(){
        this.$store.commit('bbb')
      },
      //下单的点击事件
      xiadan(){

        if(this.$store.state.token){
          this.shop.forEach((i)=>{
          if(i.checked==false){
            this.bool=true
            return
          }else{
            this.$router.push('/purchase')
          }
        })
        }else{
          this.$router.push('/login')
        }
        
        
      },
      //关闭提示信息
      tishi(){
        this.bool=false
      }
    },
    created() {
      let num=parseInt(Math.random()*24)
      _shouye.recommend().then((res)=>{
        this.recommend=res.data.data.splice(num,4)
      })
      this.$store.state.token=storage.get('token')
    },
  }
</script>

<style lang="scss" scoped>
.content{
  width: 100%;
  .header{
    width: 100%;
    height: 0.8rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    display: flex;
    border-bottom: 0.01rem solid #f0f0f0;
    background: #ffffff;
    p{
      line-height: 0.8rem;
    }
    .pOne{
      width: 3.3rem;
      text-indent: 0.2rem;
      color: red;
    }
    .pTwo{
      width: 100%;
      text-align: center;
    }
  }
}
.list{
  width: 100%;
  margin-top: 0.8rem;
  img{
    width: 1.6rem;
    height: 1.6rem;
    display: block;
  }
  ul{
    width: 100%;
    li{
    height: 2.2rem;
    width: 7rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
      .information{
        width: 4.46rem;
        height: 1.5rem;
        div{
          margin-top: 0.1rem;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .pOne{
            color: red;
          }
          .pTwo{
            width: 2.46rem;
            height: 0.64rem;
            box-sizing: border-box;
            // border: 0.01rem solid gray;
            display: flex;
            border-radius: 0.1rem;
            box-sizing: border-box;
            span{
              width: 0.85rem;
              height: 0.64rem;
              display: block;
              text-align: center;
              line-height: 0.64rem;
              border-top: 0.01rem solid gray;
              border-bottom: 0.01rem solid gray;
            }
            .spanOne{
              border-right: 0.01rem solid gray;
              border-left: 0.01rem solid gray;
              border-radius: 0.1rem 0 0 0.1rem;
            }
            .spanTwo{
              border-right: 0.01rem solid gray;
            }
            .spanThree{
              border-radius: 0 0.1rem 0.1rem 0;
              border-right: 0.01rem solid gray;
            }
            .gray{
              background: #f0f0f0;
            }
          }
        }
      }
    }
  }
}
.footer{
  height: 1rem;
  width: 100%;
  position: fixed;
  bottom: 1.3rem;
  left: 0;
  background: #ffffff;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.2rem;
  .pOne{
    width: 2.4rem;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    color: white;
    background: #b7282e;
  }
  .heji{
    color: red;
  }
}
.wu{
  margin-top: 0.8rem;
  width: 100%;
  height: 4rem;
  text-align: center;
  background: #f0f0f0;
  i{
    font-size: 1rem;
    margin-top: 1.3rem;
  }
}
.recommend{
   width: 100%;
   height: 13.5rem;
    >div{
      width: 100%;
      height: 0.96rem;
      line-height: 0.96rem;
      font-size: 0.28rem;
      text-align: center;
      background: url(../../assets/bg1.png) no-repeat 4.4rem;
      background-size: 0.32rem 0.32rem;
    }
    ul{
      width: 100%;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      height: 10rem;
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
.over{
  width: 100%;
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
}
.tishi{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0rem;
  top: 0rem;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  text-align: center;
  >div{
    width: 6rem;
    height: 4rem;
    background: white;
    margin: 0 auto;
    margin-top: 3rem;
    border-radius: 0.2rem;
    h1{
      padding-top: 1rem;
      font-size: 0.25rem;
    }
    p{
      font-size: 0.25rem;
      margin-top: 0.5rem;
    }
    h2{
      font-size: 0.25rem;
      margin-top: 0.6rem;
      color: #5768e9;
    }
  }
}
</style>