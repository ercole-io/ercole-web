<template>
  <div class="columns sticky-buttons">
    <div class="column">
      <b-button
        type="is-danger"
        size="is-small"
        @click="reset"
        expanded
        data-cy="btn-reset"
      >
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
        data-cy="btn-apply"
      >
        {{ applyText }}
      </b-button>
    </div>
  </div>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'

export default {
  name: 'commom-form-actionbuttons-component',
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
.sticky-buttons {
  background-color: #f5f5f5;
  position: sticky;
  position: -webkit-sticky;
  bottom: 0;
  z-index: 10;
}
</style>
