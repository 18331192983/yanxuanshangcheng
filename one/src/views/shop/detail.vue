<template>
  <div class="box" v-show="this.size.length">
      <router-link class="pOne" tag="p" to="/"><i  class="el-icon-arrow-left"></i></router-link>
    <div class="block Block">
      <el-carousel height="7.5rem">
        <el-carousel-item v-for="(item,index) in pics" :key="index">
          <img :src="item.pic" alt="" class="small">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="content">
      <p class="pTwo">{{list.characteristic}}</p>
      <p class="pThree">{{list.name}}</p>
      <div class="divOne">
        <p>
          <span class="spanOne">底价¥{{list.minPrice}}</span>
          <span class="spanTwo">原价{{list.originalPrice}}</span>
        </p>
        <p class="pFor">库存{{list.stores}}</p>
      </div>
    </div>
    <div class="color"></div>
    <div class="shop">
      <ul>
        <li @click="jieshao" :class="{red:isShow}">商品介绍</li>
        <li @click="pingjia" :class="{red:!isShow}">商品评价</li>
      </ul>
      <div v-html="html" v-show="isShow">
      </div>
    </div>
    <div v-show="!isShow" class="pinglun">
        <ul>
          <li v-for="(item,index) in evaluate" :key="index">
            <div class="left">
              <i class="el-icon-user"></i>
            </div>
            <div class="right">
              <div class="right-top">
                <p>匿名用户</p>
                <div>{{item.goods.goodReputationStr}}</div>
              </div>
              <div class="right-center">
                {{item.goods.goodReputationRemark}}
              </div>
              <div class="right-bottom">
                <p>{{item.goods.dateReputation}}</p>
                <div>选择规格{{item.goods.goodsName}}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    <div class="footer">
      <ul>
        <li class="liOne">
          <i class="el-icon-service"></i>
        </li>
        <router-link class="liOne" tag="li" to="cart">
          <i class="el-icon-shopping-cart-2"></i>
          <span class="num">{{contunt}}</span>
        </router-link>
        <li class="liOne">
          <i class="el-icon-star-off"></i>
        </li>
        <li class="liTwo">立即购买</li>
        <li class="liThree" @click="cart">加入购物车</li>
      </ul>
    </div>
    <div class="cart" v-show="isHide">
      <div class="content">
          <div class="information">
          <img :src="list.pic">
          <div class="rmb">
            <p>{{list.name}}</p>
            <p class="pTwo">¥{{list.minPrice}}</p>
          </div>
          <div class="close" @click="close">x</div>
        </div>
        <div class="size" v-if="!this.size.length==''">
          <div>{{size[0].name}}</div>
          <ul class="chima">
            <li v-for="(item,index) in size[0].childsCurGoods" :key="index" @click="chima(item,index)" :class="indexOne==index?'hong':''">{{item.name}}</li>
          </ul>
          <div v-if="this.size.length==2">
            <div>{{size[1].name}}</div>
            <ul class="chima">
            <li v-for="(item,index) in size[1].childsCurGoods" :key="index" @click="yanse(item,index)" :class="indexTwo==index?'hong':''">{{item.name}}</li>
          </ul>
          </div>
        </div>
        <div class="num">
          <div>购买数量</div>
          <div class="divTwo">
            <span class="num-span" @click="jian"  :class="{gray:this.num==1}">-</span>
            <span class="num-span">{{num}}</span>
            <span @click="jia">+</span>
          </div>
        </div>
      </div>
      <div class="shopping" @click="add">
        加入购物车
        </div>
    </div>
    <div class="tishi" v-show="bool">
      <div>
        <h1>提示</h1>
        <p>请选择商品规格!</p>
        <h2 @click="tishi">确定</h2>
      </div>
    </div>
  </div>
