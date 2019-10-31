<template>
  <div class="content">
    <p>
        <i class="el-icon-arrow-left" @click="prev"></i>
        <span>分类商品</span>
    </p>
    <ul v-show="type.length">
      <router-link v-for="(item,index) in type" :key="index" tag="li" :to="{ path:'/detail',query:{id:item.id}}">
        <div @click="dianji(item)">
          <img :src="item.pic" alt="">
          <p class="pOne">{{item.name}}</p>
          <p class="pTwo">{{item.name}}</p>
          <p class="pThree">
          <span class="spanOne">¥{{item.minPrice}}</span>
          <span class="spanTwo">已售{{item.numberSells}}</span>
        </p>
        </div>
      </router-link>
    </ul>
    <div v-show="!type.length">
      <img src="../../assets/cd5.png" alt="">
    </div>
  </div>
</template>

<script>
import More from '../../services/more-services'
const _more= new More()
  export default {
    data() {
      return {
        list:[],
        type:[]
      }
    },
    created() {
      let {id} =this.$route.params
      _more.classifyTwo().then(res=>{
        this.list=res.data.data
        this.type=this.list.filter(i=>{
          return i.categoryId==id
        })
      })
    },
     methods: {
      prev(){
        this.$router.go(-1)
      },
      dianji(item){
        this.$store.commit('spid',item.id)
      }
    },
  }
</script>

<style lang="scss" scoped>
.content{
  >p{
      height: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      position: fixed;
      left: 0;
      top: 0;
      background: #ffffff;
      z-index: 10;
      i{
        position: absolute;
        left: 0.4rem;
        font-size: 0.25rem;
      }
      span{
        font-size: 0.25rem;
      }
    }
    ul{
      margin-top: 1rem;
      width: 100%;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      li{
        >div{
          width: 3.4rem;
        height: 5rem;
        position: relative;
        img{
          width: 100%;
          height: 3.4rem;
        }
        .pOne{
          position: absolute;
          top: 2.76rem;
          left: 0rem;
          background: #f0edd4;
          width: 100%;
          height: 0.66rem;
          text-align: center;
          line-height: 0.66rem;
          color: orange;
          font-size: 0.2rem;
        }
        .pTwo{
          font-size: 0.2rem;
          margin-top: 0.2rem;
        }
        .pThree{
          margin-top: 0.25rem;
          display: flex;
          justify-content: space-between;
          .spanOne{
            font-size: 0.25rem;
            color: #f60707;
          }
          .spanTwo{
            font-size: 0.25rem;
            color: gray;
          }
        }
        }
      }
    }
    >div{
      margin-top: 0.5rem;
      width: 100%;
      text-align: center;
    }
}
</style>