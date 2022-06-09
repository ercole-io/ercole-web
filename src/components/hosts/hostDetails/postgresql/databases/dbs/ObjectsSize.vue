<template>
  <FullTable
    :tableData="objectsSize"
    :keys="[]"
    hideSearch
    hidePerpage
    hidePagination
    hideTopTable
    :isLoadingTable="false"
  >
    <template slot="headData">
      <v-th sortKey="schemaName">Name</v-th>
      <v-th sortKey="schemaOwner">Owner</v-th>
      <v-th sortKey="schemaSize">Size</v-th>
      <v-th sortKey="tablesCount">Tables Count</v-th>
      <v-th sortKey="tablesSize">Tables Size</v-th>
      <v-th sortKey="viewsCount">Views Count</v-th>
      <v-th sortKey="indexesCount">Indexes Count</v-th>
      <v-th sortKey="indexesSize">Indexes Size</v-th>
      <v-th sortKey="matviewsCount">Matviews Count</v-th>
      <v-th sortKey="matviewsSize">Matviews Size</v-th>
    </template>

    <template slot="bodyData" slot-scope="rowData">
      <TdContent :value="rowData.scope.schemaName" />
      <TdContent :value="rowData.scope.schemaOwner" />
      <TdContent :value="rowData.scope.schemaSize | prettyBytes(1, true)" />
      <TdContent :value="rowData.scope.tablesCount" />
      <TdContent :value="rowData.scope.tablesSize | prettyBytes(1, true)" />
      <TdContent :value="rowData.scope.viewsCount" />
      <TdContent :value="rowData.scope.indexesCount" />
      <TdContent :value="rowData.scope.indexesSize | prettyBytes(1, true)" />
      <TdContent :value="rowData.scope.matviewsCount" />
      <TdContent :value="rowData.scope.matviewsSize | prettyBytes(1, true)" />
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
}
</script>

<style lang="scss" scoped></style>
