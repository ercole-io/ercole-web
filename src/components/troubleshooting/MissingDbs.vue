<template>
  <div style="min-height: 630px">
    <CollapseSimple
      v-for="(item, k) in paginatedItems"
      :key="k"
      :collapseTitle="item.hostname"
      :collapseID="k"
      :isOpen="false"
      callapsibleHeadColors="collapsible-missingdb-header"
    >
      <div class="p-2">
        <span v-for="msdb in item.missingdbs" :key="msdb">{{ msdb }}, </span>
      </div>
    </CollapseSimple>

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
      noContentText="There are no Hosts With Missing Databases to show"
      noContentHeight="630px"
      v-if="!total"
    />
  </div>
</template>

<script>
import CollapseSimple from '@/components/common/CollapseSimple.vue'
import NoContent from '@/components/common/NoContent.vue'

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    CollapseSimple,
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
.collapsible-missingdb-header {
  color: #db1e1e;
}
</style>
