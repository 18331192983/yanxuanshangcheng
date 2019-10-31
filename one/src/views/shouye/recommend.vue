<template>
  <div>
     <div class="recommend">
      <div>人气推荐</div>
      <ul>
        <router-link v-for="(item,index) in recommend" :key="index" :to="{ path:'/detail',query:{id:item.id}}" tag="li">
          <div @click="dianji(item)">
            <img :src="item.pic" alt="">
            <h5>{{item.name}}</h5>
            <p class="over">{{item.characteristic}}</p>
            <div>¥{{item.minPrice}}</div>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import Shouye from '../../services/shouye-services'
const _shouye=new Shouye()
  export default {
    data() {
      return {
        recommend:[]//人气推荐
      }
    },
    created() {
      _shouye.recommend().then((res)=>{
        this.recommend=res.data.data.splice(8,4)
      })
    },
    methods: {
      dianji(item){
        this.$store.commit('spid',item.id)
      }
    },
  }
</script>

<style lang="scss" scoped>
.recommend{
   width: 100%;
   height: 12.5rem;
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
        >div{
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
}
.over{
  width: 100%;
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
}
</style>