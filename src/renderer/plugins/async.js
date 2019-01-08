export default {
  install (Vue) {
    Vue.prototype.$async = function (cb, timeout = 1) {
      setTimeout(cb, timeout)
    }
  }
}
