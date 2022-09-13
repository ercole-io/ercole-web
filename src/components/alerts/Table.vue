<template>
  <div>
    <b-table
      :data="isEmpty ? [] : getAlerts"
      :columns="columns"
      :checked-rows.sync="checkedRows"
      checkable
      :checkbox-position="checkboxPosition"
      :checkbox-type="checkboxType"
      :loading="loadingTableStatus"
      :paginated="isPaginated"
      backend-pagination
      :total="total"
      :per-page="perPage"
      :current-page.sync="currentPage"
      :pagination-simple="isPaginationSimple"
      :pagination-position="paginationPosition"
      :default-sort-direction="defaultSortDirection"
      :pagination-rounded="isPaginationRounded"
      :sort-icon="sortIcon"
      :sort-icon-size="sortIconSize"
      default-sort="date"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      :page-input="hasInput"
      :pagination-order="paginationOrder"
      :page-input-position="inputPosition"
      :debounce-page-input="inputDebounce"
    >
    </b-table>
    <p>Showing {{ perPage }} of {{ total }} items</p>
    <b>Total checked</b>: {{ checkedRows.length }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      isEmpty: false,
      checkboxPosition: 'left',
      checkboxType: 'is-primary',
      checkedRows: [],
      columns: [
        {
          field: 'alertCategory',
          label: 'Type',
          centered: true,
          sortable: true,
        },
        {
          field: 'date',
          label: 'Date',
          centered: true,
          sortable: true,
        },
        {
          field: 'alertSeverity',
          label: 'Severity',
          centered: true,
          sortable: true,
        },
        {
          field: 'hostname',
          label: 'Hostname',
          centered: true,
          sortable: true,
        },
        {
          field: 'alertCode',
          label: 'Code',
          centered: true,
          sortable: true,
        },
        {
          field: 'description',
          label: 'Description',
          centered: true,
          sortable: true,
          width: '40%',
        },
      ],
      isPaginated: true,
      isPaginationSimple: false,
      isPaginationRounded: false,
      paginationPosition: 'bottom',
      defaultSortDirection: 'desc',
      sortIcon: 'chevron-up',
      sortIconSize: 'is-small',
      currentPage: 1,
      perPage: 10,
      total: 115,
      hasInput: false,
      paginationOrder: 'is-centered',
      inputPosition: 'is-input-left',
      inputDebounce: '',
    }
  },
  beforeMount() {
    console.log(this.getAlerts)
    this.total = this.getAlerts.length
  },
  computed: {
    ...mapGetters(['getAlerts', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
