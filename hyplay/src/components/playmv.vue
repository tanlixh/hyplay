<template>
    <!-- 避免获取数据时的异步时差导致渲染空数据 -->
    <div class="video" v-if="deta!=''">
    <div class="title-wrapper">
      <span class='tag'>MV</span>
      <span class='title'>{{deta.name}}</span>
      <span class='artist'>{{deta.artists|formatAr}}</span>
    </div>
    <video :src="deta.brs | filterMv" controls autoplay></video>
  </div>
</template>

<script>
export default {
data() {
  return {
    deta:''
  }
},
created() {
  //接受歌曲列表传送过来的mvid
  let mvid=this.$route.query.mvid;
  //发送axios获取mv数据
  this.$axios({
    url:'/mv/detail',
    params:{
      mvid,
      tt:Math.random()*1000
    }
  }).then(res=>{
    window.console.log(res);
    this.deta=res.data.data;
  })
},
filters:{
  //过滤展示多个作者名字
  formatAr(arr){
     return arr.map(item=>{
       return item.name
     }).join(' | ');
  },
  //过滤加工展示最高画质mv
  filterMv(obj){
    let _h=0;
    for(var key in obj){
      //key为属性字符串
      //字符串之间比较大小时从第一个字符开始比较
      //所以需要隐式转为数字之间比较
      if(_h<+key){
         _h=key
      }
    }
    return obj[_h];
  }

}
}
</script>

<style>

</style>