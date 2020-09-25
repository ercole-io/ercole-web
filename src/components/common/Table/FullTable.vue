<template>
  <section>
    <TopTable>
      <b-input
        :placeholder="placeholder"
        size="is-small"
        v-model="filters.search.value"
        style="height: 30px;"
      />

      <slot name="customTopHeader" />

      <SelectPerPage :totalItems="total.length" />
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
          <tr class="has-background-grey-lighter">
            <slot name="headData" />
          </tr>
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

    <BottomTable>
      <ShowPerPage
        slot="info"
        :totalItems="total.length"
        :perPage="perPage"
        v-if="!filters.search.value"
      />
      <FilteredResults
        slot="info"
        :totalItems="filteredData"
        v-if="filters.search.value"
      />
      <template>
        <smart-pagination
          :currentPage.sync="currentPage"
          :totalPages="totalPages"
          :maxPageLinks="maxPageLinks"
        />
        <div class="buttons" style="margin-left: auto;">
          <slot name="export" />
        </div>
      </template>
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
    }
  },
  components: {
    TopTable,
    BottomTable,
    SelectPerPage,
    FilteredResults,
    ShowPerPage,
    NoContent
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
</style>
