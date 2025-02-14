<template>
  <b-tab-item label="Disk Groups">
    <FullTable :tableData="diskGroups" :keys="keys" :isLoadingTable="false">
      <template slot="headData">
        <v-th sortKey="diskGroupName">Disk Group Name</v-th>
        <v-th sortKey="freeSpace">Free Space</v-th>
        <v-th sortKey="totalSpace">Total Space</v-th>
        <v-th sortKey="usedSpace">Used Space</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.diskGroupName" />
        <TdContent :value="rowData.scope.freeSpace" />
        <TdContent :value="rowData.scope.totalSpace" />
        <TdContent :value="rowData.scope.usedSpace" />
      </template>
    </FullTable>
  </b-tab-item>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  name: 'hosts-details-oracle-databases-disk-groups-component',
  props: {
    diskGroups: {
      type: Array,
      default: null,
    },
  },
  components: {
    FullTable,
    TdContent,
  },
  data() {
    return {
      keys: ['diskGroupName', 'freeSpace', 'totalSpace', 'usedSpace'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
