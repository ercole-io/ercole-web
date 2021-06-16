<template>
  <BaseLayoutColumns>
    <UsedLicensesHostFilters slot="col1" />

    <FullTable
      slot="col2"
      placeholder="Search on Licenses"
      :keys="keys"
      :tableData="getUsedLicensesByHost"
      @clickedRow="handleClickedRow"
      isClickable
    >
      <template slot="headData">
        <v-th sortKey="hostname">Hostname</v-th>
        <v-th sortKey="dbsQty">Databases</v-th>
        <v-th sortKey="licenseTypeID">Part Number</v-th>
        <v-th sortKey="description">Description</v-th>
        <v-th sortKey="metric">Metric</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <HostLink :hostname="rowData.scope.hostname" />
        <td v-tooltip.bottom="options(rowData.scope.dbsQty)">
          <a
            @click.prevent="
              openModal(
                rowData.scope.databases,
                rowData.scope.licenseTypeID,
                rowData.scope.hostname
              )
            "
            class="is-block"
          >
            <span v-html="highlight(rowData.scope.dbsQty)" />
          </a>
        </td>
        <TdContent :value="rowData.scope.licenseTypeID" />
        <TdContent :value="rowData.scope.description" />
        <TdContent :value="rowData.scope.metric" />
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
import { mapGetters } from 'vuex'
import paginationMixin from '@/mixins/paginationMixin.js'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import BaseLayoutColumns from '@/components/common/BaseLayoutColumns.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import UsedLicensesHostFilters from '@/components/licenses/used/hosts/UsedLicensesHostFilters.vue'
import UsedLicensesHostModal from '@/components/licenses/used/hosts/UsedLicensesHostModal.vue'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import TooltipMixin from '@/mixins/tooltipMixin.js'

export default {
  mixins: [
    HighlightSearchMixin,
    TooltipMixin,
    paginationMixin,
    hostnameLinkRow
  ],
  components: {
    BaseLayoutColumns,
    FullTable,
    TdContent,
    HostLink,
    UsedLicensesHostFilters
  },
  data() {
    return {
      keys: ['hostname', 'licenseTypeID', 'dbsQty', 'description', 'metric']
    }
  },
  mounted() {
    this.getUsedLicensesByHost
  },
  methods: {
    openModal(data, licenseId, hostname) {
      this.$buefy.modal.open({
        component: UsedLicensesHostModal,
        hasModalCard: true,
        props: {
          databases: data,
          licenseId: licenseId,
          hostname: hostname
        }
      })
    }
  },
  computed: {
    ...mapGetters(['getUsedLicensesByHost'])
  }
}
</script>

<style lang="scss" scoped></style>
