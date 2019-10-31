<template>
  <div>
    <div class="loading" v-show="isShow">
      <div>
        <i class="el-icon-loading"></i>
        <p>网速慢！亲，请等待</p>
      </div>
    </div>
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue';
import { Checkbox, CheckboxGroup } from 'vant';
import storage from './model/storage'
Vue.use(Checkbox).use(CheckboxGroup);

export default {
  name: 'App',
  data() {
    return {
      isShow:false
    }
  },
  created() {
    axios.interceptors.response.use((res)=>{ 
      //对响应数据做什么
      this.isShow=false
      return res 
    })
    axios.interceptors.request.use((res)=>{ 
      //发起axios请求之前
      this.isShow=true
      return res 
    })
    this.open()
    let aaa=storage.get('shopping')
    if(aaa){
      this.$store.commit('createaaa',aaa)
    }
  },
  methods: {
    open() {
        this.$message({
          showClose: true,
          message: '李世庚制作',
          type: 'success'
        });
      },
  },
  updated() {
    window.scroll(0,0);
  },
  watch: {
    '$store.state.shop':{
      handler:function(){
        storage.set('shopping',this.$store.state.shop)
      },
      deep:true
    }
  },
}
</script>
<style lang="scss">
*{
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.25rem;
}
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter {
  transform: translateX(100%);
  opacity: 0;
}
.fade-leave-to{
  position: absolute;
  transform: translateX(-100%);
  opacity: 0;
}
.border{
  border-radius: 0.1rem;
}
.loading{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index:10000;
  text-align: center;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  i{
    font-size: 1rem;
    line-height: 100%;
  }
}
</style>
