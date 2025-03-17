<template>
  <div style="min-height: 630px">
    <CollapseSimple
      v-for="item in paginatedItems"
      :key="item.hostname"
      :collapseTitle="item.hostname"
      :collapseID="toString(item.hostname)"
      :isOpen="false"
      callapsibleHeadColors="has-text-black-ter"
      hasTitleLink
      :titleLink="hostRedirect"
    >
      <div class="p-2">
        <p
          v-for="msdb in item.missingDatabases"
          :key="msdb.name"
          class="is-size-6"
        >
          <span class="has-text-weight-medium p-1" style="line-height: 0px">
            <b-icon
              pack="mdi"
              :icon="msdb.ignored ? 'check-circle' : 'minus-circle'"
              :type="msdb.ignored ? 'is-warning' : 'is-danger'"
              v-tooltip="options(`Is Ignored: ${msdb.ignored}`)"
            />
            {{ msdb.name }}
            <span class="is-size-7" v-if="msdb.ignoredComment">
              - Ignore Comment:
              <span class="is-size-6">{{ msdb.ignoredComment }}</span>
            </span>
          </span>
        </p>
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
import _ from 'lodash'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import CollapseSimple from '@/components/common/CollapseSimple.vue'
import NoContent from '@/components/common/NoContent.vue'

export default {
  mixins: [TooltipMixin],
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
    hostRedirect(e) {
      e.preventDefault()
      const value = _.split(e.target.innerHTML, ' - ', 1)[0].trim()
      this.$router.push({
        name: 'hosts-details',
        params: { hostname: value },
      })
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
.collapsible-missingdb-header {
  color: #db1e1e;
}
</style>
