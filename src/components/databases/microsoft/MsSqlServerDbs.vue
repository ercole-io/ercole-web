<template>
  <ToggleColumns
    getPage="databasesMsSqlServer"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <MsSqlServerFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </MsSqlServerFilters>

    <FullTable
      slot="center"
      :placeholder="$t('menu.mysql')"
      :keys="keys"
      :tableData="getAllMsSqlServerDbs"
      @clickedRow="handleClickedRow"
      isClickable
      :isLoadingTable="loadingTableStatus"
    >
      <template slot="headData">
        <v-th sortKey="name">{{ $t('common.collumns.name') }}</v-th>
        <v-th sortKey="hostname">{{ $t('common.collumns.hostname') }}</v-th>
        <v-th sortKey="edition">{{ $t('common.collumns.edition') }}</v-th>
        <v-th sortKey="stateDesc">{{ $t('common.collumns.state') }}</v-th>
        <v-th sortKey="collationName">{{
          $t('common.collumns.collation')
        }}</v-th>
        <v-th sortKey="version">{{ $t('common.collumns.version') }}</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.name" class="first-col" />
        <HostLink :hostname="[rowData.scope.hostname, rowData.scope.name]" />
        <TdContent :value="rowData.scope.edition" />
        <TdContent :value="rowData.scope.stateDesc" />
        <TdContent :value="rowData.scope.collationName" />
        <TdContent :value="rowData.scope.version" />
      </template>

      <ExportButton
        slot="export"
        url="hosts/technologies/microsoft/databases"
        expName="MsSqlServer"
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
import MsSqlServerFilters from '@/components/databases/microsoft/MsSqlServerFilters.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  mixins: [hostnameLinkRow],
  components: {
    ToggleColumns,
    FullTable,
    ExportButton,
    TdContent,
    HostLink,
    MsSqlServerFilters,
    Loading,
  },
  data() {
    return {
      keys: [
        'name',
        'hostname',
        'edition',
        'stateDesc',
        'collationName',
        'version',
      ],
      isMounted: false,
    }
  },
  mounted() {
    this.isMounted = true
  },
  computed: {
    ...mapGetters(['getAllMsSqlServerDbs', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
