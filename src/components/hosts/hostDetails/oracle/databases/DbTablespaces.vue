<template>
  <b-tab-item label="Tablespaces" v-if="tablespaces && tablespaces.length > 0">
    <FullTable
      :tableData="tablespaces"
      :keys="keys"
      hideSearch
      hidePerpage
      hidePagination
      hideTopTable
      :isLoadingTable="false"
    >
      <template slot="headData">
        <v-th sortKey="name">Name</v-th>
        <v-th sortKey="status">Status</v-th>
        <v-th sortKey="used">Used</v-th>
        <v-th sortKey="usedPerc">Used GB</v-th>
        <v-th sortKey="total">Total</v-th>
        <v-th sortKey="maxSize">Max Size</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.name" />
        <TdContent :value="rowData.scope.status" />
        <TdContent :value="rowData.scope.used" />
        <TdContent :value="rowData.scope.usedPerc" />
        <TdContent :value="rowData.scope.total" />
        <TdContent :value="rowData.scope.maxSize" />
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
  data() {
    return {
      keys: ['name', 'status', 'used', 'usedPerc', 'total', 'maxSize'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
