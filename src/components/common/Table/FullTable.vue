<template>
  <section>
    <TopTable>
      <b-input
        :placeholder="placeholder"
        size="is-small"
        v-model="filters.search.value"
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
        @selectionChanged="clickedRow"
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
          <v-tr v-for="(row, index) in displayData" :key="index" :row="row">
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
    clickedRow: {
      type: Function
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
      return value === 'noData'
        ? (this.filteredData = 0)
        : (this.filteredData = value.length)
    }
  },
  computed: {
    total() {
      return this.tableData
    }
  }
}
</script>

<style lang="scss" scoped></style>
