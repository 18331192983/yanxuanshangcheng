<template>
  <div class="content">
    <div class="fanhui">
      <i class="el-icon-arrow-left" @click="prev"></i>
      <span>我的地址</span>
    </div>
    <div class="list">
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <van-checkbox v-model="item.isDefault" @change="check(index)"></van-checkbox>
          <div>
            <h1>{{item | information}}</h1>
            <p>{{item.address}}</p>
          </div>
          <i class="el-icon-edit-outline" @click="tiao"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Shouye from '../../services/shouye-services'
const _shouye= new Shouye()
import storage from '../../model/storage'
  export default {
     methods: {
      prev(){
        this.$router.go(-1)
      },
      check(index){
        console.log(index)
      },
      //点击跳转添加地址
      tiao(){
        this.$router.push('./update_address')
      }
    },
    data() {
      return {
        list:[],
        checked:true
      }  
    },
    created() {
      this.$store.state.token=storage.get('token')
      let token=this.$store.state.token.token
      _shouye.address(token).then(res=>{
        let {data} =res.data
        this.list=data
      })
    },
    filters:{
      information(val){
        return val.linkMan+'  '+val.mobile
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
  .list{
    width: 100%;
    margin-top: 1rem;
    li{
      height: 1.5rem;
      width: 100%;
      border-top: 0.01rem solid #f0f0f0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      i{
        font-size: 0.5rem;
        color: gray;
      }
    }
  }
}
</style>