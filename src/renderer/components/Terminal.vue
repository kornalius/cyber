<style lang="less" scoped>
  @font-face {
    font-family: 'Space Wham';
    src: url('/assets/fonts/space-wham.ttf') format('ttf');
    font-weight: normal;
    font-style: normal;
  }
  #term {
    width: 100%;
    height: 100%;
    font-family: 'Space Wham';
    color: #c0c5ce;
    font-size: 14px;
    line-height: 1.42857143em;
    overflow-y: auto;
    padding: 15px;
    margin-right: auto;
  }
  .terminal-line {
    height: 20px;
    & > * {
      display: inline-block;
      vertical-align: middle;
      text-align: start;
    }
  }
  .caret {
    width: 10px;
    background: #2b303b;
    color: inherit;
    display: inline-block;
  }
  .caret.visible {
    background: white;
    color: #2b303b;
  }
</style>

<template lang="pug">
  #term(ref="terminal")
    div.terminal-line(v-for="item in lines")
      component(:is="item.component" :content="item.content")
    //- span(:class="{ caret: true, visible: caretVisible }") &nbsp;
</template>

<script>
  import TermLine from '@components/terminal/TermLine'

  export default {
    name: 'Terminal',

    components: {
      TermLine,
    },

    data () {
      return {
        lines: [],
        caretVisible: false,
        delay: 0,
      }
    },

    mounted () {
      this.toggleCaret()
    },

    methods: {
      cls () {
        this.lines = []
      },

      println (text) {
        let delay = text.length * 20
        this.$async(() => {
          this.lines.push({
            component: 'TermLine',
            content: text,
          })
          this.delay -= delay
        }, this.delay)
        this.delay += delay
      },

      toggleCaret () {
        setInterval(() => {
          this.caretVisible = !this.caretVisible
        }, 500)
      },
    },
  }
</script>
