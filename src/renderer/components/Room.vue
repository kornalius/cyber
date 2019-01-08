<style scoped>
  p:not(:last-child) {
    @apply mb-4
  }
</style>

<template lang="pug">
  div.mx-auto.max-w-md.rounded.overflow-hidden.shadow-lg.m-6
    img.w-full(:src="image")

    div.px-6.py-4
      h3.mb-4 {{ title }}
      slot(name="desc")

    div.px-6.py-4
      slot(name="items")
        Typer(text="You see nothing of importance")

    div.px-6.py-4
      span &gt;&nbsp;
      span(v-if="hasAction")
        component.inline-block(:is="currentAction")
</template>

<script>
  export default {
    name: 'Room',
    props: ['title', 'image'],

    data () {
      return {
        roomId: String,
        currentAction: undefined,
      }
    },

    computed: {
      hasAction () {
        return !_.isUndefined(this.currentAction)
      },

      room () {
        return this.$store.getters.rooms.find(this.roomId)
      },
    },

    methods: {
      addItemToRoom (itemId) {
        this.$store.dispatch('items/addToRoom', itemId, this.roomId)
      },

      moveItemToRoom (itemId) {
        this.$store.dispatch('items/moveToRoom', itemId, this.roomId)
      },

      removeItemFromRoom (itemId) {
        this.$store.dispatch('items/removeFromRoom', itemId, this.roomId)
      },

      clearItemsFromRoom () {
        this.$store.dispatch('items/removeAllFromRoom', this.roomId)
      },

      setAction (action) {
        this.currentAction = action
      },
    },
  }
</script>
