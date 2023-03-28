<template>
  <b-tab-item label="Shard List" v-if="shards && shards.length > 0">
    <FullTable
      :tableData="shards"
      :keys="keys"
      hideSearch
      hidePerpage
      hidePagination
      hideTopTable
      :isLoadingTable="false"
    >
      <template slot="headData">
        <v-th sortKey="_id">ID</v-th>
        <v-th sortKey="host">Host</v-th>
        <v-th sortKey="state">State</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope._id" />
        <TdContent :value="rowData.scope.host" />
        <TdContent :value="rowData.scope.state" />
      </template>
    </FullTable>
  </b-tab-item>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  name: 'hosts-details-mongodb-databases-shardlist-component',
  props: {
    shards: {
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
      keys: ['hosts', 'state', '_id'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
