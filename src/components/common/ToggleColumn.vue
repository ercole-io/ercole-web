<template>
  <div class="columns">
    <slot name="before" />

    <div class="column" :class="`is-${leftVal}`" v-if="leftVal">
      <slot name="left" />
    </div>

    <slot name="center" />

    <div class="column" :class="`is-${rightVal}`" v-if="rightVal">
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
    bus.$on('toggleColumn', val => {
      this.toggleCol(val)
    })
  },
  methods: {
    toggleCol(val) {
      if (!val.toggle) {
        this.resolveDirection(val.direction)
      } else {
        this.leftVal = this.leftCol - 3
        this.rightVal = this.rightCol + 3
      }
    },
    resolveDirection(dir) {
      if (dir === 'right') {
        this.leftVal = this.leftVal + this.rightVal
        this.rightVal = false
      } else {
        this.leftVal = false
        this.rightVal = this.leftVal + this.rightVal
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
