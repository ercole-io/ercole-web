<template>
  <FullTable
    :tableData="psus"
    :keys="[]"
    hideSearch
    hidePerpage
    hidePagination
    hideTopTable
  >
    <template slot="headData">
      <v-th sortKey="date">Date</v-th>
      <v-th sortKey="description">Description</v-th>
    </template>

    <template slot="bodyData" slot-scope="rowData">
      <TdContent :value="rowData.scope.date | formatDate" />
      <TdContent :value="rowData.scope.description" />
    </template>
  </FullTable>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  props: {
    psus: {
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
