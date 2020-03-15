<template>
  <div id="player">
    <h2 class="title">黑云音乐</h2>
    <div class="search">
      <input type="text" v-model="inputValue" @keyup.13="goList" />
      <button @click="goList">
        <span class="iconfont icon-search"></span>
      </button>
    </div>
    <div class="tab-wrapper">
      <!-- 对应的内容区域 -->
      <div class="tab-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>



<script>
export default {
data() {
  return {
    inputValue:''
  }
},
methods: {
  //点击搜索将歌曲名字通过路由发送给songlist组件
  goList(){
    this.$router.push('/songlist?musicname='+this.inputValue)
  }
},
}
</script>

<style>
@import url('./assets/css/iconfont.css');
@import url('./assets/css/index.css');
</style>