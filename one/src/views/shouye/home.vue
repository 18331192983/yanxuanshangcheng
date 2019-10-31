<template>
  <div>
    <Banner></Banner>
     <Nav></Nav>
    <Bargin></Bargin> 
   <Article></Article>
      <Recommend></Recommend>
  </div> 
</template> 

<script>
import Banner from './banner'
import Nav from './nav'
import Bargin from './bargin'
 import Article from './article'
 import Recommend from './recommend'
  export default {
    components:{ 
      Banner,
       Nav,
      Bargin,
       Article,
       Recommend
    }
  }
</script>

<style lang="scss" scoped>

</style>