<template>
  <article>
    <div class="is-flex mb-2">
      <b-select v-model="showPerPage" size="is-small">
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
          :label="`Clear selected (${checkedRows.length})`"
          size="is-small"
          type="is-dark"
          icon-left="close"
          @click="checkedRows = []"
        />
        <b-button
          type="is-primary"
          size="is-small"
          icon-pack="fas"
          icon-left="check-circle"
          class="has-text-weight-semibold mr-2 ml-2"
          @click="markAsRead"
        >
          {{ $t('views.alerts.markRead') }}
        </b-button>
      </template>
      <b-input
        placeholder="Search..."
        type="search"
        size="is-small"
        icon="magnify"
        icon-clickable
        @keyup.enter.native="onSearch"
        class="ml-auto"
        v-model="search"
      >
      </b-input>
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
      :paginated="true"
      backend-pagination
      :total="getTotalData"
      :per-page="getPerPage"
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
    </b-table>
    <div
      class="is-flex is-justify-content-space-between is-align-items-center is-size-7 has-text-weight-medium"
    >
      <ShowPerPage
        :totalItems="getTotalData"
        :perPage="showPerPage"
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

export default {
  components: {
    ShowPerPage,
    ExportButton,
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
  },
  data() {
    return {
      isEmpty: false,
      checkedRows: [],
      search: '',
    }
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
      bus.$emit('searchTherm')
    },
    onPageChange(page) {
      this.SET_PAGE_NUM(page)
      this.fnCallback()
    },
    onPageSort(field, order) {
      this.SET_SORT_ITEM(field)
      this.SET_SORT_ORDER(order)
      this.fnCallback()
    },
  },
  computed: {
    ...mapGetters(['getPerPage', 'getTotalData', 'loadingTableStatus']),
    showPerPage: {
      get() {
        return Number(this.getPerPage)
      },
      set(val) {
        this.SET_PER_PAGE(val)
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
