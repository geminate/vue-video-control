<!-- 高能进度条 -->
<template>
  <div class="danmaku-view">
    <div class="danmaku-item"
         :class="[playStatus ? '' : 'pause' ]"
         :style="{'top':item.row * 30 + 'px'}"
         v-for="item in danmakuList"
         :key="item.id">{{item.text}}
    </div>
  </div>
</template>

<script>
  import { danmakuData } from './danmakuData'

  export default {
    name: 'DanmakuView',
    props: ['playStatus', 'currentTime', 'rowNum'],
    data () {
      return {
        danmaku: new Map(),
        currentDanmaku: Array.from({ length: this.rowNum + 1 }, x => Array.from({ length: 0 }, y => 0)),
        danmakuList: []
      }
    },
    watch: {
      currentTime (currentTime, oldTime) {
        if (currentTime.toFixed(0) !== oldTime.toFixed(0)) {
          const danmakuArray = this.getCurrentTimeDanmakuArray(currentTime)
          while (danmakuArray.length > 0) {
            this.addDanmaku(danmakuArray.pop())
          }
          setTimeout(() => { this.cleanDanmaku() }, 0)
        }
      }
    },
    methods: {
      // 获取当前时间秒数的弹幕数组
      getCurrentTimeDanmakuArray (currentTime) {
        return this.danmaku.get(Number(currentTime.toFixed(0))) || []
      },

      // 添加弹幕
      addDanmaku (danmaku) {
        const obj = {
          ...danmaku,
          margin: danmaku.time + danmaku.text.length / 5
        }
        for (let i = 0; i <= 6; i++) {
          if (this.currentDanmaku[i].length === 0 || (this.currentDanmaku[i].length > 0 && (danmaku.time > this.currentDanmaku[i][this.currentDanmaku[i].length - 1].margin))) {
            this.currentDanmaku[i].push(obj)
            this.danmakuList.push({
              ...obj,
              row: i
            })
            break
          }
        }
      },

      cleanDanmaku () {
        this.danmakuList = this.danmakuList.filter((item) => {
          return this.currentTime - item.time < 18
        })
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
      this.danmaku = this.groupDanmakuByTime(danmakuData)
    }
  }
</script>

<style lang="less" scoped>
  @import url("index.less");
</style>
