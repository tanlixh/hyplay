<template>
  <el-carousel :interval="4000" type="card" height="200px" v-if="list!=[]">
    <el-carousel-item v-for="(item,index) in list" :key="index">
      <img :src="item.imageUrl" alt="">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
data() {
    return {
        list:[]
    }
},
created() {
  //发送axios获取轮播数据
  this.$axios({
    url:'/banner',
    params:{
      tt:Math.random()*2000
    }
  }).then(res=>{
    window.console.log(res);
    this.list=res.data.banners;
  })
}
}
</script>

<style>
img{
    width: 100%;
}
</style>