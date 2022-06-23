<template>
  <b-tab-item label="PSU">
    <FullTable
      :tableData="psus"
      :keys="keys"
      hideSearch
      hidePerpage
      hidePagination
      hideTopTable
      :isLoadingTable="false"
    >
      <template slot="headData">
        <v-th sortKey="date">Date</v-th>
        <v-th sortKey="description">Description</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.date" />
        <TdContent :value="rowData.scope.description" />
      </template>
    </FullTable>
  </b-tab-item>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  props: {
    psus: {
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
      keys: ['date', 'description'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
