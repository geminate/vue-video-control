<!-- 弹幕展示区 -->
<template>
  <div ref="danmakuView" class="danmaku-view">
    <div v-for="(rowItem,row)  in currentDanmaku" :key="row" class="danmaku-row"
         :style="{height: fontSize * 1.3 + 'px'}">
      <div class="danmaku-item"
           :ref="'row'+row"
           :class="[playStatus && !item.pause ? '' : 'pause', item.pause ? 'top':'']"
           v-for="item in rowItem"
           :key="item.id"
           :style="{'animationDuration': animateTime + 's','fontSize':fontSize + 'px','left': 'calc( 100% + ' + fontSize * item.text.length + 'px )'}"
           @animationend="onAnimationEnd"
           @mouseenter="onMouseEnter(item)"
           @mouseleave="onMouseLeave(item)"
      >
        {{item.text}}
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'DanmakuView',
    props: ['playStatus', 'currentTime', 'rowNum', 'fontSize', 'speed', 'danmakuData'],
    data () {
      return {
        animateTime: 0, // 动画时长
        danmakuMap: new Map(), // 弹幕按照整数秒数划分 map
        currentDanmaku: Array.from({ length: this.rowNum + 1 }, () => Array.from({ length: 0 }, () => 0)) // 已经和正在播放的弹幕数组
      }
    },
    watch: {

      // 播放进度发生变化 实时添加新弹幕并删除旧弹幕
      currentTime (currentTime, oldTime) {
        if (Math.floor(currentTime) !== Math.floor(oldTime)) {
          const danmakuArray = [...this.getCurrentTimeDanmakuArray(currentTime)]
          this.addDanmaku(danmakuArray)
        }
      },

      danmakuData () {
        this.danmakuMap = this.groupDanmakuByTime(this.danmakuData)
      }
    },
    methods: {

      onMouseEnter (item) {
        Vue.set(item, 'pause', true)
      },

      onMouseLeave (item) {
        Vue.set(item, 'pause', false)
      },

      // 获取当前时间秒数的弹幕数组
      getCurrentTimeDanmakuArray (currentTime) {
        return this.danmakuMap.get(Math.floor(currentTime)) || []
      },

      // 添加弹幕 margin 用来控制弹幕左右间距
      addDanmaku (danmakuArray) {
        for (let i = 0; i <= this.rowNum - 1; i++) {
          if (!this.$refs['row' + i] || this.$refs['row' + i].length === 0) { // 还没有这个行
            const item = danmakuArray.shift()
            item && this.currentDanmaku[i].push(item)
          } else { // 该行最后一个弹幕元素已经移入屏幕超过 100px 可以添加新弹幕
            const lastItem = this.$refs['row' + i][this.$refs['row' + i].length - 1].getBoundingClientRect()
            const container = this.$refs.danmakuView.getBoundingClientRect()
            if (container.width - (lastItem.x - container.x) > lastItem.width + 100) {
              const item = danmakuArray.shift()
              item && this.currentDanmaku[i].push(item)
            }
          }
        }
      },

      // 弹幕动画完成销毁 dom
      onAnimationEnd (e) {
        const dom = e.target
        dom.parentNode.removeChild(dom)
      },

      // 弹幕数组按照时间秒数分组
      groupDanmakuByTime (list) {
        const map = new Map()
        list.forEach((item) => {
          if (map.has(item.time)) {
            map.get(item.time).push(item)
          } else {
            map.set(item.time, [item])
          }
        })
        return map
      }
    },
    mounted () {
      this.animateTime = this.$refs.danmakuView.getBoundingClientRect().width / this.speed
    }
  }
</script>

<style lang="less" scoped>
  @import url("index.less");
</style>
