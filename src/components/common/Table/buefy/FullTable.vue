<template>
  <article>
    <div class="is-flex mb-3">
      <b-select
        v-model="showPerPage"
        size="is-small"
        class="mr-2"
        v-if="getTotalData > 25"
      >
        <option value="25" v-if="getTotalData > 25">
          25 {{ $t('common.table.perPage') }}
        </option>
        <option value="50" v-if="getTotalData > 50">
          50 {{ $t('common.table.perPage') }}
        </option>
        <option value="100" v-if="getTotalData > 100">
          100 {{ $t('common.table.perPage') }}
        </option>
        <option value="200" v-if="getTotalData > 200">
          200 {{ $t('common.table.perPage') }}
        </option>
        <option :value="getTotalData">
          {{ $t('common.table.allData') }} - {{ getTotalData }}
        </option>
      </b-select>
      <template v-if="hasCheckbox && checkedRows.length > 0">
        <b-button
          :label="`Clear All selected (${checkedRows.length})`"
          size="is-small"
          type="is-dark"
          icon-left="close"
          @click="checkedRows = []"
        />
        <b-button
          :label="$t('views.alerts.markRead')"
          type="is-primary"
          size="is-small"
          icon-pack="fas"
          icon-left="check-circle"
          class="has-text-weight-semibold mr-2 ml-2"
          @click="markAsRead"
        />
      </template>

      <div style="width: 100%" class="is-flex is-justify-content-flex-end">
        <RefreshButton v-if="hasRefreshButton" tooltipMsg="Update Data" />
        <b-input
          placeholder="Search..."
          type="text"
          size="is-small"
          icon="magnify"
          icon-right="close-circle"
          icon-right-clickable
          @icon-right-click="onSearchClear"
          @keyup.enter.native="onSearch"
          v-model="search"
        />
      </div>
    </div>

    <b-table
      :data="isEmpty ? [] : tableData"
      :loading="loadingTableStatus"
      :columns="setColumns"
      :checked-rows.sync="checkedRows"
      checkbox-position="left"
      checkbox-type="is-primary"
      :checkable="hasCheckbox"
      :is-row-checkable="rowsNotCheckable"
      :paginated="getTotalData > 0 ? true : false"
      backend-pagination
      :total="getTotalData"
      :per-page="getPerPage"
      :current-page="getPageNum"
      @page-change="onPageChange"
      pagination-order="is-centered"
      pagination-size="is-small"
      backend-sorting
      @sort="onPageSort"
      default-sort-direction="desc"
      :default-sort="[sortField, 'desc']"
      sort-icon="chevron-up"
      sort-icon-size="is-small"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      sticky-header
    >
      <slot name="cols" />

      <template #empty>
        <NoContent noContentText="No Data Results" noContentHeight="510px" />
      </template>
    </b-table>

    <div
      class="is-flex is-justify-content-space-between is-align-items-center is-size-7 has-text-weight-medium"
      style="margin-top: -31px"
      v-if="getTotalData > 0"
    >
      <ShowPerPage
        :totalItems="getTotalData"
        :perPage="getPageLength"
        data-cy="show-items"
      />
      <div class="buttons mb-0" v-if="hasExportButton">
        <ExportButton :url="exportInfo[0]" :expName="exportInfo[1]" />
      </div>
    </div>
  </article>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapMutations } from 'vuex'
import ShowPerPage from '@/components/common/Table/ShowPerPage.vue'
import ExportButton from '@/components/common/ExportButton.vue'
import NoContent from '@/components/common/NoContent.vue'
import RefreshButton from '@/components/common/RefreshButton.vue'

export default {
  components: {
    ShowPerPage,
    ExportButton,
    NoContent,
    RefreshButton,
  },
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    setColumns: {
      type: Array,
      default: null,
    },
    sortField: {
      type: String,
      default: null,
    },
    fnCallback: {
      type: Function,
      default: () => [],
    },
    hasCheckbox: {
      type: Boolean,
      default: false,
    },
    rowsNotCheckable: {
      type: Function,
      default: () => [],
    },
    hasExportButton: {
      type: Boolean,
      default: false,
    },
    exportInfo: {
      type: Array,
      default: () => [],
    },
    hasRefreshButton: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isEmpty: false,
      checkedRows: [],
      search: '',
    }
  },
  beforeMount() {
    bus.$on('resetRowSelected', () => (this.checkedRows = []))
  },
  methods: {
    ...mapMutations([
      'SET_PER_PAGE',
      'SET_PAGE_NUM',
      'SET_SORT_ITEM',
      'SET_SORT_ORDER',
      'SET_SEARCH_THERM',
    ]),
    markAsRead() {
      bus.$emit('getRowSelected', this.checkedRows)
    },
    onSearch() {
      this.SET_SEARCH_THERM(this.search)
      this.onPageChange(1)
    },
    onSearchClear() {
      this.search = ''
      this.onSearch()
    },
    onPageChange(page) {
      this.SET_PAGE_NUM(page)
      this.fnCallback().then(() => {
        bus.$emit('highlightSearch', this.search)
      })
    },
    onPageSort(field, order) {
      this.SET_SORT_ITEM(field)
      this.SET_SORT_ORDER(order)
      this.fnCallback()
    },
  },
  computed: {
    ...mapGetters([
      'getPageNum',
      'getPerPage',
      'getTotalData',
      'getPageLength',
      'loadingTableStatus',
    ]),
    showPerPage: {
      get() {
        return Number(this.getPerPage)
      },
      set(val) {
        this.SET_PER_PAGE(val)
      },
    },
  },
  watch: {
    showPerPage() {
      this.fnCallback()
    },
    loadingTableStatus() {
      const table = this.$el.querySelector('.table-wrapper')
      table.scrollTop = 0
    },
  },
}
</script>

<style lang="scss" scoped></style>
