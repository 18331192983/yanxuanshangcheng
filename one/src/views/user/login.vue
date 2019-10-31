<template>
  <div>
    <div class="content">
      <p class="pOne">账号登录</p>
      <div class="phone">
        <input type="text"
               v-model="phone"
               @blur="blur"
               placeholder="手机号码">
        <i class="el-icon-phone"></i>
      </div>
      <div class="phone">
        <input type="password"
               v-model="password"
               placeholder="密码"
               ref="password">
        <i class="el-icon-view"
           @click="text"
           :class="{blue:isShow}"></i>
      </div>
      <div class="login">
        <p class="pTwo"
           @click="denglu(phone,password)">登录</p>
      </div>
      <div class="divOne">忘记密码</div>
      <router-link to="/register"
                   tag="div"
                   class="divTwo">还没有注册？立即注册</router-link>
    </div>
  </div>
</template>

<script>
import Shouye from '../../services/shouye-services'
const _shouye = new Shouye()
import storage from '../../model/storage'
export default {
  data () {
    return {
      phone: '',
      password: '',
      isShow:false
    }
  },
  
  methods: {
    text () {
      if (this.$refs.password.type == "password") {
        this.$refs.password.type = "text"
      } else if (this.$refs.password.type == "text") {
        this.$refs.password.type = "password"
      }
      this.isShow = !this.isShow
    },
    denglu (phone, password) {
      let obj = {
        mobile: phone,
        pwd: password
      }
      _shouye.login(obj).then(res => {
        
        if (res.data.code == 0) {
          this.$router.push('/')
          this.open2()
          let object={
          token:res.data.data.token,
          uid:res.data.data.uid
        }
        storage.set('token',object)
        this.$store.commit('login',object)
        
        } else {
          this.open1()
        }
      })
    },
    //失去焦点事件
    blur(){
      let phone= this.phone
      if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){ 
          this.open()
          return false; 
      } 
    },
    //手机号错误提示
    open() {
        this.$message({
          showClose: true,
          message: '手机号错误',
          type: 'error'
        });
      },
      //手机号密码错误提示
      open1() {
        this.$message({
          showClose: true,
          message: '手机号或密码不对',
          type: 'error'
        });
      },
      //登录成功提示信息
      open2() {
        this.$message({
          showClose: true,
          message: '登录成功',
          type: 'success'
        });
      },
  },
   
  
  
}
</script>

<style lang="scss" scoped>
.content {
  width: 6.68rem;
  margin: 1rem auto;
  height: 7.5rem;
  .pOne {
    font-size: 0.4rem;
    margin-left: 0.6rem;
  }
  .phone {
    width: 5.4rem;
    height: 1rem;
    background: #f5f5f5;
    line-height: 1rem;
    margin: 0.4rem auto;
    input {
      width: 4.5rem;
      height: 0.5rem;
      outline: none;
      margin-left: 0.2rem;
      font-size: 0.25rem;
      background: #f5f5f5;
      border: none;
    }
    i {
      font-size: 0.3rem;
    }
  }
}
.login {
  width: 100%;
  text-align: center;
  .pTwo {
    width: 4.2rem;
    height: 0.8rem;
    background: linear-gradient(to right, #5fa6f8, #b987f6);
    color: white;
    line-height: 0.8rem;
    font-size: 0.35rem;
    margin: 0 auto;
    border-radius: 0.1rem;
  }
}
.divOne {
  width: 100%;
  text-align: center;
  margin-top: 0.3rem;
  font-size: 0.25rem;
}
.divTwo {
  width: 100%;
  text-align: center;
  font-size: 0.3rem;
  color: #60a5f8;
  margin-top: 0.3rem;
}
.blue {
  color: #60a5f8;
}
</style>