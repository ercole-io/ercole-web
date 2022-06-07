<template>
  <b-tab-item label="Services" v-if="services && services.length > 0">
    <FullTable :tableData="services" :keys="keys" :isLoadingTable="false">
      <template slot="headData">
        <v-th sortKey="name">Name</v-th>
        <v-th sortKey="name">Enabled</v-th>
        <v-th sortKey="name">Creation Date</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.name" />
        <TdIcon :value="rowData.scope.enabled" />
        <TdContent :value="rowData.scope.creationDate" />
      </template>
    </FullTable>
  </b-tab-item>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'

export default {
  props: {
    services: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    FullTable,
    TdContent,
    TdIcon,
  },
  data() {
    return {
      keys: ['name', 'creationDate', 'enabled'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
