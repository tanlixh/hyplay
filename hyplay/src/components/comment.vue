<template>
  <div class="comment-wrapper" v-if="comm!=[]">
    <div class="items">
      <div class="item" v-for="(item,index) in comm" :key="index">
        <div class="left">
          <img :src="item.user.avatarUrl" alt="">
        </div>
        <div class="right">
          <div class="top">
            <span class='user'>{{item.user.nickname}}:</span>
            <span class='content'>{{item.content}}</span>
          </div>
          <div class="bottom">
            <div class="time">{{item.time | filtime}}</div>
            <div class="like-wrapper">
                <span>👍</span>({{item.likedCount}})
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
data() {
  return {
    comm:[]
  }
},
created() {
  //接收歌曲id
   let id=this.$route.query.id;
   //发送axios获取评论内容
   this.$axios({
     url:'comment/music',
     params:{
       id
     }
   }).then(res=>{
     window.console.log(res);
     this.comm=res.data.comments;
   })
},
filters:{
  //将时间戳通过加工变成可视化时间
  filtime(str){
    var _date=new Date(str);
    var YY=_date.getFullYear();
    var MM=_date.getMonth()+1;
    var DD=_date.getDate();
    var hh=_date.getHours();
    var mm=_date.getMinutes();
    var ss=_date.getSeconds();
    return YY+'年'+MM+'月'+DD+'日 '+hh+':'+mm+':'+ss 
    
    }
}
}
</script>

<style>

</style>