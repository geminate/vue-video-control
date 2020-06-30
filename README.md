vue-video-control [![npm](https://img.shields.io/npm/v/vue-video-control)](https://www.npmjs.com/package/vue-video-control) [![npm](https://img.shields.io/npm/l/vue-video-control)](https://www.npmjs.com/package/vue-video-control)
======

A html5 video player component of vue. 

Include video controller / video preview / power progress bar and so on

## Install

You can install vue-video-control by npm.

```javascript
$ npm install vue-video-control
```
[cnpm](https://github.com/cnpm/cnpm) mirror is recommended if you are in Mainland China.

## Getting Started

* Import vue-video-control at main.js
```js
import VideoControl from 'vue-video-control'

Vue.use(VideoControl)
```
* Set options at pages
```vue
<template>
  <video-control ref="videoControl" class="video-control" :options="videoOptions"></video-control>
</template>

<script>
  export default {
    data () {
      return {
        videoOptions: {
          src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
        }
      }
    }
  }
</script>
```

## Options

| options                        | type     | default                | instruction
| --------                       | -----    | -----                  | -----
| src                            | string   | ''                     | Indicates media URL
| autoplay                       | boolean  | false                  | Do auto play the video
| poster                         | string   | ''                     | The poster image url of video
| control.show                   | boolean  | true                   | Display control bar
| control.focusPreview.show      | boolean  | false                  | Display focus preview bar
| control.focusPreview.data      | array    | [1]                    | The data array of focus preview bar 
| control.videoPreview.show      | boolean  | false                  | Display video preview image
| control.videoPreview.imgUrl    | string   | ''                     | The image url of video preview.The image must be an single line sprite image and each of the part should be 160*90. See /public/video-preview.jpg 
| control.videoPreview.totalNum  | number   | 10                     | Number of the sprite image 
| control.videoTimer.show        | boolean  | true                   | Display video <current time / duration> timer 
| control.speedBtn.show          | boolean  | true                   | Display the button to change playback speed
| control.speedBtn.speedArray    | array    | [0.5, 0.75, 1, 1.5, 2] | Playback speed options
| control.volumeBtn.show         | boolean  | true                   | Display the button to change volume
| control.fullScreenBtn.show     | boolean  | true                   | Display the button to toggle full screen

## Methods

#### .refreshOptions()
```js
this.videoOptions.control.focusPreview.data = await getData()
this.videoOptions.control.focusPreview.show = true
this.$refs.videoControl.refreshOptions()
```
Refresh the component options

## Events

#### play / pause / loadStart / canPlay / canplaythrough / waiting / playing / progress / durationChange / seeking / seeked / timeUpdate / ended / error / rateChange / volumeChange
See [Media events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events)
