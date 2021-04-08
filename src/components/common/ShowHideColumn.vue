<template>
  <div class="columns">
    <div class="column" :class="leftVal" v-if="leftVal">
      <slot name="left" />
    </div>

    <div class="column" :class="rightVal" v-if="rightVal">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'

export default {
  props: {
    leftCol: {
      type: String,
      default: 'is-9'
    },
    rightCol: {
      type: String,
      default: 'is-3'
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
        this.leftVal = this.leftCol
        this.rightVal = this.rightCol
      }
    },
    resolveDirection(dir) {
      if (dir === 'right') {
        this.leftVal = 'is-12'
        this.rightVal = false
      } else {
        this.leftVal = false
        this.rightVal = 'is-12'
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
