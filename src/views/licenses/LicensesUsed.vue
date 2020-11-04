<template>
  <section>
    <UsedFilters v-if="isMounted" />

    <BoxContent>
      <FullTable
        placeholder="Search on Licenses"
        :keys="keys"
        :tableData="getUsedLicenses"
        :clickedRow="() => []"
      >
        <DrawerButton slot="customTopHeader" tooltipText="More Filters" />

        <template slot="headData">
          <v-th sortKey="hostname">Hostname</v-th>
          <v-th sortKey="dbName">DB Name</v-th>
          <v-th sortKey="licenseName">License Name</v-th>
          <v-th sortKey="usedLicenses">Used Licenses</v-th>
        </template>

        <template slot="bodyData" slot-scope="rowData">
          <HostLink :hostname="rowData.scope.hostname" />
          <TdContent :value="rowData.scope.dbName" />
          <TdContent :value="rowData.scope.licenseName" />
          <TdContent :value="rowData.scope.usedLicenses" />
        </template>

        <exportButton
          slot="export"
          url="licenses?mode=list"
          expName="licenses-list-data"
        />
      </FullTable>
    </BoxContent>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import paginationMixin from '@/mixins/paginationMixin.js'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import exportButton from '@/components/common/exportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import DrawerButton from '@/components/common/DrawerButton.vue'
import UsedFilters from '@/components/licenses/used/UsedFilters.vue'

export default {
  mixins: [paginationMixin],
  components: {
    BoxContent,
    FullTable,
    exportButton,
    TdContent,
    HostLink,
    DrawerButton,
    UsedFilters
  },
  data() {
    return {
      keys: ['hostname', 'dbName', 'licenseName', 'usedLicenses'],
      isMounted: false
    }
  },
  async beforeMount() {
    await this.getLicensesList().then(() => (this.isMounted = true))
  },
  methods: {
    ...mapActions(['getLicensesList'])
  },
  computed: {
    ...mapGetters(['getUsedLicenses'])
  }
}
</script>

<style lang="scss" scoped></style>
