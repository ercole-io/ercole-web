<template>
  <ToggleColumns
    getPage="backups"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <BackupsFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </BackupsFilters>

    <FullTable
      slot="center"
      :placeholder="$t('menu.options')"
      :keys="keys"
      :tableData="getOracleBackups"
      @clickedRow="handleClickedRow"
      isClickable
      :isLoadingTable="loadingTableStatus"
    >
      <template slot="headData">
        <v-th sortKey="hostname">{{ $t('common.collumns.hostname') }}</v-th>
        <v-th sortKey="dbName">{{ $t('common.collumns.name') }}</v-th>
        <v-th sortKey="weekDays">Days of the Week</v-th>
        <v-th sortKey="hour">Hour</v-th>
        <v-th sortKey="backupType">Type</v-th>
        <v-th sortKey="avgBckSize">Average</v-th>
        <v-th sortKey="retention">Retention</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <HostLink :hostname="rowData.scope.hostname" class="first-col" />
        <TdContent :value="rowData.scope.dbName" />
        <TdArrayMore :value="rowData.scope.weekDays" />
        <TdContent :value="rowData.scope.hour" />
        <TdContent :value="rowData.scope.backupType" />
        <TdContent :value="rowData.scope.avgBckSize" />
        <TdContent :value="rowData.scope.retention" />
      </template>

      <ExportButton
        slot="export"
        url="hosts/technologies/oracle/databases/backup-list"
        expName="oracleBackups"
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
import TdArrayMore from '@/components/common/Table/TdArrayMore.vue'
import BackupsFilters from '@/components/databases/oracle/backups/Filters.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  name: 'oracle-databases-backups-page',
  mixins: [hostnameLinkRow],
  components: {
    ToggleColumns,
    FullTable,
    ExportButton,
    TdContent,
    HostLink,
    TdArrayMore,
    BackupsFilters,
    Loading,
  },
  data() {
    return {
      keys: [
        'hostname',
        'dbName',
        'weekDays',
        'hour',
        'backupType',
        'avgBckSize',
        'retention',
      ],
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getBackups().then(() => {
      bus.$emit('data', this.getOracleBackups)
    })
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getBackups']),
  },
  computed: {
    ...mapGetters(['getOracleBackups', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
