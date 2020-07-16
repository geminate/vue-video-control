<template>
  <div id="app">
    <video-control ref="videoControl" class="video-control" :options="videoOptions"></video-control>
  </div>
</template>

<script>
  import { danmakuData } from './danmakuData'

  export default {
    name: 'App',
    data () {
      return {
        videoOptions: {
          src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
          autoplay: false,
          poster: '',
          control: {
            show: true,
            focusPreview: {
              show: true,
              data: []
            },
            videoPreview: {
              show: true,
              imgUrl: 'video-preview.jpg',
              totalNum: 10
            },
            videoTimer: {
              show: true
            },
            speedBtn: {
              show: true,
              speedArray: [0.5, 0.75, 1, 1.5, 2]
            },
            volumeBtn: {
              show: true
            },
            fullScreenBtn: {
              show: true
            }
          },
          danmaku: {
            show: true,
            fontSize: 25,
            rowNum: 9,
            speed: 80,
            data: [],
            onSendDanmaku: ({ danmaku, time }) => {
              console.log(danmaku, time)
            }
          }
        }
      }
    },
    methods: {
      async getFocusPreviewData () {
        const test = () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve([0, 1650, 2558, 3306, 3885, 5021, 8274, 23416, 4519, 5820, 4728, 4340, 2023, 3494, 5490, 4928, 5586, 4596, 4148, 2012, 2133, 2757, 8532, 5202, 2103, 2669, 3274, 6458, 4570, 4938, 4650, 3684, 3532, 4254, 9520, 12324, 5072, 12868, 4764, 4194, 3722, 3464, 4508, 4150, 5792, 4930, 15894, 13140, 4844, 6056, 5744, 2347, 2387, 4486, 3518, 1675, 1907, 4262, 1726, 3700, 10950, 1705, 1703, 29178, 20535, 3170, 9870, 3070, 3232, 3246, 3634, 6483, 9597, 4252, 4988, 28656, 5174, 2878, 2723, 4978, 7644, 4920, 3604, 5672, 2883, 2046, 2249, 2479, 2619, 2425, 2441, 2947, 4288, 3378, 781, 437, 240, 222, 257, 499])
            }, 2000)
          })
        }

        this.videoOptions.control.focusPreview.data = await test()
        this.videoOptions.control.focusPreview.show = true
        this.$refs.videoControl.refreshOptions()
      },
      async getDanmakuData () {
        const test = () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(danmakuData)
            }, 2000)
          })
        }
        this.videoOptions.danmaku.data = await test()
        this.$refs.videoControl.refreshOptions()
      }
    },
    mounted () {
      this.getFocusPreviewData()
      this.getDanmakuData()
    }
  }
</script>

<style lang="less" scoped>
  .video-control {
    width: 1050px;
    height: 700px;
  }
</style>
