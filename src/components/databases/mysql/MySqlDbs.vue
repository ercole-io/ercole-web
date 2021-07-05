<template>
  <BaseLayoutColumns>
    <MySqlFilters slot="col1" />
    <FullTable
      slot="col2"
      :placeholder="$t('menu.mysql')"
      :keys="keys"
      :tableData="getAllMysqlDbs"
      @clickedRow="handleClickedRow"
      isClickable
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
        <TdContent :value="rowData.scope.name" />
        <HostLink :hostname="[rowData.scope.hostname, rowData.scope.name]" />
        <TdContent :value="rowData.scope.environment" />
        <TdContent :value="rowData.scope.charsetSystem" />
        <TdContent :value="rowData.scope.architecture" />
        <TdContent :value="rowData.scope.bufferPoolSize" />
        <TdContent :value="rowData.scope.edition" />
        <TdContent :value="rowData.scope.engine" />
        <TdContent :value="rowData.scope.platform" />
        <TdContent :value="rowData.scope.version" />
        <TdIcon :value="rowData.scope.highAvailability" />
      </template>

      <ExportButton
        slot="export"
        url="hosts/technologies/mysql/databases"
        expName="mysqlDbs"
      />
    </FullTable>
  </BaseLayoutColumns>
</template>

<script>
import { mapGetters } from 'vuex'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import BaseLayoutColumns from '@/components/common/BaseLayoutColumns.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import ExportButton from '@/components/common/exportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import MySqlFilters from '@/components/databases/mysql/MySqlFilters.vue'

export default {
  mixins: [hostnameLinkRow],
  components: {
    BaseLayoutColumns,
    FullTable,
    ExportButton,
    TdContent,
    TdIcon,
    HostLink,
    MySqlFilters
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
        'highAvailability'
      ]
    }
  },
  computed: {
    ...mapGetters(['getAllMysqlDbs'])
  }
}
</script>

<style lang="scss" scoped></style>
