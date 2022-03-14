<template>
  <div class="columns" :class="{ 'fixed-buttons': isFixed }">
    <div class="column">
      <b-button type="is-danger" size="is-small" @click="reset" expanded>
        {{ cancelText }}
      </b-button>
    </div>
    <div class="column">
      <b-button
        type="is-custom-primary"
        size="is-small"
        native-type="submit"
        :disabled="isDisabled"
        expanded
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
      default: 'Apply',
    },
    cancelText: {
      type: String,
      default: 'Reset',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isFixed: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    Apply() {
      bus.$emit('onApplyAction')
    },
    reset() {
      bus.$emit('onResetAction')
    },
  },
}
</script>

<style lang="scss" scoped>
.fixed-buttons {
  background-color: #f5f5f5;
  position: sticky;
  position: -webkit-sticky;
  bottom: 0;
  z-index: 10;
  margin-top: 10px;
}
</style>