</template>
<script>
import Shop from '../../services/shop-services'
const _shop = new Shop()
import Shouye from '../../services/shouye-services'
const _shouye= new Shouye()
import storage from '../../model/storage'
  export default {
    data() {
      return {
        list:{},
        pics:[],
        html:[],
        evaluate:[],
        isShow:true,//评价详情的显示隐藏
        isHide:false,//添加购物车的显示隐藏
        size:[],//尺码的数据
        indexOne:-1,
        indexTwo:-1,
        num:1,//购物车的数量
        chicun:'',//获取尺寸
        color:'',//获取颜色
        bool:false, //提示的状态
        chimaId:'',//尺码ID
        colorId:'',
        price:'', //选择尺码价钱
        propertyChildIds:'', //尺寸信息
      }
    },
    created() {
      let { id } = this.$route.query
      _shop.detail(id).then(res=>{
        this.list=res.data.data.basicInfo
        this.pics=res.data.data.pics
        this.html=res.data.data.content
        this.size=res.data.data.properties
        console.log(res)
      })
      _shouye.evaluate(id).then(res=>{
        let {data} =res.data
        this.evaluate=data
      })
      
    },
    methods: {
      jieshao(){
        this.isShow=true
      },
      pingjia(){
        this.isShow=false
      },
      //点击显示购物车
      cart(){
        this.isHide=true
      },
      //点击关闭购物车
      close(){
        this.isHide=false
      },
      // 尺码的点击事件
      chima(item,index){
        this.indexOne=index
        this.chicun=item.name
        this.chimaId=item.id
        let obj={
          goodsId:this.$store.state.spid,
          propertyChildIds:item.id
        }
        // _shouye.chima(obj).then(res=>{
        //   this.price=res.data.data.price
        //   this.propertyChildIds=res.data.data.propertyChildIds
        // })
      },
      //颜色的点击事件
      yanse(item,index){
        this.indexTwo=index
        this.color=item.name
        this.colorId=item.id
      },
      //数量+++
      jia(){
        this.num++
      },
      //数量--
      jian(){
        this.num--
        if(this.num<=1){
          this.num=1
        }
      },
      //加入购物车
      add(){
        if(this.chicun==""){
          this.bool=true
          return 
        }
        if(this.size.length==2){
          if(this.color==""){
            this.bool=true
            return 
          }
        }
        let obj={
          id:this.$store.state.spid,
          chicun:this.chicun,
          color:this.color,
          pic:this.list.pic,
          num:this.num,
          name:this.list.name,
          checked:true,
          price:this.list.minPrice,
          chimaId:this.chimaId,
          colorId:this.colorId,
          propertyChildIds:this.propertyChildIds,
          
        }
        this.$store.commit('add',obj)
        this.isHide=false
        
        this.open()
      },
      //关闭提示信息
      tishi(){
        this.bool=false
      },
      //加入购物车提示消息
        open() {
        this.$message({
          showClose: true,
          message: '添加成功',
          type: 'success'
        });
      },
    },
    computed: {
       //计算数量
      contunt(){
        return this.$store.getters.num
      }
    },
    //监听
  
  }
</script>

