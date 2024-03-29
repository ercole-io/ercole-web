<template>
  <ToggleColumns
    getPage="databasesMysql"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <MySqlFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </MySqlFilters>

    <FullTable
      slot="center"
      :placeholder="$t('menu.mysql')"
      :keys="keys"
      :tableData="getAllMysqlDbs"
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
        <v-th sortKey="charsetSystem">{{ $t('common.collumns.charset') }}</v-th>
        <v-th sortKey="architecture">{{
          $t('common.collumns.architecture')
        }}</v-th>
        <v-th sortKey="bufferPoolSize">{{ $t('common.collumns.buffer') }}</v-th>
        <v-th sortKey="edition">{{ $t('common.collumns.edition') }}</v-th>
        <v-th sortKey="engine">{{ $t('common.collumns.engine') }}</v-th>
        <v-th sortKey="platform">{{ $t('common.collumns.platform') }}</v-th>
        <v-th sortKey="version">{{ $t('common.collumns.version') }}</v-th>
        <v-th sortKey="highAvailability">{{
          $t('common.collumns.highAvailability')
        }}</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.name" class="first-col" />
        <HostLink :hostname="[rowData.scope.hostname, rowData.scope.name]" />
        <TdContent :value="rowData.scope.environment" />
        <TdContent :value="rowData.scope.charsetSystem" />
        <TdContent :value="rowData.scope.architecture" />
        <TdContent :value="rowData.scope.bufferPoolSize" />
        <TdContent :value="rowData.scope.edition" />
        <TdContent :value="rowData.scope.engine" />
        <TdContent :value="rowData.scope.platform" />
        <TdContent :value="rowData.scope.version" />
        <TdIcon
          :value="rowData.scope.highAvailability"
          @click.native="handleClickedRow([rowData.scope])"
        />
      </template>

      <ExportButton
        slot="export"
        url="hosts/technologies/mysql/databases"
        expName="mysqlDbs"
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
import TdIcon from '@/components/common/Table/TDIcon.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import MySqlFilters from '@/components/databases/mysql/MySqlFilters.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  name: 'databases-mysql-dbs-component',
  mixins: [hostnameLinkRow],
  components: {
    ToggleColumns,
    FullTable,
    ExportButton,
    TdContent,
    TdIcon,
    HostLink,
    MySqlFilters,
    Loading,
  },
  data() {
    return {
      keys: [
        'name',
        'hostname',
        'environment',
        'charsetSystem',
        'architecture',
        'bufferPoolSize',
        'edition',
        'engine',
        'platform',
        'version',
        'highAvailability',
      ],
      isMounted: false,
    }
  },
  mounted() {
    this.isMounted = true
  },
  computed: {
    ...mapGetters(['getAllMysqlDbs', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
