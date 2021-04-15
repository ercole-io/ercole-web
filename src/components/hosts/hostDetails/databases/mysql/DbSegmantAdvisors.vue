<template>
  <b-tab-item label="Segment Advisors" v-if="segmentAdvisors.length > 0">
    <FullTable
      :tableData="segmentAdvisors"
      :keys="[]"
      hideSearch
      hidePerpage
      hidePagination
      hideTopTable
    >
      <template slot="headData">
        <v-th sortKey="tableName">Table Name</v-th>
        <v-th sortKey="tableSchema">Table Schema</v-th>
        <v-th sortKey="engine">engine</v-th>
        <v-th sortKey="data">Data</v-th>
        <v-th sortKey="allocation">Allocation</v-th>
        <v-th sortKey="index">Index</v-th>
        <v-th sortKey="free">Free</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.tableName" />
        <TdContent :value="rowData.scope.tableSchema" />
        <TdContent :value="rowData.scope.engine" />
        <TdContent :value="rowData.scope.data" />
        <TdContent :value="rowData.scope.allocation" />
        <TdContent :value="rowData.scope.index" />
        <TdContent :value="rowData.scope.free" />
      </template>
    </FullTable>
  </b-tab-item>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  props: {
    segmentAdvisors: {
      type: Array,
      default: null
    }
  },
  components: {
    FullTable,
    TdContent
  }
}
</script>

<style lang="scss" scoped></style>
