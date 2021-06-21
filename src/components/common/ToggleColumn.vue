<template>
  <div class="columns">
    <slot name="before" />

    <div class="column" :class="`is-${leftVal}`" v-show="leftVal">
      <slot name="left" />
    </div>

    <slot name="center" />

    <div class="column" :class="`is-${rightVal}`" v-show="rightVal">
      <slot name="right" />
    </div>

    <slot name="after" />
  </div>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'

export default {
  props: {
    leftCol: {
      type: Number,
      default: 9
    },
    rightCol: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      leftVal: this.leftCol,
      rightVal: this.rightCol
    }
  },
  created() {
    bus.$on('onToggle', val => {
      this.resolveToggle(val)
    })
  },
  methods: {
    toggleRight(toggle) {
      if (toggle) {
        this.leftVal = this.leftCol - this.rightCol
        this.rightVal = this.rightCol
      } else {
        this.leftVal = this.leftCol
        this.rightVal = false
      }
    },
    toggleLeft(toggle) {
      if (toggle) {
        this.leftVal = this.leftCol
        this.rightVal = this.rightCol - this.leftCol
      } else {
        this.leftVal = false
        this.rightVal = this.rightCol
      }
    },
    resolveToggle(val) {
      if (val.direction === 'right') {
        this.toggleRight(val.toggle)
      } else if (val.direction === 'left') {
        this.toggleLeft(val.toggle)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
