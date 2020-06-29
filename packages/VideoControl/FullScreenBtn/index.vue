<!-- 全屏按钮 -->
<template>
  <div class="full-screen-btn iconfont" :class="[isFullScreen ? 'icon-full-screen-exit':'icon-full-screen-line']"
       @click="onClick"></div>
</template>

<script>
  export default {
    name: 'FullScreenBtn',
    props: ['value'],
    data () {
      return {
        isFullScreen: this.value // 当前是否是全屏状态
      }
    },
    watch: {
      value (newVal) {
        this.isFullScreen = newVal
      },
      isFullScreen (newVal) {
        this.$emit('input', newVal)
      }
    },
    methods: {

      // 监听全屏事件
      initFullScreen () {
        document.addEventListener('fullscreenchange', this.onFullScreenChange)
        document.addEventListener('webkitfullscreenchange', this.onFullScreenChange)
        document.addEventListener('mozfullscreenchange', this.onFullScreenChange)
        document.addEventListener('MSFullscreenChange', this.onFullScreenChange)
      },

      // 进入退出全屏时修改全屏状态
      onFullScreenChange (e) {
        this.isFullScreen = !!document.fullscreenElement
      },

      // 按钮点击切换全屏/非全屏
      onClick () {
        this.isFullScreen = !this.isFullScreen
      },

      // 切换全屏/非全屏，由父组件调用，传入全屏dom
      toggleFullScreen (element) {
        if (!this.isFullScreen) {
          this.exitFullscreen()
        } else {
          this.launchFullscreen(element)
        }
      },

      // 进入全屏
      launchFullscreen (element) {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen()
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullScreen()
        }
      },

      // 退出全屏
      exitFullscreen () {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        }
      }
    },
    mounted () {
      this.initFullScreen()
    }
  }
</script>

<style lang="less" scoped>
  @import url("index.less");
</style>
