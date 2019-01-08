<template lang="pug">
  Typer(:text="content")
</template>

<script>
  import Typer from '@components/Typer'

  export default {
    name: 'TermLine',

    components: { Typer },

    props: {
      content: String,
    },
  }
</script>
