<template>
  <Card cardTitle="Host FileSystems List" cotentSize="1" contentPadding="1">
    <FullTable :tableData="fileSysData" :keys="keys">
      <template slot="headData">
        <v-th sortKey="filesystem">FileSys</v-th>
        <v-th sortKey="type">FsType</v-th>
        <v-th sortKey="mountedOn">MountedOn</v-th>
        <v-th sortKey="size">Size</v-th>
        <v-th sortKey="availableSpace">Available</v-th>
        <v-th sortKey="usedSpace">Used</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.filesystem" />
        <TdContent :value="rowData.scope.type" />
        <TdContent :value="rowData.scope.mountedOn" />
        <TdContent :value="rowData.scope.size" />
        <TdContent :value="rowData.scope.availableSpace" />
        <TdContent :value="rowData.scope.usedSpace" />
      </template>
    </FullTable>
  </Card>
</template>

<script>
import Card from '@/components/common/Card.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  props: {
    fileSysData: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Card,
    FullTable,
    TdContent
  },
  data() {
    return {
      keys: [
        'filesystem',
        'type',
        'mountedOn',
        'size',
        'availableSpace',
        'usedSpace'
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
