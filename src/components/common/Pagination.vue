<template>
  <b-pagination
    :total="listItems.length"
    :current.sync="current"
    :range-before="rangeBefore"
    :range-after="rangeAfter"
    :size="size"
    :per-page="perPage"
    :icon-prev="prevIcon"
    :icon-next="nextIcon"
    aria-next-label="Next page"
    aria-previous-label="Previous page"
    aria-page-label="Page"
    aria-current-label="Current page"
  />
</template>

<script>
import { bus } from '@/helpers/eventBus.js'

export default {
  props: {
    listItems: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      current: 1,
      perPage: 10,
      rangeBefore: 3,
      rangeAfter: 3,
      size: 'is-small',
      prevIcon: 'chevron-left',
      nextIcon: 'chevron-right'
    }
  },
  created() {
    this.$emit('pagitatedItems', this.paginatedItems)

    bus.$on('changePerPage', value => {
      this.perPage = value
    })
  },
  computed: {
    paginatedItems() {
      return this.listItems.slice(
        (this.current - 1) * this.perPage,
        this.current * this.perPage
      )
    }
  },
  watch: {
    paginatedItems() {
      this.$emit('pagitatedItems', this.paginatedItems)
    }
  }
}
</script>

<style lang="scss" scoped></style>
