<template>
  <section>
    <TopTable v-if="!hideTopTable">
      <SearchInput
        :searchPlaceholder="placeholder"
        v-model="filters.search.value"
        :urlParam="urlSearchParam"
        v-if="!hideSearch"
      />

      <slot name="customTopHeader" />

      <div class="buttons mb-0" style="margin-left: auto;">
        <slot name="export" />
      </div>

      <SelectPerPage
        class="ml-2"
        :totalItems="total.length"
        v-if="!hidePerpage"
      />
    </TopTable>

    <div class="table-container scrollbar-x" id="style-1">
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
        style="margin-bottom: 10px;"
      >
        <thead slot="head">
          <slot name="customHeadData" />
          <tr class="has-background-grey-lighter">
            <slot name="headData" />
          </tr>
          <slot name="subCustomHeadData" />
        </thead>
        <tbody
          slot="body"
          slot-scope="{ displayData }"
          v-if="displayData.length > 0"
        >
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
        </tbody>
        <tbody v-else>
          <tr>
            <td style="height: 200px" colspan="50">
              <span style="display: none">
                {{ getDataLength('noData') }}
              </span>
              <NoContent noContentText="No Data Results" />
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>

    <BottomTable v-if="!hidePagination">
      <smart-pagination
        slot="info"
        :currentPage.sync="currentPage"
        :totalPages="totalPages"
        :maxPageLinks="maxPageLinks"
      />
      <ShowPerPage
        slot="info"
        :totalItems="total.length"
        :perPage="perPage"
        v-if="!filters.search.value"
        style="margin-left: auto;"
      />
      <FilteredResults
        slot="info"
        :totalItems="filteredData"
        v-if="filters.search.value"
        style="margin-left: auto;"
      />
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

export default {
  mixins: [paginationMixin],
  props: {
    placeholder: {
      type: String,
      default: 'Search'
    },
    keys: {
      type: Array,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    },
    isClickable: {
      type: Boolean,
      default: false
    },
    modeSelection: {
      type: String,
      default: 'single'
    },
    classSelection: {
      type: String,
      default: ''
    },
    hideSearch: {
      type: Boolean,
      default: false
    },
    hidePerpage: {
      type: Boolean,
      default: false
    },
    hidePagination: {
      type: Boolean,
      default: false
    },
    hideTopTable: {
      type: Boolean,
      default: false
    },
    urlSearchParam: {
      type: String,
      required: false
    }
  },
  components: {
    TopTable,
    BottomTable,
    SelectPerPage,
    FilteredResults,
    ShowPerPage,
    NoContent,
    SearchInput
  },
  data() {
    return {
      selectedRows: [],
      filteredData: 0,
      filters: {
        search: {
          value: '',
          keys: this.keys
        }
      }
    }
  },
  methods: {
    getDataLength(value) {
      this.$emit('pageRows', value)
      return value === 'noData'
        ? (this.filteredData = 0)
        : (this.filteredData = value.length)
    }
  },
  computed: {
    total() {
      return this.tableData
    }
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
    }
  }
}
</script>

<style lang="scss">
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
