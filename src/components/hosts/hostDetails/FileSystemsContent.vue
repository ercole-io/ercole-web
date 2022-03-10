<template>
  <Card
    :cardTitle="$t('views.hostDetails.fileSystemsTitle')"
    contentSize="1"
    contentPadding="1rem"
  >
    <FullTable :tableData="fileSysData" :keys="keys" :isLoadingTable="false">
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
        <TdContent :value="multi(rowData.scope.size) | prettyBytes" />
        <TdContent :value="multi(rowData.scope.availableSpace) | prettyBytes" />
        <TdContent :value="multi(rowData.scope.usedSpace) | prettyBytes" />
      </template>
    </FullTable>
  </Card>
</template>

<script>
import _ from 'lodash'
import Card from '@/components/common/Card.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  props: {
    fileSysData: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    Card,
    FullTable,
    TdContent,
  },
  data() {
    return {
      keys: [
        'filesystem',
        'type',
        'mountedOn',
        'size',
        'availableSpace',
        'usedSpace',
      ],
    }
  },
  methods: {
    multi(val) {
      return _.multiply(Number(val), 1024)
    },
  },
}
</script>

<style lang="scss" scoped></style>
