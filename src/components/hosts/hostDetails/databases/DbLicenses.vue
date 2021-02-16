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
      <v-th sortKey="name">Name</v-th>
      <v-th sortKey="count">Number</v-th>
      <v-th sortKey="licenseTypeID">Part Number</v-th>
      <v-th sortKey="description">Description</v-th>
      <v-th sortKey="metric">Metric</v-th>
    </template>

    <template slot="bodyData" slot-scope="rowData">
      <TdContent :value="rowData.scope.name" />
      <TdContent :value="rowData.scope.count" />
      <TdContent :value="rowData.scope.licenseTypeID" />
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
