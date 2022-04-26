<template>
  <section>
    <TopTable v-show="!hideTopTable">
      <SelectPerPage
        :totalItems="total.length"
        v-if="!hidePerpage"
        class="mb-0"
        style="min-width: 135px"
      />

      <div class="is-flex is-justify-content-flex-end" style="width: 100%">
        <slot name="customTopHeader" />
      </div>

      <SearchInput
        :searchPlaceholder="setPlaceholder"
        v-model="filters.search.value"
        :urlParam="urlSearchParam"
        v-show="!hideSearch"
        style="min-width: 170px; max-width: 170px"
      />
    </TopTable>

    <div class="table-container">
      <v-table
        :data="total"
        :filters="filters"
        :hideSortIcons="true"
        :currentPage.sync="currentPage"
        :pageSize="perPage"
        @totalPagesChanged="totalPages = $event"
        @selectionChanged="selectedRows = $event"
        :selectionMode="modeSelection"
        :selectedClass="classSelection"
        class="vTable-custom"
      >
        <thead slot="head">
          <slot name="customHeadData" />
          <tr>
            <slot name="headData" />
          </tr>
          <slot name="subCustomHeadData" />
        </thead>

        <tbody slot="body" slot-scope="{ displayData }" class="is-relative">
          <template v-if="!isLoadingTable && displayData.length > 0">
            <span style="display: none">
              {{ getDataLength(displayData) }}
            </span>
            <v-tr
              v-for="(row, index) in displayData"
              :key="index"
              :row="row"
              :class="{ 'table-info': row.isChecked }"
            >
              <slot name="bodyData" :scope="row" />
            </v-tr>
          </template>
          <template v-if="!isLoadingTable && displayData.length <= 0">
            <tr>
              <td style="height: 510px" colspan="50">
                <span style="display: none">
                  {{ getDataLength('noData') }}
                </span>
                <NoContent noContentText="No Data Results" />
              </td>
            </tr>
          </template>
          <template v-if="isLoadingTable">
            <tr>
              <td style="height: 510px" colspan="50">
                <Loading :isLoading="isLoadingTable" />
              </td>
            </tr>
          </template>
        </tbody>
      </v-table>
    </div>

    <BottomTable v-if="!hidePagination">
      <ShowPerPage
        slot="info"
        :totalItems="total.length"
        :perPage="perPage"
        v-if="!filters.search.value"
        data-cy="show-items"
      />
      <FilteredResults
        slot="info"
        :totalItems="filteredData"
        v-if="filters.search.value"
      />
      <smart-pagination
        slot="info"
        :currentPage.sync="currentPage"
        :totalPages="totalPages"
        :maxPageLinks="maxPageLinks"
      />
      <div class="buttons mb-0" slot="info">
        <slot name="export" />
      </div>
    </BottomTable>
  </section>
</template>

<script>
import paginationMixin from '@/mixins/paginationMixin.js'
import TopTable from '@/components/common/Table/TopTable.vue'
import BottomTable from '@/components/common/Table/BottomTable.vue'
import SelectPerPage from '@/components/common/Table/SelectPerPage.vue'
import FilteredResults from '@/components/common/Table/FilteredResults.vue'
import ShowPerPage from '@/components/common/Table/ShowPerPage.vue'
import NoContent from '@/components/common/NoContent.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import Loading from '@/components/common/Loading.vue'
import i18n from '@/i18n.js'

export default {
  mixins: [paginationMixin],
  props: {
    placeholder: {
      type: String,
      default: 'Search',
    },
    keys: {
      type: [Array, Function],
      required: true,
    },
    tableData: {
      type: Array,
      required: true,
    },
    isClickable: {
      type: Boolean,
      default: false,
    },
    modeSelection: {
      type: String,
      default: 'single',
    },
    classSelection: {
      type: String,
      default: '',
    },
    hideSearch: {
      type: Boolean,
      default: false,
    },
    hidePerpage: {
      type: Boolean,
      default: false,
    },
    hidePagination: {
      type: Boolean,
      default: false,
    },
    hideTopTable: {
      type: Boolean,
      default: false,
    },
    urlSearchParam: {
      type: String,
      required: false,
    },
    isLoadingTable: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    TopTable,
    BottomTable,
    SelectPerPage,
    FilteredResults,
    ShowPerPage,
    NoContent,
    SearchInput,
    Loading,
  },
  data() {
    return {
      selectedRows: [],
      filteredData: 0,
      filters: {
        search: {
          value: '',
          keys: this.keys,
        },
      },
    }
  },
  methods: {
    getDataLength(value) {
      this.$emit('pageRows', value)
      return value === 'noData'
        ? (this.filteredData = 0)
        : (this.filteredData = value.length)
    },
  },
  computed: {
    total() {
      return this.tableData
    },
    setPlaceholder() {
      if (this.placeholder !== 'Search') {
        return `${i18n.t('common.table.search')} ${this.placeholder}`
      } else {
        return `${i18n.t('common.table.simpleSearch')}`
      }
    },
  },
  watch: {
    selectedRows() {
      if (this.isClickable) {
        this.$emit('clickedRow', this.selectedRows)
      } else {
        this.$emit('selectedRows', this.selectedRows)
      }
    },
    currentPage(value) {
      if (value) {
        this.$emit('isPageChanged')
      }
    },
    perPage(value) {
      if (value) {
        this.$emit('isPageChanged')
      }
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

.table-info {
  background-color: rgba(0, 0, 0, 0.075);
}

.content table td,
.content table th {
  vertical-align: middle;
}

.content table tr:not(:last-child) {
  border-bottom: 1px solid #dbdbdb;
}

.highlightText {
  background: yellow;
}

input[type='search'] {
  &::after {
    border: 1px solid red;
  }
  &::before {
    border: 1px solid red;
  }
}
</style>
