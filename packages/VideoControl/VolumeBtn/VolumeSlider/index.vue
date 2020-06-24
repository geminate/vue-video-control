<!-- 音量滑块 -->
<template>
  <div class="volume-slider" @click="onClick" ref="runWay">
    <div class="slider-progress" :style="{height: progress + '%'}">
      <div class="slider-button" @mousedown="onMouseDown"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VolumeSlider',
    props: ['value'],
    data () {
      return {
        progress: this.value // 当前值
      }
    },
    watch: {
      value (newVal) {
        this.progress = newVal
      },
      progress (newVal) {
        this.$emit('input', newVal)
      }
    },
    methods: {

      // 滑块点击修改当前值
      onClick (e) {
        this.setProgress(e)
      },

      // 鼠标按下事件，开启拖动监听
      onMouseDown (e) {
        window.addEventListener('mousemove', this.onDragging)
        window.addEventListener('mouseup', this.onDragEnd)
      },

      // 鼠标拖动实时调整当前值
      onDragging (e) {
        this.setProgress(e)
      },

      // 拖动结束修改当前值并移除监听
      onDragEnd (e) {
        this.setProgress(e)
        window.removeEventListener('mousemove', this.onDragging)
        window.removeEventListener('mouseup', this.onDragEnd)
      },

      // 设置当前值
      setProgress (e) {
        const { height, top } = this.$refs.runWay.getBoundingClientRect()
        const percent = ((height - e.clientY + top) / height * 100).toFixed(0)
        this.progress = percent > 100 ? 100 : percent < 0 ? 0 : percent
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("index.less");
</style>
