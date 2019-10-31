<template>
  <div>
    <div class="header">
      <input type="text" placeholder="搜索商品">
    </div>
    <div class="content">
      <div class="left">
      <ul>
        <li @click="click" :class="{red:this.isUse}">所有分类</li>
        <li v-for="(item,index) in type" :key="index" @click="search(item)" :class="{red:!item.isUse}">{{item.name}}</li>
      </ul>
      </div>
      <div class="right" v-show="isShow">
          <div class="block Block">
            <el-carousel height="2rem">
              <el-carousel-item>
                <img src="../../assets/list1.jpg" alt="" class="small">
              </el-carousel-item>
              <el-carousel-item>
                <img src="../../assets/list2.jpg" alt="" class="small">
              </el-carousel-item>
              <el-carousel-item>
                <img src="../../assets/list3.jpg" alt="" class="small">
              </el-carousel-item>
            </el-carousel>
          </div>
          <ul>
            <router-link tag="li" v-for="(item,index) in list" :key="index" :to="`/classifyTwo/${item.id}`">
              <img :src="item.icon" alt="">
              <p>{{item.name}}</p>
            </router-link>
          </ul>
      </div>
      <div class="right" v-show="!isShow">
          <div class="block Block">
            <el-carousel height="2rem">
              <el-carousel-item>
                <img src="../../assets/list1.jpg" alt="" class="small">
              </el-carousel-item>
              <el-carousel-item>
                <img src="../../assets/list2.jpg" alt="" class="small">
              </el-carousel-item>
              <el-carousel-item>
                <img src="../../assets/list3.jpg" alt="" class="small">
              </el-carousel-item>
            </el-carousel>
          </div>
          <ul>
            <router-link tag="li" v-for="(item,index) in classify" :key="index" :to="`/classifyTwo/${item.id}`">
              <img :src="item.icon" alt="">
              <p>{{item.name}}</p>
            </router-link>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Shouye from '../../services/shouye-services'
const _shouye= new Shouye()
  export default {
    data() {
      return {
        list:[],//分类页的数据
        isShow:true,
        type:[],
        classify:[],
        isUse:true,
      }
    },
    created() {
      _shouye.classify().then((res)=>{
        this.list=res.data.data
        let arr=[]
        arr=this.list.filter((i)=>{
          return !i.type.includes(2)
        })
        this.type=arr
      })
    },
    methods: {
      //模糊搜索
      search(v){
        this.isShow=false
        this.type.forEach((i)=>{
          i.isUse=true
        })
        v.isUse=false
        this.isUse=false
        this.classify=this.list.filter((i)=>{
          return i.type.includes(v.type)
        })
      },
      click(){
        this.isShow=true
        this.isUse=true
        this.type.forEach((i)=>{
          i.isUse=true
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
.header{
  width: 100%;
  height: 0.77rem;
  line-height: 0.77rem;
  input{
    width: 5.2rem;
    height: 0.5rem;
    border-radius: 1rem;
    border: 0rem;
    margin-left: 0.24rem;
    outline: none;
    background: #f5f5f5 url(../../assets/search.jpg) no-repeat 0.3rem;
    background-size: 0.32rem 0.32rem;
    text-indent: 0.7rem;
  }
}
.left{
  width: 1.85rem;
  li{
    width: 100%;
    text-align: center;
    line-height: 0.76rem;
    box-sizing: border-box;
  }
}
.right{
  width: 5.6rem;
  ul{
    width: 100%;
    margin-top: 0.1rem;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    li{
      width: 1.5rem;
      height: 2rem;
      text-align: center;
      img{
        width: 100%;
        height: 1.4rem;
        display: block;
      }
    }
  }
}
.content{
  width: 100%;
  display: flex;
  margin-bottom: 1.2rem;
}
.red{
  color: red;
  border-left: 0.05rem solid red;
}
.block{
  img{
    width: 100%;
    height: 100%;
  }
}
.Block{
  margin-top: 0.3rem;
}
</style>