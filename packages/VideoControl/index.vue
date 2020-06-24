<!-- 视频播放组件 -->
<template>
  <div class="video-control" ref="videoControl">

    <!-- loading 标识 -->
    <div class="loading" v-show="showLoading"></div>

    <!-- 视频主体 -->
    <video ref="video"
           :autoplay="opt.autoplay"
           preload="auto"
           :poster="opt.poster"
           :src="opt.src"
           @loadstart="onLoadStart"
           @canplay="onCanPlay"
           @durationchange="onDurationChange"
           @timeupdate="onTimeUpdate"
           @play="onPlay"
           @pause="onPause"
           @progress="onProgress"
           @playing="onPlaying"
           @waiting="onWaiting"
           @seeking="onSeeking"
           @seeked="onSeeked"
    >
    </video>

    <!-- 控制组件 -->
    <div class="control-container" v-if="opt.control.show">

      <!-- 高能进度条 -->
      <focus-preview v-if="opt.control.focusPreview.show"
                     :curveData="opt.control.focusPreview.data"
                     :playedDuration="playedDuration">
      </focus-preview>

      <!-- 进度条 -->
      <progress-bar class="progress-bar"
                    :progress="timeProcess"
                    @change="setCurrentTime"
                    :buffered="buffered"
                    :videoPreviewOptions="opt.control.videoPreview">
      </progress-bar>

      <!-- 播放按钮 -->
      <play-btn class="play-btn" v-model="playStatus"></play-btn>

      <!-- 时间显示 -->
      <video-timer class="video-timer"
                   v-if="opt.control.videoTimer.show"
                   :duration="duration"
                   :currentTime="currentTime">
      </video-timer>

      <div style="flex:1 1 auto"></div>

      <!-- 播放速率 -->
      <speed-btn class="speed-btn"
                 v-if="opt.control.speedBtn.show"
                 :speedArray="opt.control.speedBtn.speedArray"
                 v-model="playSpeed">
      </speed-btn>

      <!-- 音量调整 -->
      <volume-btn class="volume-button"
                  v-if="opt.control.volumeBtn.show"
                  v-model="volume">
      </volume-btn>

      <!-- 全屏按钮 -->
      <full-screen-btn v-if="opt.control.fullScreenBtn.show"
                       class="full-screen-btn"
                       ref="fullScreenBtn"
                       v-model="isFullScreen">
      </full-screen-btn>
    </div>
  </div>
</template>

<script>
  import FocusPreview from './FocusPreview'
  import PlayBtn from './PlayBtn'
  import VideoTimer from './VideoTimer'
  import ProgressBar from './ProgressBar'
  import SpeedBtn from './SpeedBtn'
  import VolumeBtn from './VolumeBtn'
  import FullScreenBtn from './FullScreenBtn'
  import { handleOptions } from './handleOptions'

  export default {
    name: 'VideoControl',
    components: {
      PlayBtn,
      VideoTimer,
      ProgressBar,
      SpeedBtn,
      VolumeBtn,
      FullScreenBtn,
      FocusPreview
    },
    props: ['options'],
    data () {
      return {
        opt: {},
        duration: 0, // 视频总秒数
        currentTime: 0, // 当前播放秒数
        playStatus: false, // 视频是否正在播放
        isFullScreen: false, // 当前是否是全屏播放
        volume: 80, // 音量大小
        playSpeed: 1, // 播放速率
        timeProcess: 0, // 当前播放进度占总长的的百分比
        buffered: 0, // 缓冲时长
        showLoading: false, // 是否加载中
        playedDuration: { // 高能进度条上展示的 已播放进度
          playedArray: [], // 已播放进度
          playingDuration: [0, 0], // 当前最新播放段进度
          startTemp: 0
        },
        isSeeking: false // 是否正在跳转
      }
    },
    watch: {

      // 全屏切换
      isFullScreen () {
        this.$refs.fullScreenBtn && this.$refs.fullScreenBtn.toggleFullScreen(this.$refs.videoControl)
      },

      /// 播放 / 暂停 切换
      playStatus (val) {
        val ? this.$refs.video.play() : this.$refs.video.pause()
      },

      // 音量调整
      volume (val) {
        this.$refs.video.volume = val / 100
      },

      // 播放速度调整
      playSpeed (val) {
        this.$refs.video.playbackRate = val
      }
    },
    methods: {
      refreshOptions () {
        this.opt = handleOptions(this.options)
      },

      // 视频变为播放状态 同步 playStatus
      onPlay () {
        this.playStatus = true
      },

      // 视频变为暂停状态 同步 playStatus
      onPause () {
        this.playStatus = false
      },

      // 视频开始加载 展示loading
      onLoadStart () {
        this.showLoading = true
      },

      // 视频最初加载完成 隐藏loading
      onCanPlay () {
        this.showLoading = false
      },

      // 视频播放中由于网络原因阻塞 展示loading
      onWaiting () {
        this.showLoading = true
      },

      // 缓冲后准备重新开始播放 隐藏loading
      onPlaying () {
        this.showLoading = false
      },

      // 视频下载中 更新缓冲进度
      onProgress () {
        this.setBuffered()
      },

      // 视频总时长变化事件 修改显示视频总时长
      onDurationChange () {
        this.duration = this.$refs.video.duration
      },

      // 手动跳转开始事件 修改标志符并将跳转前播放过的进度加入已播放进度数组
      onSeeking () {
        this.isSeeking = true
        this.addPlayedArray()
      },

      // 手动跳转完成事件 修改标识符并修改本次播放开始时间
      onSeeked () {
        this.isSeeking = false
        this.playedDuration.startTemp = this.currentTime
      },

      // 当前播放时间变化事件 修改显示时间、播放进度百分比、刷新当前播放段进度
      onTimeUpdate () {
        this.currentTime = this.$refs.video.currentTime
        this.timeProcess = (this.$refs.video.currentTime / this.$refs.video.duration) * 100
        this.refreshPlayingDuration()
      },

      // 添加已播放进度数组
      addPlayedArray () {
        const x = this.playedDuration.startTemp / this.duration * 100
        const width = this.currentTime / this.duration * 100 - x
        this.playedDuration.playedArray.push([x, width])
      },

      // 刷新当前播放段进度
      refreshPlayingDuration () {
        const x = this.isSeeking ? (this.currentTime / this.duration * 100) : (this.playedDuration.startTemp / this.duration * 100)
        const width = this.currentTime / this.duration * 100 - x
        this.playedDuration.playingDuration = [x, width]
      },

      // 设置视频缓冲进度
      setBuffered () {
        this.buffered = 0
        let length = this.$refs.video.buffered.length, re = 0
        while (length > 0 && this.$refs.video.buffered.end(length - 1) > this.currentTime) {
          re = this.$refs.video.buffered.end(length - 1)
          length--
        }
        this.buffered = this.duration === 0 ? 0 : re / this.duration * 100
      },

      // 设置视频当前播放时间
      setCurrentTime (val) {
        this.timeProcess = val
        this.$refs.video.currentTime = (this.$refs.video.duration * val) / 100
      }
    },
    created () {
      this.opt = handleOptions(this.options)
    }
  }
</script>

<style lang="less" scoped>
  @import url("index.less");
</style>
