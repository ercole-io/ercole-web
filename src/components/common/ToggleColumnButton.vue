<template>
  <b-button
    class="toggleCol"
    size="is-small"
    type="is-text"
    slot="customTopHeader"
    pack="fas"
    :icon-right="toggle ? 'chevron-right' : 'chevron-left'"
    @click="toggle = !toggle"
  >
    {{ toggle ? `Hide ${this.toggleText}` : `Show ${this.toggleText}` }}
  </b-button>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'

export default {
  props: {
    toggleText: {
      type: String,
      default: ''
    },
    hideDirection: {
      type: String,
      default: 'right'
    }
  },
  data() {
    return {
      toggle: false
    }
  },
  created() {
    this.onToggle()
  },
  methods: {
    onToggle() {
      bus.$emit('onToggle', {
        direction: this.hideDirection,
        toggle: this.toggle
      })
    }
  },
  watch: {
    toggle() {
      this.onToggle()
    }
  }
}
</script>

<style lang="scss" scoped>
.toggleCol {
  position: absolute;
  right: 20px;
  top: 110px;
  padding: 0;
  z-index: 10;

  &:hover {
    background-color: transparent;
    color: #679189;
  }

  &:focus {
    background-color: transparent;
    border: none;
    box-shadow: none;
  }
}
</style>
