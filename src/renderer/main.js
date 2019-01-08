import _ from 'lodash'
window._ = _

import Vue from 'vue'

import lodash from '@plugins/lodash'
Vue.use(lodash)

import async from '@plugins/async'
Vue.use(async)

import store from '@plugins/store'
Vue.use(store)

import '@styles/tailwind.css'

import App from './App'

if (!process.env.IS_WEB) {
  Vue.use(require('vue-electron'))
}
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App ref="game" />',
}).$mount('#app')
