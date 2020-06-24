<!-- 视频预览 -->
<template>
  <div class="video-preview"
       :style="{left: previewX + 'px', backgroundPosition: backgroundPosition, backgroundImage:'url(' + options.imgUrl + ')'}"></div>
</template>

<script>
  export default {
    name: 'VideoPreview',
    props: ['previewX', 'previewPercent', 'options'], // 预览图片放置位置 , 预览进度百分比
    computed: {

      // 背景图片位置
      backgroundPosition () {
        const index = Math.ceil(this.previewPercent / 100 * this.options.totalNum)
        const imgX = index % 10 === 0 ? 9 : index % 10 - 1
        return -imgX * 160 + 'px ' + '0px'
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("index.less");
</style>
