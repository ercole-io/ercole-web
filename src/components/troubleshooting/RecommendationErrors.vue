<template>
  <div style="min-height: 630px">
    <CollapseSimple
      v-for="(item, key) in paginatedItems"
      :key="key"
      :collapseTitle="`${item.cloud} - ${formatTimeAndDate(item.createdAt)}`"
      :collapseID="toString(item.key)"
      :isOpen="false"
      callapsibleHeadColors="has-text-black-ter"
    >
      <div class="py-2">
        <div class="is-flex px-2" style="font-size: 0.8rem">
          <div class="has-text-weight-medium mr-5">
            Profile ID:
            <span class="has-text-weight-bold">{{ item.profileID }}</span>
          </div>

          <div class="has-text-weight-medium mr-5">
            Category:
            <span class="has-text-weight-bold">{{ item.category }}</span>
          </div>
        </div>
        <div class="is-flex px-2" style="font-size: 0.8rem">
          <div class="has-text-weight-medium">
            Error:
            <span class="has-text-weight-bold">
              {{ item.error || item.msg }}
            </span>
          </div>
        </div>
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
      noContentText="There are no Recommendations Errors to show"
      noContentHeight="630px"
      v-if="!total"
    />
  </div>
</template>

<script>
import formatDateTime from '@/filters/formatDateTime.js'
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
  methods: {
    formatTimeAndDate(val) {
      return formatDateTime(val)
    },
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
.collapsible-recerrors-header {
  color: #db1e1e;
}
</style>
