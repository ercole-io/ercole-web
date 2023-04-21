<template>
  <b-button
    type="is-ercole-blue"
    size="is-small"
    @click="toggleDbFilters"
    class="ml-1 has-text-weight-bold"
  >
    Advanced Filters
    <span v-if="isFiltersOpened" />
  </b-button>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'

export default {
  name: 'hosts-details-databases-filters-button-component',
  data() {
    return {
      isFiltersOpened: false,
    }
  },
  methods: {
    toggleDbFilters() {
      bus.$emit(
        'isDbFiltersOpen',
        (this.isFiltersOpened = !this.isFiltersOpened)
      )
    },
  },
}
</script>

<style lang="scss" scoped>
span {
  height: 1px;
  width: 30px;
  background-color: rgb(103, 145, 137);
  position: absolute;
  top: 13px;
  right: -30px;
}
</style>
