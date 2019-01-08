<style scoped>
  .btn {
    @apply py-2 px-4 my-2 rounded cursor-pointer;
  }
  .btn-black {
    @apply bg-grey-darker text-white;
  }
  .btn-black:hover {
    @apply bg-grey-darkest;
  }
</style>

<template lang="pug">
  .btn.btn-black(@click="$emit('execute')")
    i {{ icon }}
    h3 {{ name }}
    p {{ desc }}
</template>

<script>
  export default {
    name: 'Action',

    props: {
      name: String,
      desc: String,
      icon: String,
    },
  }
</script>
