<template>
  <div>
    <div class="aaa">
      <router-link to="special" tag="p">精选专题</router-link>
      <div ref="wrapper" class="scroll">
        <ul>
          <router-link v-for="(item,index) in article" :key="index" tag="li" :to="`/specialTwo/${item.id}`">
            <img :src="item.pic" alt="">
            <p>{{item.title}}</p>
            <p>{{item.descript}}</p>
          </router-link>
        </ul>
      </div>
    </div>
    <p class="color"></p>
  </div>
</template>

<script>
import Shouye from '../../services/shouye-services'
const _shouye= new Shouye()
// import BScroll from 'better-scroll'
  export default {
    data() {
      return {
        article:[]//精选主题
      }
    },
    created() {
      _shouye.article().then((res)=>{
        let {data}=res.data
        this.article=data
      })
    },
    // mounted() {
    //       this.$nextTick(()=>{
    //       this.scroll=new BScroll(this.$refs.wrapper,{
    //             scrollX: true,
    //             scrollY: false,
    //       })
    //     })
    //   }
    
  }
</script>

<style lang="scss" scoped>
.aaa{
    width: 100%;
    height: 5.97rem;
    >p{
      width: 100%;
      height: 0.96rem;
      line-height: 0.96rem;
      font-size: 0.28rem;
      text-align: center;
      background: url(../../assets/bg1.png) no-repeat 4.4rem;
      background-size: 0.32rem 0.32rem;
    }
    >.scroll{
      width: 7.5rem;
      height: 5.3rem;
      overflow: auto;
      >ul{
        width: 33rem;
        height: 5.3rem;
        display: flex;
        justify-content: space-around;
       >li{
         width: 6.4rem;
         height: 5.3rem;
         >img{
           width: 6.4rem;
           height: 4rem;
         }
         >p{
           font-size: 0.2rem;
           line-height: 0.5rem;
           overflow:hidden;
           white-space:nowrap;
           text-overflow:ellipsis;
         }
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