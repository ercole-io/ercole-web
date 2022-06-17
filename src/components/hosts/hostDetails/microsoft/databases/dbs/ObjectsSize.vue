<template>
  <FullTable
    :tableData="objectsSize"
    :keys="keys"
    hideSearch
    hidePerpage
    hidePagination
    hideTopTable
    :isLoadingTable="false"
  >
    <template slot="headData">
      <v-th sortKey="allocatedSpace">Allocated Space</v-th>
      <v-th sortKey="allocationType">Allocation Type</v-th>
      <v-th sortKey="usedSpace">Used Space</v-th>
    </template>

    <template slot="bodyData" slot-scope="rowData">
      <TdContent :value="rowData.scope.allocatedSpace | prettyBytes(1, true)" />
      <TdContent :value="rowData.scope.allocationType" />
      <TdContent :value="rowData.scope.usedSpace | prettyBytes(1, true)" />
    </template>
  </FullTable>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  props: {
    objectsSize: {
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
      keys: ['allocatedSpace', 'allocationType', 'usedSpace'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
