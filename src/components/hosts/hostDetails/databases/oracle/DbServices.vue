<template>
  <b-tab-item label="Services" v-if="services.length > 0">
    <FullTable :tableData="services" :keys="keys">
      <template slot="headData">
        <v-th sortKey="name">Name</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.name" />
      </template>
    </FullTable>
  </b-tab-item>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  props: {
    services: {
      type: Array,
      default: Array,
    },
  },
  components: {
    FullTable,
    TdContent,
  },
  data() {
    return {
      keys: ['name'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
