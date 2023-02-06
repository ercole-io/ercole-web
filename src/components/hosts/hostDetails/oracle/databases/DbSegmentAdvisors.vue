<template>
  <b-tab-item label="Segment Advisors">
    <FullTable
      :tableData="segmentAdvisors"
      :keys="keys"
      hideSearch
      hidePerpage
      hidePagination
      hideTopTable
      :isLoadingTable="false"
    >
      <template slot="headData">
        <v-th sortKey="reclaimable">Reclaimable</v-th>
        <v-th sortKey="segmentName">Segment Name</v-th>
        <v-th sortKey="segmentOwner">Segment Owner</v-th>
        <v-th sortKey="segmentType">Segment Type</v-th>
        <v-th sortKey="partitionName">Partition</v-th>
        <v-th sortKey="recommendation">Recommendation</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.reclaimable" />
        <TdContent :value="rowData.scope.segmentName" />
        <TdContent :value="rowData.scope.segmentOwner" />
        <TdContent :value="rowData.scope.segmentType" />
        <TdContent :value="rowData.scope.partitionName" />
        <TdContent :value="rowData.scope.recommendation" />
      </template>
    </FullTable>
  </b-tab-item>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  name: 'hosts-details-oracle-databases-segadvisors-component',
  props: {
    segmentAdvisors: {
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
      keys: [
        'reclaimable',
        'segmentName',
        'segmentOwner',
        'segmentType',
        'partitionName',
        'recommendation',
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
