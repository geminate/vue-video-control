<!-- 播放/暂停 按钮 -->
<template>
  <div class="play-btn iconfont" @click="onClick" :class="[playStatus ? 'icon-pause':'icon-play']"></div>
</template>

<script>
  export default {
    name: 'PlayBtn',
    props: ['value'],
    data () {
      return {
        playStatus: this.value // 当前是否正在播放
      }
    },
    watch: {
      value (newVal) {
        this.playStatus = newVal
      },
      playStatus (newVal) {
        this.$emit('input', newVal)
      }
    },
    methods: {
      onClick () { // 按钮点击切换播放状态
        this.playStatus = !this.playStatus
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("index.less");
</style>
