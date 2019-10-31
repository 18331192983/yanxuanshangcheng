<template>
  <div>
    <el-carousel height="7rem" width="100%">
      <el-carousel-item v-for="(item,key) in banner" :key="key">
        <img :src="item.picUrl" alt="" class="small home-imgOne">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import axios from 'axios'
import Shouye from '../../services/shouye-services'
const _shouye= new Shouye()
  export default {
    data() {
      return {
        banner:[]//轮播图数据
      }
    },
    created() {
      _shouye.banner().then((res)=>{
        let {data}=res.data
        this.banner=data
      })
    },
  }
</script>

<style lang="scss" scoped>
.el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .home-imgOne{
    width: 100%;
    height: 100%;
  }
</style>