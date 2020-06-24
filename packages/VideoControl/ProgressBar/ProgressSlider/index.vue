<!-- 进度条滑块 -->
<template>
  <div class="progress-slider" @click="onClick" ref="runWay">
    <div class="buffered-bar" :style="{width: buffered + '%'}"></div>
    <div class="slider-progress" :style="{width: progressData + '%'}">
      <div class="slider-button" @mousedown="onMouseDown"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProgressSlider',
    props: ['progress', 'buffered'], // 当前视频播放进度 , 已缓冲进度
    data () {
      return {
        progressData: this.progress, // 当前进度条展示进度
        dragging: false // 是否正在拖动滑块
      }
    },
    watch: {
      // 当视频播放进度发生变化且未处于拖动状态时修改滑块位置
      progress () {
        !this.dragging && (this.progressData = this.progress)
      }
    },
    methods: {

      // 滑块点击修改视频播放进度和滑块进度
      onClick (e) {
        this.setProgress(e)
        this.$emit('change', this.progressData)
      },

      // 鼠标按下开启拖动监听
      onMouseDown (e) {
        this.onDragStart(e)
        window.addEventListener('mousemove', this.onDragging)
        window.addEventListener('mouseup', this.onDragEnd)
      },

      // 鼠标按下修改拖动标记
      onDragStart (e) {
        this.dragging = true
      },

      // 拖动时实时修改滑块位置
      onDragging (e) {
        this.setProgress(e)
      },

      // 鼠标放开修改拖动标记并修改视频播放进度，移除监听
      onDragEnd (e) {
        this.setProgress(e)
        this.dragging = false
        this.$emit('change', this.progressData)
        window.removeEventListener('mousemove', this.onDragging)
        window.removeEventListener('mouseup', this.onDragEnd)
      },

      // 修改滑块位置
      setProgress (e) {
        this.progressData = (e.clientX - this.$refs.runWay.getBoundingClientRect().left) / this.$refs.runWay.getBoundingClientRect().width * 100
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("index.less");
</style>
