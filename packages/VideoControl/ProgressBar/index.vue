<!-- 视频播放进度条 -->
<template>
  <div class="progress-bar">

    <!-- 视频预览 -->
    <video-preview v-show="showPreview && videoPreviewOptions.show" class="video-preview" :previewX="previewX"
                   :previewPercent="previewPercent"
                   :options="videoPreviewOptions"
    >
    </video-preview>

    <!-- 进度条 -->
    <progress-slider class="progress-slider"
                     :progress="progress"
                     :buffered="buffered"
                     ref="progressSlider"
                     @change="onChange"
                     @mouseleave.native="onMouseLeave"
                     @mousemove.native="onMouseMove"
    >
    </progress-slider>
  </div>
</template>

<script>
  import VideoPreview from './VideoPreview'
  import ProgressSlider from './ProgressSlider'

  export default {
    name: 'ProgressBar',
    components: {
      VideoPreview,
      ProgressSlider
    },
    props: ['progress', 'buffered', 'videoPreviewOptions'], // 视频播放进度 , 视频缓冲进度 , 已播放进度 , 视频预览配置
    data () {
      return {
        showPreview: false, // 是否展示视频预览图
        previewX: 0, // 视频预览x坐标
        previewPercent: 0 // 视频预览百分比进度
      }
    },
    methods: {

      // 鼠标移出事件 隐藏视频预览
      onMouseLeave () {
        this.showPreview = false
      },

      // 鼠标移动事件
      onMouseMove (e) {
        this.showPreview = true
        const { x, width } = this.$refs.progressSlider.$el.getBoundingClientRect()
        let temp = e.clientX - x
        this.previewPercent = temp / width * 100
        if (temp <= 80) {
          temp = 80
        } else if (temp > width - 80) {
          temp = width - 80
        }
        this.previewX = temp
      },

      // 进度条点击、拖动修改视频进度
      onChange (val) {
        this.$emit('change', val)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("index.less");
</style>
