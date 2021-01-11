<template>
  <FullTable
    :tableData="licenses"
    :keys="[]"
    hideSearch
    hidePerpage
    hidePagination
    hideTopTable
  >
    <template slot="headData">
      <v-th sortKey="licenseName">Name</v-th>
      <v-th sortKey="licenseNumber">Number</v-th>
      <v-th sortKey="partNumber">Part Number</v-th>
      <v-th sortKey="description">Description</v-th>
      <v-th sortKey="metric">Metric</v-th>
    </template>

    <template slot="bodyData" slot-scope="rowData">
      <TdContent :value="rowData.scope.licenseName" />
      <TdContent :value="rowData.scope.licenseNumber" />
      <TdContent :value="rowData.scope.partNumber" />
      <TdContent :value="rowData.scope.description" />
      <TdContent :value="rowData.scope.metric" />
    </template>
  </FullTable>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  props: {
    licenses: {
      type: [Array, Function],
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
