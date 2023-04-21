<template>
  <ToggleColumns
    getPage="databasesPostgreSqlServer"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <PostgreSqlFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </PostgreSqlFilters>

    <FullTable
      slot="center"
      :placeholder="$t('menu.mysql')"
      :keys="keys"
      :tableData="getAllPostgreSqlDbs"
      @clickedRow="handleClickedRow"
      isClickable
      :isLoadingTable="loadingTableStatus"
    >
      <template slot="headData">
        <v-th sortKey="name">{{ $t('common.collumns.name') }}</v-th>
        <v-th sortKey="hostname">{{ $t('common.collumns.hostname') }}</v-th>
        <v-th sortKey="environment">{{
          $t('common.collumns.environment')
        }}</v-th>
        <v-th sortKey="charset">{{ $t('common.collumns.charset') }}</v-th>
        <v-th sortKey="version">{{ $t('common.collumns.version') }}</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.name" class="first-col" />
        <HostLink :hostname="[rowData.scope.hostname, rowData.scope.name]" />
        <TdContent :value="rowData.scope.environment" />
        <TdContent :value="rowData.scope.charset" />
        <TdContent :value="rowData.scope.version" />
      </template>

      <ExportButton
        slot="export"
        url="hosts/technologies/postgresql/databases"
        expName="PostgreSql"
      />
    </FullTable>
  </ToggleColumns>
</template>

<script>
import { mapGetters } from 'vuex'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import ExportButton from '@/components/common/ExportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import PostgreSqlFilters from '@/components/databases/postgresql/PostgreSqlFilters.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  name: 'databases-postgre-dbs-component',
  mixins: [hostnameLinkRow],
  components: {
    ToggleColumns,
    FullTable,
    ExportButton,
    TdContent,
    HostLink,
    PostgreSqlFilters,
    Loading,
  },
  data() {
    return {
      keys: ['charset', 'environment', 'hostname', 'name', 'version'],
      isMounted: false,
    }
  },
  mounted() {
    this.isMounted = true
  },
  computed: {
    ...mapGetters(['getAllPostgreSqlDbs', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
