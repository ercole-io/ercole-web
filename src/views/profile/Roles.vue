<template>
  <FullTable
    placeholder="Roles"
    :keys="keys"
    :tableData="showRoles"
    :isLoadingTable="loadingTableStatus"
  >
    <template slot="headData">
      <v-th sortKey="name">Role Name</v-th>
      <v-th sortKey="name">Role Description</v-th>
    </template>

    <template slot="bodyData" slot-scope="rowData">
      <TdContent :value="rowData.scope.name" />
      <TdContent :value="rowData.scope.description" />
    </template>
  </FullTable>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  components: {
    FullTable,
    TdContent,
  },
  data() {
    return {
      keys: ['name', 'description'],
    }
  },
  async beforeMount() {
    await this.getRoles()
  },
  methods: {
    ...mapActions(['getRoles']),
  },
  computed: {
    ...mapGetters(['showRoles', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
