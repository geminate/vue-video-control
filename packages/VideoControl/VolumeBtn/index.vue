<!-- 音量按钮 -->
<template>
  <div class="volume-button" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <div class="icon" :class="{'mute': volume === 0}" @click="toggleMute"></div>
    <div class="dropdown-menu" :class="{'show':showDropDown}">
      <div class="text">{{volume}}%</div>
      <volume-slider v-model="volume"></volume-slider>
    </div>
  </div>
</template>

<script>
  import VolumeSlider from './VolumeSlider'

  export default {
    name: 'VolumeBtn',
    components: { VolumeSlider },
    props: ['value'],
    data () {
      return {
        volume: this.value, // 当前音量
        showDropDown: false, // 是否展示下拉菜单
        timer: null // 下拉菜单展示延迟计时器
      }
    },
    watch: {
      value (newVal) {
        this.volume = newVal
      },
      volume (newVal) {
        this.$emit('input', newVal)
      }
    },
    methods: {

      // 静音切换
      toggleMute () {
        this.volume === 0 ? this.volume = 50 : this.volume = 0
      },

      // 鼠标移入展示下拉菜单
      onMouseEnter () {
        this.timer && clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.showDropDown = true
        }, 250)
      },

      // 鼠标移出隐藏下拉菜单
      onMouseLeave () {
        this.timer && clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.showDropDown = false
        }, 250)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("index.less");
</style>
