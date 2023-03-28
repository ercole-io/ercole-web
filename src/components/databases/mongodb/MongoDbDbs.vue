<template>
  <ToggleColumns
    getPage="databasesMongoDbServer"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <MongoDbFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </MongoDbFilters>

    <FullTable
      slot="center"
      :placeholder="$t('menu.mongodb')"
      :keys="keys"
      :tableData="getAllMongoDbDbs"
      @clickedRow="handleClickedRow"
      isClickable
      :isLoadingTable="loadingTableStatus"
    >
      <template slot="headData">
        <v-th sortKey="dbName">{{ $t('common.collumns.name') }}</v-th>
        <v-th sortKey="hostname">{{ $t('common.collumns.hostname') }}</v-th>
        <v-th sortKey="environment">{{
          $t('common.collumns.environment')
        }}</v-th>
        <v-th sortKey="location">{{ $t('common.collumns.location') }}</v-th>
        <v-th sortKey="charset">{{ $t('common.collumns.charset') }}</v-th>
        <v-th sortKey="version">{{ $t('common.collumns.version') }}</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.dbName" class="first-col" />
        <HostLink :hostname="[rowData.scope.hostname, rowData.scope.dbName]" />
        <TdContent :value="rowData.scope.environment" />
        <TdContent :value="rowData.scope.location" />
        <TdContent :value="rowData.scope.charset" />
        <TdContent :value="rowData.scope.version" />
      </template>

      <ExportButton
        slot="export"
        url="hosts/technologies/mongodb/databases"
        expName="MongoDB"
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
import MongoDbFilters from '@/components/databases/mongodb/MongoDbFilters.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  name: 'databases-mongodb-dbs-component',
  mixins: [hostnameLinkRow],
  components: {
    ToggleColumns,
    FullTable,
    ExportButton,
    TdContent,
    HostLink,
    MongoDbFilters,
    Loading,
  },
  data() {
    return {
      keys: [
        'hostname',
        'environment',
        'location',
        'dbName',
        'charset',
        'version',
      ],
      isMounted: false,
    }
  },
  mounted() {
    this.isMounted = true
  },
  computed: {
    ...mapGetters(['getAllMongoDbDbs', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
