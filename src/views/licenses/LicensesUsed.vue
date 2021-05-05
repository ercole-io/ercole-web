<template>
  <BaseLayoutColumns v-if="isMounted">
    <UsedFilters slot="col1" />

    <FullTable
      slot="col2"
      placeholder="Search on Licenses"
      :urlSearchParam="partNumber"
      :keys="keys"
      :tableData="getUsedLicenses"
      @clickedRow="handleClickedRow"
      isClickable
    >
      <DrawerButton slot="customTopHeader" tooltipText="More Filters" />

      <template slot="headData">
        <v-th sortKey="hostname">Hostname</v-th>
        <v-th sortKey="dbName">DB Name</v-th>
        <v-th sortKey="licenseTypeID">Part Number</v-th>
        <v-th sortKey="description">Description</v-th>
        <v-th sortKey="metric">Metric</v-th>
        <v-th sortKey="usedLicenses">Used Licenses</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <HostLink :hostname="[rowData.scope.hostname, rowData.scope.dbName]" />
        <TdContent :value="rowData.scope.dbName" />
        <TdContent :value="rowData.scope.licenseTypeID" />
        <TdContent :value="rowData.scope.description" />
        <TdContent :value="rowData.scope.metric" />
        <TdContent :value="rowData.scope.usedLicenses" />
      </template>

      <!-- <exportButton
      slot="export"
      url="hosts/technologies/oracle/databases/consumed-licenses"
      expName="licenses-list-data"
    /> -->
    </FullTable>
  </BaseLayoutColumns>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import paginationMixin from '@/mixins/paginationMixin.js'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import BaseLayoutColumns from '@/components/common/BaseLayoutColumns.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
// import exportButton from '@/components/common/exportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import DrawerButton from '@/components/common/DrawerButton.vue'
import UsedFilters from '@/components/licenses/used/UsedFilters.vue'

export default {
  mixins: [paginationMixin, hostnameLinkRow],
  props: {
    partNumber: {
      type: String,
      required: false
    }
  },
  components: {
    BaseLayoutColumns,
    FullTable,
    // exportButton,
    TdContent,
    HostLink,
    DrawerButton,
    UsedFilters
  },
  data() {
    return {
      keys: [
        'hostname',
        'dbName',
        'licenseTypeID',
        'usedLicenses',
        'description',
        'metric'
      ],
      isMounted: false
    }
  },
  async beforeMount() {
    await this.getAgreementParts()
    await this.getLicensesList().then(() => (this.isMounted = true))
  },
  methods: {
    ...mapActions(['getLicensesList', 'getAgreementParts'])
  },
  computed: {
    ...mapGetters(['getUsedLicenses'])
  }
}
</script>

<style lang="scss" scoped></style>
