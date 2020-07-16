<!-- 弹幕控制 -->
<template>
  <div class="danmaku-control">
    <input class="danmaku-input" v-model="danmakuText" type="text" placeholder="发个友善的弹幕见证当下"/>
    <div class="send-btn" @click="onSendBtnClick">发送</div>
  </div>
</template>

<script>
  export default {
    name: 'DanmakuView',
    data () {
      return {
        danmakuText: ''
      }
    },
    methods: {

      // 发送按钮点击
      onSendBtnClick () {
        this.$emit('sendDanmaku', this.danmakuText)
        this.danmakuText = ''
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("index.less");
</style>
