<template>
  <div :class="{ 'fixed-buttons': isFixed }">
    <div class="is-flex is-justify-content-space-between">
      <b-button
        type="is-danger"
        size="is-small"
        @click="reset"
        class="m-2 mb-0"
      >
        {{ cancelText }}
      </b-button>
      <b-button
        type="is-primary"
        size="is-small"
        native-type="submit"
        class="m-2 mb-0"
        :disabled="isDisabled"
      >
        {{ applyText }}
      </b-button>
    </div>
  </div>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'

export default {
  props: {
    applyText: {
      type: String,
      default: 'Apply'
    },
    cancelText: {
      type: String,
      default: 'Reset'
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    isFixed: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    Apply() {
      bus.$emit('onApplyAction')
    },
    reset() {
      bus.$emit('onResetAction')
    }
  }
}
</script>

<style lang="scss" scoped>
.fixed-buttons {
  // border: 1px solid red;
  background-color: #f5f5f5;
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
  left: 0;
  padding: 25px 0;
  z-index: 10;
  width: inherit;
}
</style>
