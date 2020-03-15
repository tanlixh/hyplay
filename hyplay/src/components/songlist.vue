<template>
  <div class="result-wrapper" v-if="songlist!=[]">
    <div class="song" v-for="(item, index) in songlist" :key="index" @dblclick="goComment(item.id)">
      <div class="name">
        <span class="iconfont icon-play"></span>
        {{item.name}}
        <span class="iconfont icon-editmedia" v-if="item.mvid!=0" @click="goMv(item.mvid)"></span>
      </div>
      <div class="singer">{{item.artists|formatAr}}</div>
      <div class="album">《{{item.album.name}}》</div>
      <div class="time">{{item.duration|filtime}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songlist: []
    };
  },
  created() {
    //获取前面路由传过来的歌曲名称
    let keyword = this.$route.query.musicname;
    //发送axios获取歌曲列表
    this.$axios({
      url: "/search",
      params: {
        keywords: keyword,
        tt: Math.random() * 1000
      }
    }).then(res => {
      window.console.log(res);
      this.songlist = res.data.result.songs;
    });
  },
  watch: {
    //侦听musicname路由是否改变
    "$route.query.musicname"() {
      //获取修改后的路由传过来的歌曲名称
      let keyword = this.$route.query.musicname;
      //发送axios获取歌曲列表
      this.$axios({
        url: "/search",
        params: {
          keywords: keyword,
          tt: Math.random() * 1000
        }
      }).then(res => {
        window.console.log(res);
        this.songlist = res.data.result.songs;
      });
    }
  },
  filters: {
    //作者过滤器
    formatAr(arr) {
      return arr
        .map(item => {
          return item.name;
        })
        .join(" | ");
    },
    //时间过滤器
    filtime(str) {
      var _m = "000" + Math.floor(str / 1000 / 60);
      var _s = "000" + Math.ceil((str / 1000) % 60);
      return _m.slice(-2) + ":" + _s.slice(-2);
    }
  },
  methods: {
    goComment(id){
      this.$router.push({
        path:'/comment',
        query:{
          id
        }
      })
    },
    goMv(mvid){
      this.$router.push({
        path:'/playmv',
        query:{
          mvid:mvid
        }
      })
    }
  },
};
</script>

<style>
</style>