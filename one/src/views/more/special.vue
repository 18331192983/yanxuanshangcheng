<template>
  <div>
    <div class="special">
      <div>
        <i class="el-icon-arrow-left" @click="prev"></i>
        <span>严选专栏</span>
      </div>
      <ul>
        <router-link v-for="(item,index) in special" :key="index" :to="`/specialTwo/${item.id}`" tag="li">
          <img :src="item.pic" alt="">
          <div class="content">
            <p class="pOne">{{item.title}}</p>
            <p class="pTwo">{{item.descript}}</p>
            <p class="pThree">查看更多</p>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
import Shouye from '../../services/shouye-services'
const _shouye= new Shouye()
  export default {
    data() {
      return {
        special:[]//精选主题
      }
    },
    created() {
      _shouye.article().then((res)=>{
        let {data}=res.data
        this.special=data
      })
    },
     methods: {
      prev(){
        this.$router.go(-1)
      }
    },
  }
</script>

<style lang="scss" scoped>
.special{
   >div{
      height: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      background: #ffffff;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 2;
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
      li{
        width: 6.84rem;
        height: 3.84rem;
        margin: 0.1rem 0.35rem;
        position: relative;
        img{
          width: 100%;
          height: 100%;
        }
        .content{
          width: 5.6rem;
          height: 2.6rem;
          position: absolute;
          left: 0.6rem;
          bottom: 0;
          text-align: center;
          color: white;
          .pOne{
            font-size: 0.35rem;
             overflow:hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
          }
          .pTwo{
            font-size: 0.25rem;
             overflow:hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
            margin-top: 0.4rem;
          }
          .pThree{
            width: 1.5rem;
            height: 0.5rem;
            border: 0.01rem solid white;
            border-radius: 0.5rem;
            text-align: center;
            line-height: 0.5rem;
            margin: 0 auto;
            margin-top: 0.3rem;
          }
        }
      }
    }
}
</style>