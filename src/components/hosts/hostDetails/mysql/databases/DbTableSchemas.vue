<template>
  <b-tab-item
    label="Table Schemas"
    v-if="tableSchemas && tableSchemas.length > 0"
  >
    <FullTable
      :tableData="tableSchemas"
      :keys="keys"
      hideSearch
      hidePerpage
      hidePagination
      hideTopTable
      :isLoadingTable="false"
    >
      <template slot="headData">
        <v-th sortKey="name">Name</v-th>
        <v-th sortKey="engine">Engine</v-th>
        <v-th sortKey="allocation">Allocation</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.name" />
        <TdContent :value="rowData.scope.engine" />
        <TdContent :value="rowData.scope.allocation" />
      </template>
    </FullTable>
  </b-tab-item>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  props: {
    tableSchemas: {
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
      keys: ['name', 'engine', 'allocation'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
