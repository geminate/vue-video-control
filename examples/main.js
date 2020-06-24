import Vue from 'vue'
import App from './App.vue'
import VideoControl from '../packages'

Vue.config.productionTip = false
Vue.use(VideoControl)

new Vue({
  render: h => h(App)
}).$mount('#app')
