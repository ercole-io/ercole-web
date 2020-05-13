<template>
  <BoxContent>
    <b-table
      :data="isEmpty ? [] : data"
      :columns="columns"
      :paginated="isPaginated"
      :per-page="perPage"
      :current-page.sync="currentPage"
      :pagination-size="paginationSize"
      :pagination-simple="isPaginationSimple"
      :pagination-position="paginationPosition"
      :default-sort-direction="defaultSortDirection"
      :sort-icon="sortIcon"
      :sort-icon-size="sortIconSize"
      :striped="isStriped"
      :narrowed="isNarrowed"
      default-sort="hostname"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      :mobile-cards="true"
      :loading="isLoading"
      :scrollable="true"
    >
      <b-input
        slot="searchable"
        slot-scope="props"
        v-model="props.filters[props.column.field]"
        placeholder="Search..."
        icon="magnify"
        size="is-small"
      />

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon icon="emoticon-sad" size="is-large"> </b-icon>
            </p>
            <p>Nothing here.</p>
          </div>
        </section>
      </template>

      <template slot="bottom-left">
        <b-field grouped group-multiline>
          <b-select v-model="perPage" :disabled="!isPaginated" size="is-small">
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="15">15 per page</option>
            <option value="20">20 per page</option>
            <option value="50">50 per page</option>
          </b-select>
        </b-field>
      </template>
    </b-table>
  </BoxContent>
</template>

<script>
const data = require('@/components/Hosts/hosts.json')
import BoxContent from '@/components/common/BoxContent.vue'

export default {
  components: {
    BoxContent
  },
  data() {
    return {
      data: data,
      columns: [
        {
          field: 'hostname',
          label: 'Host',
          searchable: true,
          sortable: true
        },
        {
          field: 'env',
          label: 'Env',
          centered: true,
          searchable: true,
          sortable: true
        },
        {
          field: 'dbs',
          label: 'DBs',
          centered: true,
          searchable: true,
          sortable: true
        },
        {
          field: 'technologie',
          label: 'Tech',
          centered: true,
          searchable: true,
          sortable: true
        },
        {
          field: 'platform',
          label: 'Platform',
          centered: true,
          searchable: true,
          sortable: true
        },
        {
          field: 'cluster',
          label: 'Cluster',
          centered: true,
          searchable: true,
          sortable: true
        },
        {
          field: 'physical',
          label: 'Physical',
          centered: true,
          searchable: true,
          sortable: true
        },
        {
          field: 'os',
          label: 'OS',
          centered: true,
          searchable: true,
          sortable: true
        },
        {
          field: 'kernel',
          label: 'kernel',
          centered: true,
          searchable: true,
          sortable: true
        },
        {
          field: 'memory',
          label: 'Mem.',
          centered: true,
          searchable: true,
          sortable: true
        },
        {
          field: 'swap',
          label: 'Swap',
          centered: true,
          searchable: true,
          sortable: true
        },
        {
          field: 'clust',
          label: 'Clust',
          centered: true,
          searchable: true,
          sortable: true
        },
        {
          field: 'model',
          label: 'Model',
          centered: true,
          searchable: true,
          sortable: true
        },
        {
          field: 'threa',
          label: 'Threa',
          centered: true,
          searchable: true,
          sortable: true
        },
        {
          field: 'cores',
          label: 'Cores',
          centered: true,
          searchable: true,
          sortable: true
        },
        {
          field: 'socket',
          label: 'Socket',
          centered: true,
          searchable: true,
          sortable: true
        },
        {
          field: 'version',
          label: 'Version',
          centered: true,
          searchable: true,
          sortable: true
        },
        {
          field: 'last',
          label: 'Last',
          centered: true,
          searchable: true,
          sortable: true
        }
      ],
      isLoading: false,
      isEmpty: false,
      isStriped: true,
      isNarrowed: true,
      isPaginated: true,
      isPaginationSimple: false,
      paginationPosition: 'bottom',
      paginationSize: 'is-small',
      defaultSortDirection: 'asc',
      sortIcon: 'chevron-up',
      sortIconSize: 'is-small',
      currentPage: 1,
      perPage: 10
    }
  }
}
</script>

<style lang="scss" scoped></style>
