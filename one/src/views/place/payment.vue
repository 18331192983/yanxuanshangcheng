<template>
  <div class="content">
    <div class="fanhui">
      <i class="el-icon-arrow-left" @click="prev"></i>
      <span>确认订单</span>
    </div>
    <div class="list">
      <ul>
        <li>
          <div class="left">¥</div>
          <div class="right">
            <h1>商品总额：<span>¥{{price}}</span></h1>
            <p>订单编号:{{dingdan}}</p>
          </div>
        </li>
        <li>
          <div class="left">
            <i class="el-icon-map-location"></i>
          </div>
          <div class="right">
            <h1>{{list | information}}</h1>
            <p>{{list.address}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="footer" @click="zhifu">微信支付¥{{price}}</div>
  </div>
</template>

<script>
import Axios from 'axios'
import Qs from 'qs'
import storage from '../../model/storage'
import Shouye from '../../services/shouye-services'
const _shouye= new Shouye()
  export default {
    data() {
      return {
        dingdan:'',
        list:{}
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
    created() {
      this.shop.map((v)=>{
        if(v.checked==true){
          let obj={
            goodsId:v.id,
            number:v.num,
            propertyChildIds:`${v.chimaId},${v.colorId}`,
            logisticsType:0
          }
          let arr=[]
          arr.push(obj)
          this.$store.state.token=storage.get('token')
              let data = {
            token:this.$store.state.token.token,
            goodsJsonStr: JSON.stringify(arr)
          }
           Axios({
            method: 'post',
            url: 'https://api.it120.cc/small4/order/create',
            data: Qs.stringify(data)
          }).then(res=>{
            this.dingdan=res.data.data.orderNumber
          })
        }
      }),
      this.$store.state.token=storage.get('token')
      let token=this.$store.state.token.token
      
          _shouye.purchase(token).then(res=>{
        this.list=res.data.data
      })
    },
    methods: {
      prev(){
        this.$router.go(-1)
      },
      open3() {
        this.$message({
          showClose: true,
          message: '此功能暂时未开通',
          type: 'warning'
        });
      },
      zhifu(){
        this.open3()
      }
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
}
.list{
  margin-top: 1rem;
  width: 100%;
  li{
    height: 1.8rem;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .right{
      width: 4rem;
      span{
        color: #f60707;
      }
    }
  }
  li:nth-child(1){
    .left{
      width: 0.4rem;
      height: 0.4rem;
      border: 0.01rem solid #f60707;
      border-radius: 100%;
      color: #f60707;
      text-align: center;
      line-height: 0.4rem;
      
    }
  }
  li:nth-child(2){
    .left{
      i{
        font-size: 0.4rem;
        color: #3e84d2;
      }
    }
  }
}
.footer{
  width: 100%;
  height: 1rem;
  background: #f60707;
  color: white;
  text-align: center;
  line-height: 1rem;
  position: fixed;
  bottom: 0;
}
</style>