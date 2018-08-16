import Vue from 'vue'
import App from './App.vue'

import 'vue-tel-input/dist/vue-tel-input.css'
import VueTelInput from 'vue-tel-input'

Vue.use(VueTelInput)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
