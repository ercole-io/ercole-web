<template>
  <b-tab-item label="ADDM">
    <FullTable
      :tableData="addms"
      :keys="keys"
      hideSearch
      hidePerpage
      hidePagination
      hideTopTable
      :isLoadingTable="false"
    >
      <template slot="headData">
        <v-th sortKey="action">Action</v-th>
        <v-th sortKey="benefit">Benefit</v-th>
        <v-th sortKey="finding">Finding</v-th>
        <v-th sortKey="recommendation">Recommendation</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.action" />
        <TdContent :value="rowData.scope.benefit" />
        <TdContent :value="rowData.scope.finding" />
        <TdContent :value="rowData.scope.recommendation" />
      </template>
    </FullTable>
  </b-tab-item>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  name: 'hosts-details-oracle-databases-addms-component',
  props: {
    addms: {
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
      keys: ['action', 'benefit', 'finding', 'recommendation'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
