<template>
  <div class="content">
    <div class="fanhui">
      <i class="el-icon-arrow-left" @click="prev"></i>
      <span>新增地址</span>
    </div>
    <div class="container">
      <ul>
        <li ref="user">
          <span>联系人</span>
          <input type="text" placeholder="姓名" v-model="user" @blur="blurUser">
        </li>
        <li ref="shouji">
          <span>手机号码</span>
          <input type="text" placeholder="11位手机号码" v-model="phone" @blur="blurPhone" >
        </li>
        <li ref="city">
          <span>选择地区</span>
          <select v-model="sheng" @change="shengfen">
            <option value="">选择省</option>
            <option :value="item.id" v-for="(item,index) in provine" :key="index">{{item.name}}</option>
          </select>
          <select name="" id="" v-model="shi" @click="chengshi">
            <option value="">选择市</option>
            <option v-for="(item,index) in city" :value="item.id" :key="index">{{item.name}}</option>
          </select>
        </li>
        <li ref="address">
          <span>详细地址</span>
          <input type="text" placeholder="街道门牌信息" v-model="address" @blur="blurAddress">
        </li>
        <li ref="mail">
          <span>邮政编码</span>
          <input type="text" placeholder="邮政编码" v-model="mail" @blur="blurMail">
        </li>
      </ul>
      <div @click="add" class="divOne">添加收货地址</div>
      <div class="divTwo">保存</div>
      <div class="divThree">取消</div>
    </div>
  </div>
</template>

<script>
import Shouye from '../../services/shouye-services'
const _shouye = new Shouye()
import storage from '../../model/storage'
  export default {
    data() {
      return {
        user:'',
        phone:'',
        address:'',
        mail:'',
        provine:[],//省数据
        sheng:'',//省份id
        city:[],//市的数据
        shi:'',//市id
      }
    },
    methods: {
      prev(){
        this.$router.go(-1)
      },
      //手机号失去焦点事件
      blurPhone(){
        let phone=this.phone
        if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){ 
          this.$refs.shouji.style.borderBottom=`0.01rem solid red`
          return false; 
       }else{
         this.$refs.shouji.style.borderBottom=`0.01rem solid #1aac19`
       }
      },
      //用户名失去焦点事件
      blurUser(){
        if(this.user==""){
          this.$refs.user.style.borderBottom=`0.01rem solid red`
          return false; 
        }else{
          this.$refs.user.style.borderBottom=`0.01rem solid #1aac19`
        }
      },
      //地址失去焦点事件
      blurAddress(){
        if(this.address==""){
          this.$refs.address.style.borderBottom=`0.01rem solid red`
          return false; 
        }else{
          this.$refs.address.style.borderBottom=`0.01rem solid #1aac19`
        }
      },
      //邮政编码失去焦点事件
      blurMail(){
        let mail=this.mail
        if(!(/[1-9][0-9]{5}/.test(mail))){
          this.$refs.mail.style.borderBottom=`0.01rem solid red`
          return 
        }else{
          this.$refs.mail.style.borderBottom=`0.01rem solid #1aac19`
        }
      },
      // 省份的change事件
      shengfen () {
        _shouye.city(this.sheng).then(res => {
          let { data } = res.data
          this.city = data
        })
        if(this.sheng=="" || this.shi==""){
          this.$refs.city.style.borderBottom=`0.01rem solid red`
          return false; 
        }else{
          this.$refs.city.style.borderBottom=`0.01rem solid #1aac19`
        }
      },
      //城市的change事件
      chengshi(){
          if(this.sheng=="" || this.shi==""){
          this.$refs.city.style.borderBottom=`0.01rem solid red`
          return false; 
        }else{
          this.$refs.city.style.borderBottom=`0.01rem solid #1aac19`
        }
      },
      //添加收货地址
      add(){
        this.$store.state.token=storage.get('token')
        let obj={
          address:this.address,
          cityId:this.shi,
          code:this.mail,
          linkMan:this.user,
          mobile:this.phone,
          provinceId:this.sheng,
          token:this.$store.state.token.token
        }
        _shouye.addAddress(obj).then(res=>{
          if(res.data.code==0){
            this.$router.push('/user_address')
            this.open()
          }else{
            this.open1()
          }
        })
      },
      open() {
        this.$message({
          showClose: true,
          message: '添加成功',
          type: 'success'
        });
      },
      //错误的提示信息
      open1() {
        this.$message({
          showClose: true,
          message: '添加失败',
          type: 'error'
        });
      },
    },
    created() {
        _shouye.provine().then(res => {
        let { data } = res.data
        this.provine = data
      })
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
.container{
  width: 100%;
  margin-top: 1rem;
  li{
    height: 1rem;
    width: 7rem;
    margin: 0 auto;
    border-bottom: 0.01rem solid #f0f0f0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    
    span{
      width: 1.6rem;
      display: inline-block;
    }
    input{
      outline: none;
      border: none;
    }
  }
}
    .divOne{
      width: 7rem;
      margin: 0 auto;
      background: #1aac19;
      border-radius: 0.1rem;
      line-height: 1rem;
      color: white;
      text-align: center;
    }
    .divTwo{
      width: 7rem;
      margin: 0 auto;
      background: #e64240;
      border-radius: 0.1rem;
      line-height: 1rem;
      color: white;
      text-align: center;
      margin-top: 0.1rem;
    }
    .divThree{
      width: 7rem;
      margin: 0 auto;
      background: #dddddd;
      border-radius: 0.1rem;
      line-height: 1rem;
      color: white;
      text-align: center;
      margin-top: 0.1rem;
    }
</style>