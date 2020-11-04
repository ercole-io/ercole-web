<template>
  <div class="buttons is-flex mt-5" style="justify-content: space-between;">
    <b-button type="is-danger" size="is-small" @click="reset">
      Reset
    </b-button>
    <b-button type="is-primary" size="is-small" native-type="submit">
      Apply
    </b-button>
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

<style lang="scss" scoped></style>
