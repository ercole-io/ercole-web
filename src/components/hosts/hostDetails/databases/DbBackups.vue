<template>
  <FullTable
    :tableData="backups"
    :keys="[]"
    hideSearch
    hidePerpage
    hidePagination
    hideTopTable
  >
    <template slot="headData">
      <v-th sortKey="weekDays">Days of the Week</v-th>
      <v-th sortKey="hour">Hour</v-th>
      <v-th sortKey="backupType">Type</v-th>
      <v-th sortKey="avgBckSize">Average</v-th>
      <v-th sortKey="retention">RMAN</v-th>
    </template>

    <template slot="bodyData" slot-scope="rowData">
      <TdArray :value="rowData.scope.weekDays" />
      <TdContent :value="rowData.scope.hour" />
      <TdContent :value="rowData.scope.backupType" />
      <TdContent :value="rowData.scope.avgBckSize" />
      <TdContent :value="rowData.scope.retention" />
    </template>
  </FullTable>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdArray from '@/components/common/Table/TdArray.vue'

export default {
  components: {
    FullTable,
    TdContent,
    TdArray
  },
  props: {
    backups: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped></style>
