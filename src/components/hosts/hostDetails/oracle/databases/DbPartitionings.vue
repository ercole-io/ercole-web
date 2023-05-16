<template>
  <b-tab-item label="Partitioning">
    <FullTable
      :tableData="partitionings"
      :keys="keys"
      hideSearch
      hidePerpage
      hidePagination
      hideTopTable
      :isLoadingTable="false"
    >
      <template slot="headData">
        <v-th sortKey="segmentName">Segment Name</v-th>
        <v-th sortKey="owner">Segment Owner</v-th>
        <v-th sortKey="count">Partition Count</v-th>
        <v-th sortKey="mb" defaultSort="desc">MB</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.segmentName" />
        <TdContent :value="rowData.scope.owner" />
        <TdContent :value="rowData.scope.count" />
        <TdContent :value="rowData.scope.mb" />
      </template>
    </FullTable>
  </b-tab-item>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  name: 'hosts-details-oracle-databases-partitionings-component',
  props: {
    partitionings: {
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
      keys: ['count', 'mb', 'owner', 'segmentName'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
