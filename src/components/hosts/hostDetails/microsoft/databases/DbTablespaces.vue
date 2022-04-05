<template>
  <b-tab-item label="Tablespaces" v-if="tablespaces.length > 0">
    <FullTable
      :tableData="tablespaces"
      :keys="[]"
      hideSearch
      hidePerpage
      hidePagination
      hideTopTable
      :isLoadingTable="false"
    >
      <template slot="headData">
        <v-th sortKey="alloc">Alloc</v-th>
        <v-th sortKey="fileType">File Type</v-th>
        <v-th sortKey="filename">File Name</v-th>
        <v-th sortKey="growth">Growth</v-th>
        <v-th sortKey="growthUnit">Growth Unit</v-th>
        <v-th sortKey="status">Status</v-th>
        <v-th sortKey="used">Used</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.alloc" />
        <TdContent :value="rowData.scope.fileType" />
        <TdContent :value="rowData.scope.filename" />
        <TdContent :value="rowData.scope.growth" />
        <TdContent :value="rowData.scope.growthUnit" />
        <TdContent :value="rowData.scope.status" />
        <TdContent :value="rowData.scope.used" />
      </template>
    </FullTable>
  </b-tab-item>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  props: {
    tablespaces: {
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
