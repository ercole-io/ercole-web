<template>
  <div class="fixed-buttons">
    <div class="is-flex is-justify-content-space-between">
      <b-button
        type="is-danger"
        size="is-small"
        @click="reset"
        class="m-2 mb-0"
      >
        Reset
      </b-button>
      <b-button
        type="is-primary"
        size="is-small"
        native-type="submit"
        class="m-2 mb-0"
      >
        Apply
      </b-button>
    </div>
  </div>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'

export default {
  methods: {
    reset() {
      bus.$emit('resetFilters')
    }
  }
}
</script>

<style lang="scss" scoped>
.fixed-buttons {
  background-color: #f5f5f5;
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
  padding: 25px 0;
  z-index: 10;
}
</style>
