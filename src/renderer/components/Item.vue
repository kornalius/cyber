<style scoped>

</style>

<template lang="pug">
  div.container.border.rounded.p-4.shadow(v-if="isVisible")
    i {{ item.icon }}
    h3 {{ item.name }}
    p {{ item.desc }}
</template>

<script>
  export default {
    name: 'Item',

    props: {
      itemId: String,
    },

    data () {
      return {
      }
    },

    computed: {
      item () {
        return this.$store.getters.items.find(this.itemId)
      },

      isVisible () {
        return this.$store.getters.items.isVisible(this.itemId)
      },
    },

    methods: {
      addToRoom (roomId) {
        this.$store.dispatch('items/addToRoom', this.itemId, roomId)
      },

      moveToRoom (roomId) {
        this.$store.dispatch('items/moveToRoom', this.itemId, roomId)
      },

      removeFromRoom () {
        this.$store.dispatch('items/removeFromRoom', this.itemId)
      },

      show () {
        this.$store.dispatch('items/show', this.itemId)
      },

      hide () {
        this.$store.dispatch('items/hide', this.itemId)
      },
    },
  }
</script>
