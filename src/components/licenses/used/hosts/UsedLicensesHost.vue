<template>
  <BaseLayoutColumns>
    <UsedLicensesHostFilters slot="col1" />

    <FullTable
      slot="col2"
      placeholder="Licenses"
      :urlSearchParam="partNumber"
      :keys="keys"
      :tableData="getUsedLicensesByHost"
      @clickedRow="handleClickedRow"
      isClickable
    >
      <template slot="headData">
        <v-th sortKey="hostname">{{ $t('common.collumns.hostname') }}</v-th>
        <v-th sortKey="dbsQty">{{ $t('common.collumns.databases') }}</v-th>
        <v-th sortKey="licenseTypeID">
          {{ $t('common.collumns.partNumber') }}
        </v-th>
        <v-th sortKey="description">
          {{ $t('common.collumns.description') }}
        </v-th>
        <v-th sortKey="metric">
          {{ $t('common.collumns.metric') }}
        </v-th>
        <v-th sortKey="usedLicenses">
          {{ $t('common.collumns.usedLicenses') }}
        </v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <HostLink :hostname="rowData.scope.hostname" />
        <td v-tooltip.bottom="options(rowData.scope.dbsQty)">
          <a @click.prevent="openModal(rowData.scope)" class="is-block">
            <span v-html="highlight(rowData.scope.dbsQty)" />
          </a>
        </td>
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
  props: {
    partNumber: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      keys: [
        'hostname',
        'licenseTypeID',
        'dbsQty',
        'description',
        'metric',
        'usedLicenses'
      ]
    }
  },
  mounted() {
    this.getUsedLicensesByHost
  },
  methods: {
    openModal(info) {
      this.$buefy.modal.open({
        component: UsedLicensesHostModal,
        hasModalCard: true,
        props: {
          databases: info.databases,
          licenseInfo: {
            licenseId: info.licenseTypeID,
            hostname: info.hostname,
            metric: info.metric,
            description: info.description
          }
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
