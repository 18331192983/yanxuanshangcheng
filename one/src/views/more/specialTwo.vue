<template>
  <div>
    <div class="specialTwo">
      <p>
        <i class="el-icon-arrow-left" @click="prev"></i>
        <span>专栏详情</span>
      </p>
      <div class="content">
        <h1>{{list.title}}</h1>
        <img :src="list.pic" alt="">
        <div v-html="list.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import More from '../../services/more-services'
const _more= new More()
  export default {
    data() {
      return {
        list:[]
      }
    },
    created() {
      let  { id } =this.$route.params
      _more.specialTwo(id).then((res)=>{
        let {data} =res.data
        this.list=data
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
.specialTwo{
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
  .content{
    text-align: center;
    margin-top: 1rem;
    h1{
      font-size: 0.3rem;
    }
    img{
      width: 6.9rem;
      height: 3.5rem;
    }
  }
}
</style>