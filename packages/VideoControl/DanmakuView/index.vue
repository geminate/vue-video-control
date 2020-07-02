<!-- 弹幕展示区 -->
<template>
  <div ref="danmakuView" class="danmaku-view">
    <div v-for="(rowItem,row)  in currentDanmaku" :key="row" class="danmaku-row">
      <div class="danmaku-item"
           :class="[playStatus && !item.pause ? '' : 'pause', item.pause ? 'top':'']"
           @mouseenter="onMouseEnter(item)"
           @mouseleave="onMouseLeave(item)"
           :data-time="item.time"
           :data-margin="item.margin"
           :data-seeking="item.seeking"
           v-for="item in rowItem"
           :key="item.id"
           :style="{'animationDuration': animateTime + 's','fontSize':fontSize + 'px','left': 'calc( 100% + ' + fontSize * item.text.length + 'px )'}"
      >
        {{item.text}}
      </div>
    </div>
  </div>
</template>

<script>
  import { danmakuData } from './danmakuData'
  import Vue from 'vue'

  export default {
    name: 'DanmakuView',
    props: ['playStatus', 'currentTime', 'rowNum', 'fontSize', 'speed', 'isSeeking'],
    data () {
      return {
        animateTime: 0,
        danmaku: new Map(),
        currentDanmaku: Array.from({ length: this.rowNum + 1 }, x => Array.from({ length: 0 }, y => 0)),
        seekTemp: 0
      }
    },
    watch: {

      // 播放进度发生变化 实时添加新弹幕并删除旧弹幕
      currentTime (currentTime, oldTime) {
        if (currentTime.toFixed(0) !== oldTime.toFixed(0) && !this.isSeeking) {
          const danmakuArray = this.getCurrentTimeDanmakuArray(currentTime)
          while (danmakuArray.length > 0) {
            this.addDanmaku(danmakuArray.pop())
          }
          this.$nextTick(() => { this.cleanDanmaku() })
        }
      },

      // 监听用户跳转进度
      isSeeking (seeking) {
        if (seeking === true) { //  用户触发 seek
          this.seekTemp = this.currentTime
        } else { // seek 结束
          this.currentDanmaku = this.currentDanmaku.map((item) => {
            return item.map((danmaku) => {
              danmaku.time += this.currentTime - this.seekTemp
              danmaku.margin = this.calcMargin(danmaku)
              return danmaku
            })
          })
        }
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
        return this.danmaku.get(Number(currentTime.toFixed(0))) || []
      },

      // 添加弹幕 margin 用来控制弹幕左右间距
      addDanmaku (danmaku) {
        const obj = {
          ...danmaku,
          margin: this.calcMargin(danmaku)
        }
        for (let i = 0; i <= this.rowNum - 1; i++) {
          if (this.currentDanmaku[i].length === 0 || (this.currentDanmaku[i].length > 0 && (danmaku.time > this.currentDanmaku[i][this.currentDanmaku[i].length - 1].margin))) {
            this.currentDanmaku[i].push(obj)
            break
          }
        }
      },

      // 计算 弹幕间距时间
      calcMargin (danmaku) {
        const textLength = this.fontSize * danmaku.text.length
        return danmaku.time + (textLength + 50) / this.speed
      },

      // 清除过期弹幕
      cleanDanmaku () {
        this.currentDanmaku = this.currentDanmaku.map((item) => {
          return item.filter((danmaku) => {
            return this.currentTime - danmaku.time < 12
          })
        })
      },

      // 弹幕数组按照时间秒数分组
      groupDanmakuByTime (list) {
        const map = new Map()
        list.forEach((item) => {
          if (map.has(item.time)) {
            map.get(item.time).push({
              ...item,
              time: item.time + Math.random()
            })
          } else {
            map.set(item.time, [{
              ...item,
              time: item.time + Math.random()
            }])
          }
        })
        return map
      }
    },
    mounted () {
      this.danmaku = this.groupDanmakuByTime(danmakuData)
      this.animateTime = this.$refs.danmakuView.getBoundingClientRect().width / this.speed
    }
  }
</script>

<style lang="less" scoped>
  @import url("index.less");
</style>
