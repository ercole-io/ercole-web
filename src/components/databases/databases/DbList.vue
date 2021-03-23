<template>
  <FullTable
    placeholder="Search on Databases"
    :keys="keys"
    :tableData="getAllDatabases"
    @clickedRow="handleClickedRow"
    isClickable
  >
    <template slot="headData">
      <v-th sortKey="name">DB Name</v-th>
      <v-th sortKey="type">DB Type</v-th>
      <v-th sortKey="version">DB Version</v-th>
      <v-th sortKey="hostname">Hostname</v-th>
      <v-th sortKey="environment">Env.</v-th>
      <v-th sortKey="charset">Charset</v-th>
      <v-th sortKey="memory">Memory (GB)</v-th>
      <v-th sortKey="datafileSize">Datafile Size (GB)</v-th>
      <v-th sortKey="segmentSize">Segment Size (GB)</v-th>
      <v-th sortKey="archivelog">Archivelog Mode</v-th>
      <v-th sortKey="dataguard">DR</v-th>
      <v-th sortKey="ha">HA</v-th>
    </template>

    <template slot="bodyData" slot-scope="rowData">
      <TdContent :value="rowData.scope.name" />
      <TdContent :value="rowData.scope.type" />
      <TdContent :value="rowData.scope.version" />
      <HostLink :hostname="[rowData.scope.hostname, rowData.scope.name]" />
      <TdContent :value="rowData.scope.environment" />
      <TdContent :value="rowData.scope.charset" />
      <TdContent :value="rowData.scope.memory | formatNumber('0.00')" />
      <TdContent :value="rowData.scope.datafileSize | formatNumber('0.00')" />
      <TdContent :value="rowData.scope.segmentSize | formatNumber('0.00')" />
      <TdIcon :value="rowData.scope.archivelog" />
      <TdIcon :value="rowData.scope.dataguard" />
      <TdIcon :value="rowData.scope.ha" />
    </template>

    <ExportButton
      slot="export"
      url="hosts/technologies/oracle/databases"
      expName="databases"
    />
  </FullTable>
</template>

<script>
import { mapGetters } from 'vuex'
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
        'type',
        'version',
        'hostname',
        'environment',
        'charset',
        'memory',
        'datafileSize',
        'segmentSize',
        'archivelog',
        'dataguard',
        'ha'
      ]
    }
  },
  computed: {
    ...mapGetters(['getAllDatabases'])
  }
}
</script>

<style lang="sass" scoped></style>
