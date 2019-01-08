import Freezer from 'freezer-js'
const store = new Freezer({})

export default {
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$store', {
      enumerable: true,
      get: () => store.get()
    })

    Object.defineProperty(Vue.prototype, '$storeInstance', {
      enumerable: true,
      get: () => store
    })
  }
}
