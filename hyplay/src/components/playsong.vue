<template>
  <div class="player" v-if="songs!=''">
    <div class="left">
      <img class="disc" src="../assets/img/disc.png" alt />
      <img class="cover autoRotate" :class="{playing:play}" :src="songs.al.picUrl" alt />
    </div>
    <div class="right">
      <div class="title">
        <img src="../assets/img/tag.png" alt />
        <span>{{songs.name}}</span>
      </div>
      <div class="singer">
        歌手:
        <span>{{songs.ar | formatAr}}</span>
      </div>
      <div class="album">
        所属专辑:
        <span>{{songs.al.name}}</span>
      </div>
      <audio class="audio"  ref="audio"  controls :src="curl" @play="playEve" @pause="pauseEve"></audio>
      <ul class="lyric-container"  ref="container">
        <li
          class="lyric"
          v-for="(item, index) in lrc"
          :key="index"
          :class="{colorStyle:currIndex==index}"
        >{{item.split(']')[1]}}</li>
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      curl: "",
      songs: "",
      play: false,
      currentTime: -1,
      lrc: [],
      currIndex: 0,
      timeInter: ""
    };
  },
  created() {
    this.timeInter = window.setInterval(() => {
      if (this.musicUrl != "" && this.$refs.audio.paused == false) {
        let _currentTime = this.$refs.audio.currentTime;
        // 处理出每一句歌词的时间以秒为单位
        let _timeArr = this.lrc.map(item => {
          if (item) {
            let _timeStr = item
              .split("]")[0]
              .split("[")[1]
              .split(":");
            return Number(_timeStr[0]) * 60 + Number(_timeStr[1]);
          } else {
            return 0;
          }
        });
        // 找出时间所对应的歌词的索引
        this.currIndex = _timeArr.findIndex((item, index) => {
          if (
            item < _currentTime &&
            index < _timeArr.length - 1 &&
            _currentTime < _timeArr[index + 1]
          ) {
            return true;
          } else if (item < _currentTime && index == _timeArr.length - 1) {
            return true;
          } else {
            return false;
          }
        });
        this.$refs.container.scrollTop = this.currIndex * 20 - 60;
      }
    }, 1000);
    //获取歌曲id
    let id = this.$route.query.id;
    //发送axios获取歌曲详细数据
    this.$axios({
      url: "song/detail",
      params: {
        ids: id,
        tt: Math.random() * 1000
      }
    }).then(res => {
      window.console.log(res);
      this.songs = res.data.songs[0];
    });
    //发送axios获取歌曲url
    this.$axios({
      url: "/song/url",
      params: {
        id,
        tt: Math.random() * 1000
      }
    }).then(res => {
      window.console.log(res);
      this.curl = res.data.data[0].url;
    });
    //发送axios获取歌词
    this.$axios({
      url: "lyric",
      params: {
        id,
        tt: Math.random() * 1000
      }
    }).then(res => {
      window.console.log(res);
      this.lrc = res.data.lrc.lyric.split("\n");
    });
  },
  beforeDestroy() {
    window.clearInterval(this.timeInter);
  },
  methods: {
    pauseEve() {
      this.play = false;
    },
    playEve() {
      this.play = true;
    }
  },
  filters: {
    formatAr(arr) {
      return arr
        .map(item => {
          return item.name;
        })
        .join(" | ");
    }
  }
};
</script>

<style>
/* 旋转的动画 */
@keyframes Rotate {
  from {
    transform: rotateZ(0);
  }

  to {
    transform: rotateZ(360deg);
  }
}

/* 旋转的类名 */
.autoRotate {
  animation-name: Rotate;
  animation-iteration-count: infinite;
  animation-play-state: paused;
  animation-timing-function: linear;
  animation-duration: 5s;
}

/* 是否正在播放 */
.playing {
  animation-play-state: running;
}
.player .lyric-container {
  width: 100%;
  height: 100px;
  overflow: hidden;
}
.player .lyric-container .lyric {
  height: 20px;
  line-height: 20px;
  margin-top: 0 !important;
}
.player .lyric-container .colorStyle {
  color: red;
}
</style>