<style scoped>
  #app {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #2b303b;
    justify-content: center;
    align-items: center;
  }
</style>

<template lang="pug">
  #app
    Terminal(ref="terminal")
</template>

<script>
  import Terminal from '@components/Terminal'

  export default {
    name: 'App',

    components: { Terminal },

    data () {
      return {
      }
    },

    mounted () {
      this.$refs.terminal.println('CHECKING DEVICES...' + _.pad('', 25))
      this.$refs.terminal.println('CHECKING FILE SYSTEM...' + _.pad('', 50))
      this.$refs.terminal.println('')
      this.$refs.terminal.println('INIT V 5.23')
      this.$refs.terminal.println('WELCOME TO NEUROTERM')
      this.$refs.terminal.println('PROVIDED BY NEUROCORP, LTD.')
      this.$refs.terminal.println('')
      this.$refs.terminal.println('*************************')
      this.$refs.terminal.println('* FOR INTERNAL USE ONLY *')
      this.$refs.terminal.println('*************************')
    },
  }
</script>
