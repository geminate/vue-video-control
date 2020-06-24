<!-- 播放时间展示 -->
<template>
  <div class="video-timer">
    {{secondToMinute(currentTime)}} / {{secondToMinute(duration)}}
  </div>
</template>

<script>
  export default {
    name: 'VideoTimer',
    props: ['duration', 'currentTime'],
    methods: {

      // 秒数转为分钟时间显示
      secondToMinute (t) {
        let m = Math.floor(t / 60) + '', s = Math.floor(t % 60) + ''
        m = m.length === 1 ? '0' + m : m
        s = s.length === 1 ? '0' + s : s
        return m + ':' + s
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("index.less");
</style>
