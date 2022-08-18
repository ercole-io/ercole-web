<template>
  <ToggleColumns
    getPage="tablespaces"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <TablespacesFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </TablespacesFilters>

    <FullTable
      slot="center"
      :placeholder="$t('menu.options')"
      :keys="keys"
      :tableData="getOracleTablespaces"
      @clickedRow="handleClickedRow"
      isClickable
      :isLoadingTable="loadingTableStatus"
    >
      <template slot="headData">
        <v-th sortKey="hostname">{{ $t('common.collumns.hostname') }}</v-th>
        <v-th sortKey="name">Name</v-th>
        <v-th sortKey="status">Status</v-th>
        <v-th sortKey="used">Used</v-th>
        <v-th sortKey="usedPerc">Used GB</v-th>
        <v-th sortKey="total">Total</v-th>
        <v-th sortKey="maxSize">Max Size</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <HostLink :hostname="rowData.scope.hostname" class="first-col" />
        <TdContent :value="rowData.scope.name" />
        <TdContent :value="rowData.scope.status" />
        <TdContent :value="rowData.scope.used" />
        <TdContent :value="rowData.scope.usedPerc" />
        <TdContent :value="rowData.scope.total" />
        <TdContent :value="rowData.scope.maxSize" />
      </template>

      <ExportButton
        slot="export"
        url="hosts/technologies/oracle/databases/tablespaces"
        expName="oracleTablespaces"
      />
    </FullTable>
  </ToggleColumns>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import ExportButton from '@/components/common/ExportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import TablespacesFilters from '@/components/databases/oracle/tablespaces/Filters.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  mixins: [hostnameLinkRow],
  components: {
    ToggleColumns,
    FullTable,
    ExportButton,
    TdContent,
    HostLink,
    TablespacesFilters,
    Loading,
  },
  data() {
    return {
      keys: [
        'hostname',
        'name',
        'status',
        'used',
        'usedPerc',
        'total',
        'maxSize',
      ],
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getTablespaces().then(() => {
      bus.$emit('data', this.getOracleTablespaces)
    })
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getTablespaces']),
  },
  computed: {
    ...mapGetters(['getOracleTablespaces', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
