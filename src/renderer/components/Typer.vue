<style>
  .vue-typer {
    font-family: monospace;
    cursor: default;
    user-select: none;
  }
  .char {
    display: inline-block;
    white-space: pre-wrap;
  }
  .newline {
    display: inline;
  }
  .typed {
  }
</style>

<template lang="pug">
  .vue-typer.mb-4(@click="_finish")
    span.char.custom.typed(v-for='l in numLeftChars' :class="classes(currentTextArray[l-1])") {{ currentTextArray[l-1] }}
</template>

<script>
  const STATE = {
    IDLE: 'idle',
    TYPING: 'typing',
    COMPLETE: 'complete'
  }

  export default {
    name: 'Typer',

    props: {
      text: {
        type: String,
        required: true,
      },
      delay: {
        type: Number,
        default: 15,
      },
    },

    data () {
      return {
        state: STATE.IDLE,
        spool: [],
        spoolIndex: -1,
        previousTextIndex: -1,
        currentTextIndex: -1,
        actionTimeout: 0,
        actionInterval: 0
      }
    },

    computed: {
      isDoneTyping () {
        return this.currentTextIndex >= this.currentTextLength
      },

      onLastWord () {
        return this.spoolIndex === this.spool.length - 1
      },

      currentText () {
        if (this.spoolIndex >= 0 && this.spoolIndex < this.spool.length) {
          return this.spool[this.spoolIndex]
        }
        return ''
      },

      currentTextArray () {
        return this.currentText.split('')
      },

      currentTextLength () {
        return this.currentTextArray.length
      },

      numLeftChars () {
        return this.currentTextIndex < 0 ? 0 : this.currentTextIndex
      },

      numRightChars () {
        return this.currentTextLength - this.numLeftChars
      },
    },

    mounted () {
      this.init()
    },

    beforeDestroy () {
      this.cancelCurrentAction()
    },

    methods: {
      classes (c) {
        return {
          newline: c === '\n'
        }
      },

      init () {
        if (_.isString(this.text)) {
          this.spool = [this.text]
        }
        else {
          let textCopy = this.text.slice()
          textCopy = textCopy.filter(textToType => textToType.length > 0)
          this.spool = textCopy
        }
        this.resetSpool()
        this.startTyping()
      },

      reset () {
        this.cancelCurrentAction()
        this.init()
      },

      resetSpool () {
        this.spoolIndex = 0
      },

      cancelCurrentAction () {
        if (this.actionInterval) {
          clearInterval(this.actionInterval)
          this.actionInterval = 0
        }
        if (this.actionTimeout) {
          clearTimeout(this.actionTimeout)
          this.actionTimeout = 0
        }
      },

      shiftCaret (delta) {
        this.previousTextIndex = this.currentTextIndex
        const newCaretIndex = this.currentTextIndex + delta
        this.currentTextIndex = Math.min(Math.max(newCaretIndex, 0), this.currentTextLength)
      },

      moveCaretToStart () {
        this.previousTextIndex = this.currentTextIndex
        this.currentTextIndex = 0
      },

      moveCaretToEnd () {
        this.previousTextIndex = this.currentTextIndex
        this.currentTextIndex = this.currentTextLength
      },

      typeStep () {
        if (!this.isDoneTyping) {
          this.shiftCaret(1)

          const typedCharIndex = this.previousTextIndex
          const typedChar = this.currentTextArray[typedCharIndex]
          this.$emit('typed-char', typedChar, typedCharIndex)
        }
        else {
          this.cancelCurrentAction()
          this.$nextTick(this.onTyped)
        }
      },

      startTyping () {
        if (this.actionTimeout || this.actionInterval) {
          return
        }
        this.moveCaretToStart()
        this.state = STATE.IDLE
        this.actionTimeout = setTimeout(() => {
          this.state = STATE.TYPING
          this.typeStep()
          if (!this.isDoneTyping) {
            this.actionInterval = setInterval(this.typeStep, this.delay)
          }
        })
      },

      onTyped () {
        this.$emit('typed', this.currentText)
        if (this.onLastWord) {
          this.onComplete()
        }
      },

      onComplete () {
        this.state = STATE.COMPLETE
        this.$emit('completed')
      },

      _finish () {
        this.moveCaretToEnd()
      },
    },
  }
</script>
