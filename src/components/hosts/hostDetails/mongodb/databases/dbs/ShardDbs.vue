<template>
  <FullTable
    :tableData="sharddbs"
    :keys="keys"
    hideSearch
    hidePerpage
    hidePagination
    hideTopTable
    :isLoadingTable="false"
  >
    <template slot="headData">
      <v-th sortKey="_id">ID</v-th>
      <v-th sortKey="primary">Primary</v-th>
      <v-th sortKey="partitioned">Partitioned</v-th>
    </template>

    <template slot="bodyData" slot-scope="rowData">
      <TdContent :value="rowData.scope._id" />
      <TdContent :value="rowData.scope.primary" />
      <TDIcon :value="rowData.scope.partitioned" />
    </template>
  </FullTable>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TDIcon from '@/components/common/Table/TDIcon.vue'

export default {
  name: 'hosts-details-mongodb-databases-dbs-shards-component',
  props: {
    sharddbs: {
      type: Array,
      default: null,
    },
  },
  components: {
    FullTable,
    TdContent,
    TDIcon,
  },
  data() {
    return {
      keys: ['partitioned', 'primary', '_id'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
