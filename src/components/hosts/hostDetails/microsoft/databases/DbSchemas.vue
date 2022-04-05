<template>
  <b-tab-item label="Schemas" v-if="schemas.length > 0">
    <FullTable
      :tableData="schemas"
      :keys="[]"
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
        <TdContent :value="rowData.scope.allocatedSpace" />
        <TdContent :value="rowData.scope.allocationType" />
        <TdContent :value="rowData.scope.usedSpace" />
      </template>
    </FullTable>
  </b-tab-item>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  props: {
    schemas: {
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
