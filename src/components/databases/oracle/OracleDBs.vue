<template>
  <FullTable
    placeholder="Search on Oracle DBs"
    :keys="keys"
    :tableData="getAllOracleDBs"
    @clickedRow="handleClickedRow"
    isClickable
  >
    <template slot="headData">
      <v-th sortKey="name">DB Name</v-th>
      <v-th sortKey="version">DB Version</v-th>
      <v-th sortKey="hostname">Hostname</v-th>
      <v-th sortKey="environment">Env.</v-th>
      <v-th sortKey="charset">Charset</v-th>
      <v-th sortKey="work">Work</v-th>
      <v-th sortKey="cpuCount">CPU Count</v-th>
      <v-th sortKey="blockSize">Block Size</v-th>
      <v-th sortKey="status">Status</v-th>
      <v-th sortKey="uniqueName">Unique Name</v-th>
      <v-th sortKey="memory">Memory (GB)</v-th>
      <v-th sortKey="datafileSize">Datafile size (GB)</v-th>
      <v-th sortKey="segmentsSize">Segment size (GB)</v-th>
      <v-th sortKey="archivelog">Archivelog Mode</v-th>
      <v-th sortKey="dataguard">DR</v-th>
      <v-th sortKey="ha">HA</v-th>
    </template>

    <template slot="bodyData" slot-scope="rowData">
      <TdContent :value="rowData.scope.name" />
      <TdContent :value="rowData.scope.version" />
      <HostLink :hostname="[rowData.scope.hostname, rowData.scope.name]" />
      <TdContent :value="rowData.scope.environment" />
      <TdContent :value="rowData.scope.charset" />
      <TdContent :value="rowData.scope.work" />
      <TdContent :value="rowData.scope.cpuCount" />
      <TdContent :value="rowData.scope.blockSize" />
      <TdContent :value="rowData.scope.status" />
      <TdContent :value="rowData.scope.uniqueName" />
      <TdContent :value="rowData.scope.memory | formatNumber('0.00')" />
      <TdContent :value="rowData.scope.datafileSize" />
      <TdContent :value="rowData.scope.segmentsSize" />
      <TdIcon :value="bindIcon(rowData.scope.archivelog)" />
      <TdIcon :value="bindIcon(rowData.scope.dataguard)" />
      <TdIcon :value="bindIcon(rowData.scope.ha)" />
    </template>

    <ExportButton
      slot="export"
      url="hosts/technologies/oracle/databases"
      expName="oracleDbs"
    />
  </FullTable>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapBooleanIcon } from '@/helpers/helpers.js'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import FullTable from '@/components/common/Table/FullTable.vue'
import ExportButton from '@/components/common/exportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import HostLink from '@/components/common/Table/HostLink.vue'

export default {
  mixins: [hostnameLinkRow],
  components: {
    FullTable,
    ExportButton,
    TdContent,
    TdIcon,
    HostLink
  },
  data() {
    return {
      keys: [
        'name',
        'version',
        'hostname',
        'environment',
        'charset',
        'memory',
        'datafileSize',
        'segmentsSize',
        'archivelog',
        'dataguard',
        'ha',
        'work',
        'blockSize',
        'cpuCount',
        'status',
        'uniqueName'
      ]
    }
  },
  methods: {
    bindIcon(value) {
      return mapBooleanIcon(value)
    }
  },
  computed: {
    ...mapGetters(['getAllOracleDBs'])
  }
}
</script>

<style lang="scss" scoped></style>
