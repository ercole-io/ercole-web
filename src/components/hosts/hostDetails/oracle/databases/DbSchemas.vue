<template>
  <b-tab-item label="Schemas">
    <FullTable :tableData="schemas" :keys="keys" :isLoadingTable="false">
      <template slot="headData">
        <v-th sortKey="user">User</v-th>
        <v-th sortKey="total">Total</v-th>
        <v-th sortKey="tables">Tables</v-th>
        <v-th sortKey="indexes">Indexes</v-th>
        <v-th sortKey="lob">LOB</v-th>
        <v-th sortKey="accountStatus">Account Status</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.user" />
        <TdContent :value="rowData.scope.total" />
        <TdContent :value="rowData.scope.tables" />
        <TdContent :value="rowData.scope.indexes" />
        <TdContent :value="rowData.scope.lob" />
        <TdContent :value="rowData.scope.accountStatus" />
      </template>
    </FullTable>
  </b-tab-item>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  name: 'hosts-details-oracle-databases-schemas-component',
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
  data() {
    return {
      keys: ['user', 'total', 'tables', 'indexes', 'lob'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