<style lang="scss" scoped>
.Block{
  width: 100%;
  height: 7.5rem;
  img{
    width: 100%;
    height: 7.5rem;
  }
}
.box{
  .pOne{
    position: fixed;
    top: 0.5rem;
    left: 0.5rem;
    border-radius: 100%;
    background: #f0f0f0;
    z-index: 100;
    i{
      font-size: 0.3rem;
      color: black;
    }
  }
}
.content{
  width: 7rem;
  height: 2.8rem;
  margin: 0 auto;
  .pTwo{
    font-size: 0.3rem;
    padding-top: 0.4rem;
  }
  .pThree{
    margin-top: 0.4rem;
    font-size: 0.2rem;
    color: gray;
  }
  .divOne{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 0.4rem;
    .spanOne{
      color: red;
      display: inline-block;
      width: 1.3rem;
      font-size: 0.25rem;
    }
    .spanTwo,.pFor{
      color: gray;
      font-size: 0.25rem;
    }
  }
}
.color{
  width: 100%;
  height: 0.2rem;
  background: #f0f0f0;
}
.shop{
  width: 100%;
  ul{
    width: 100%;
    display: flex;
    li{
      width: 50%;
      height: 0.7rem;
      line-height: 0.7rem;
      text-align: center;
      font-size: 0.3rem;
    }
  }
}
.footer{
  width: 100%;
  position: fixed;
  bottom: 0rem;
  height: 1rem;
  background: #ffffff;
  border-top: 0.01rem solid #f0f0f0;
  ul{
    width: 100%;
    height: 1rem;
    display: flex;
    box-sizing: border-box;
    .liOne{
      width: 1rem;
      border-right: 0.01rem solid #f0f0f0;
      text-align: center;
      line-height: 1rem;
      i{
        font-size: 0.45rem;
      }
      .num{
        width: 0.4rem;
        height: 0.4rem;
        background: red;
        text-align: center;
        line-height: 0.4rem;
        color: white;
        border-radius: 100%;
        position: absolute;
        left: 1.6rem;
      }
    }
    .liTwo{
      width: 2.25rem;
      line-height: 1rem;
      text-align: center;
      font-size: 0.25rem;
    }
    .liThree{
      width: 2.25rem;
      line-height: 1rem;
      text-align: center;
      background: red;
      color: white;
      font-size: 0.25rem;
    }
  }
}
.pinglun{
  width: 7.5rem;
  height: 10rem;
  li{
    width: 6.66rem;
    height: 2.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    .left{
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 100%;
      background: #f5f5f5;
      text-align: center;
      line-height: 1.2rem;
      i{
        font-size: 1rem;
      }
    }
    .right{
      width: 5.3rem;
      height: 1.9rem;
      .right-top{
        display: flex;
        width: 1.6rem;
        height: 0.33rem;
        justify-content: space-between;
        align-items: center;
        div{
          width: 0.54rem;
          height: 0.33rem;
          background: red;
          text-align: center;
          line-height: 0.33rem;
          border-radius: 0.05rem;
          color: white;
        }
      }
      .right-center{
        margin-top: 0.25rem;
      }
      .right-bottom{
        margin-top: 0.25rem;
        width: 4.55rem;
        display: flex;
        justify-content: space-between;
      }
    }
   }
}
.red{
  border-bottom: 0.01rem solid red;
}
.cart{
  width: 100%;
  height: 7rem;
  margin: 0 auto;
  background: white;
  position: fixed;
  z-index: 10;
  bottom: 0rem;
  left: 0rem;
  .content{
    width: 6.85rem;
    height: 6.4rem;
    margin: 0 auto;
    .information{
    width: 100%;
    height: 1.75rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img{
      width: 0.97rem;
      height: 1.23rem;
    }
    .rmb{
      height: 1rem;
      .pTwo{
        margin-top: 0.3rem;
        color: red;
        font-size: 0.25rem;
      }
    }
    .close{
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 100%;
      border: 0.01rem solid gray;
      text-align: center;
      line-height: 0.4rem;
      font-size: 0.2rem;
    }
  }
  .size{
    height: 3.8rem;
    width: 100%;
    .chima{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      li{
        width: 2.03rem;
        height: 0.6rem;
        border-radius: 0.1rem;
        border: 0.01rem solid gray;
        text-align: center;
        margin-left: 0.2rem;
        line-height: 0.6rem;
        margin-top: 0.1rem;
      }
      .hong{
          border: 0.01rem solid red;
        }
    }
  }
  .num{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
      .divTwo{
      width: 2.46rem;
      height: 0.64rem;
      box-sizing: border-box;
      border: 0.01rem solid gray;
      display: flex;
      border-radius: 0.1rem;
      span{
        width: 0.86rem;
        height: 0.64rem;
        display: block;
        text-align: center;
        line-height: 0.64rem;
      }
      .num-span{
        border-right: 0.01rem solid gray;
      }
      .gray{
        background: #f0c5c5;
      }
    }
  }
  }
  .shopping{
    width: 100%;
    height: 0.87rem;
    background: red;
    text-align: center;
    color: white;
    font-size: 0.4rem;
  }
}
.tishi{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0rem;
  top: 0rem;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  text-align: center;
  >div{
    width: 6rem;
    height: 4rem;
    background: white;
    margin: 0 auto;
    margin-top: 3rem;
    border-radius: 0.2rem;
    h1{
      padding-top: 1rem;
      font-size: 0.25rem;
    }
    p{
      font-size: 0.25rem;
      margin-top: 0.5rem;
    }
    h2{
      font-size: 0.25rem;
      margin-top: 0.6rem;
      color: #5768e9;
    }
  }
}
</style>