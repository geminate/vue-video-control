<!-- 播放速度控制按钮 -->
<template>
  <div class="speed-btn" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <span class="text">{{playSpeed === 1 ? '倍速' : playSpeed + 'x'}}</span>
    <div class="speed-dropdown-menu" :class="{'show':showDropDown}">
      <div v-for="item in speedArray"
           :key="item"
           class="speed-dropdown-item"
           :class="{active:playSpeed === item}"
           @click="changeSpeed(item)"
      >
        {{item}}x
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SpeedBtn',
    props: ['value', 'speedArray'], // 可选速度数组
    data () {
      return {
        playSpeed: this.value, // 当前播放速度
        showDropDown: false, // 是否显示下拉菜单
        timer: null // 下拉菜单展示延迟计时器
      }
    },
    watch: {
      value (newVal) {
        this.playSpeed = newVal
      },
      playSpeed (newVal) {
        this.$emit('input', newVal)
      }
    },
    methods: {

      // 改变播放速度
      changeSpeed (playSpeed) {
        this.playSpeed = playSpeed
        this.showDropDown = false
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
