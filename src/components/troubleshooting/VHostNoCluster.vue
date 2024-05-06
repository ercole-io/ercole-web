<template>
  <div style="min-height: 630px">
    <p
      v-for="item in paginatedItems"
      :key="item._id"
      class="nocluster collapsible-nocluster-header"
    >
      <span>{{
        `${item.hostname} - ${item.hardwareAbstractionTechnology}`
      }}</span>
    </p>

    <b-pagination
      :total="total"
      v-model="current"
      :range-before="rangeBefore"
      :range-after="rangeAfter"
      :order="order"
      :size="size"
      :per-page="perPage"
      :icon-prev="prevIcon"
      :icon-next="nextIcon"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      v-if="total > 10"
    />

    <NoContent
      noContentText="There are no Virtual Hosts with No CLuster to show"
      noContentHeight="630px"
      v-if="!total"
    />
  </div>
</template>

<script>
import NoContent from '@/components/common/NoContent.vue'

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    NoContent,
  },
  data() {
    return {
      current: 1,
      perPage: 10,
      rangeBefore: 3,
      rangeAfter: 1,
      order: 'is-centered',
      size: 'is-small',
      prevIcon: 'chevron-left',
      nextIcon: 'chevron-right',
    }
  },
  computed: {
    total() {
      return this.data.length
    },
    paginatedItems() {
      let page_number = this.current - 1

      return this.data.slice(
        page_number * this.perPage,
        (page_number + 1) * this.perPage
      )
    },
  },
}
</script>

<style lang="scss">
.nocluster {
  line-height: 1.25;
  background-color: #ededed;
  font-weight: 700;
  padding: 12px 16px;
  border-radius: 0.25rem;
  box-shadow: 0 0.125em 0.25em rgba(10, 10, 10, 0.3);
  font-size: 1rem;
}
.collapsible-nocluster-header {
  color: #db1e1e;
}
</style>
