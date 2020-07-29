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
        <tbody slot="body" slot-scope="{ displayData }">
          <v-tr v-for="(row, index) in displayData" :key="index" :row="row">
            <slot name="bodyData" :scope="row" />
          </v-tr>
        </tbody>
      </v-table>
    </div>

    <BottomTable>
      <ShowPerPage slot="info" :totalItems="total.length" :perPage="perPage" />
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
import ShowPerPage from '@/components/common/Table/ShowPerPage.vue'

export default {
  mixins: [paginationMixin],
  props: {
    placeholder: {
      type: String,
      default: 'Search'
    },
    filters: {
      type: Object,
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
    ShowPerPage
  },
  computed: {
    total() {
      return this.tableData
    }
  }
}
</script>

<style lang="scss" scoped></style>
