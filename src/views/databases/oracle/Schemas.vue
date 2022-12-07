<template>
  <ToggleColumns
    getPage="schemas"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <SchemasFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </SchemasFilters>

    <FullTable
      slot="center"
      :placeholder="$t('menu.schemas')"
      :keys="keys"
      :tableData="getOracleSchemas"
      @clickedRow="handleClickedRow"
      isClickable
      :isLoadingTable="loadingTableStatus"
    >
      <template slot="headData">
        <v-th sortKey="hostname">{{ $t('common.collumns.hostname') }}</v-th>
        <v-th sortKey="databaseName">{{ $t('common.collumns.name') }}</v-th>
        <v-th sortKey="user">User</v-th>
        <v-th sortKey="total">Total</v-th>
        <v-th sortKey="tables">Tables</v-th>
        <v-th sortKey="indexes">Indexes</v-th>
        <v-th sortKey="lob">LOB</v-th>
        <v-th sortKey="accountStatus">Account Status</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <HostLink :hostname="rowData.scope.hostname" class="first-col" />
        <TdContent :value="rowData.scope.databaseName" />
        <TdContent :value="rowData.scope.user" />
        <TdContent :value="rowData.scope.total" />
        <TdContent :value="rowData.scope.tables" />
        <TdContent :value="rowData.scope.indexes" />
        <TdContent :value="rowData.scope.lob" />
        <TdContent :value="rowData.scope.accountStatus" />
      </template>

      <ExportButton
        slot="export"
        url="hosts/technologies/oracle/databases/schemas"
        expName="oracleSchemas"
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
import SchemasFilters from '@/components/databases/oracle/schemas/Filters.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  mixins: [hostnameLinkRow],
  components: {
    ToggleColumns,
    FullTable,
    ExportButton,
    TdContent,
    HostLink,
    SchemasFilters,
    Loading,
  },
  data() {
    return {
      keys: [
        'hostname',
        'databaseName',
        'user',
        'total',
        'tables',
        'indexes',
        'lob',
        'accountStatus',
      ],
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getSchemas().then(() => {
      bus.$emit('data', this.getOracleSchemas)
    })
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getSchemas']),
  },
  computed: {
    ...mapGetters(['getOracleSchemas', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
