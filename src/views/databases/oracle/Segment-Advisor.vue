<template>
  <ToggleColumns
    getPage="segmentAdvisor"
    :leftButton="$t('common.forms.advancedFilters')"
    :rightButton="$t('common.general.sideInfo')"
    v-if="isMounted"
  >
    <SegnmentAdvisorsFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </SegnmentAdvisorsFilters>

    <FullTable
      slot="center"
      :placeholder="$t('menu.segAdvisor')"
      :keys="keys"
      :tableData="getOracleSegmentAdvisor"
      @clickedRow="handleClickedRow"
      isClickable
      :isLoadingTable="loadingTableStatus"
    >
      <template slot="headData">
        <v-th sortKey="reclaimable">{{ $t('common.fields.reclaimable') }}</v-th>
        <v-th sortKey="segmentsSize">{{ $t('common.fields.totalGB') }}</v-th>
        <v-th sortKey="retrieve">{{ $t('common.fields.retrieve') }}</v-th>
        <v-th sortKey="hostname">{{ $t('common.fields.hostname') }}</v-th>
        <v-th sortKey="dbname">{{ $t('common.fields.name') }}</v-th>
        <v-th sortKey="segmentOwner">{{
          $t('common.fields.segmentOwner')
        }}</v-th>
        <v-th sortKey="segmentName">{{ $t('common.fields.segmentName') }}</v-th>
        <v-th sortKey="segmentType">{{ $t('common.fields.segmentType') }}</v-th>
        <v-th sortKey="partitionName">{{
          $t('common.fields.partitionName')
        }}</v-th>
        <v-th sortKey="recommendation">{{
          $t('common.fields.recommendation')
        }}</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent
          :value="rowData.scope.reclaimable | formatNumber('0.00', 'GB')"
          class="first-col"
        />
        <TdContent
          :value="rowData.scope.segmentsSize | formatNumber('0.00', 'GB')"
        />
        <TdContent
          :value="rowData.scope.retrieve | formatNumber('0.00', '%')"
        />
        <HostLink :hostname="[rowData.scope.hostname, rowData.scope.dbname]" />
        <TdContent :value="rowData.scope.dbname" />
        <TdContent :value="rowData.scope.segmentOwner" />
        <TdContent :value="rowData.scope.segmentName" />
        <TdContent :value="rowData.scope.segmentType" />
        <TdContent :value="rowData.scope.partitionName" />
        <TdContent :value="rowData.scope.recommendation" />
      </template>

      <ExportButton
        slot="export"
        url="hosts/technologies/oracle/databases/segment-advisors"
        expName="oracleSegmentAdvisor"
      />
    </FullTable>

    <BoxContent
      :title="$t('views.databases.topStorage', ['10'])"
      border
      slot="right"
    >
      <GhostLoading :isLoading="loadingTableStatus" setHeight="297">
        <PieChart
          chartId="top10reclaimable"
          :pieChartData="top10reclaimableChart"
          setSuffix=" GB"
        />
      </GhostLoading>
    </BoxContent>
  </ToggleColumns>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import ExportButton from '@/components/common/ExportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import SegnmentAdvisorsFilters from '@/components/databases/oracle/segmentAdvisor/SegmentAdvisorFIlters.vue'
import PieChart from '@/components/common/charts/PieChart.vue'
import BoxContent from '@/components/common/BoxContent.vue'
import Loading from '@/components/common/Loading.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  mixins: [hostnameLinkRow],
  components: {
    ToggleColumns,
    FullTable,
    ExportButton,
    TdContent,
    HostLink,
    SegnmentAdvisorsFilters,
    PieChart,
    BoxContent,
    Loading,
    GhostLoading,
  },
  data() {
    return {
      keys: [
        'reclaimable',
        'segmentsSize',
        'retrieve',
        'hostname',
        'dbname',
        'segmentOwner',
        'segmentName',
        'segmentType',
        'partitionName',
        'recommendation',
      ],
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getSegmentAdvisor().then(() => {
      bus.$emit('data', this.getOracleSegmentAdvisor)
    })
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getSegmentAdvisor']),
  },
  computed: {
    ...mapGetters([
      'getOracleSegmentAdvisor',
      'top10reclaimableChart',
      'loadingTableStatus',
    ]),
  },
}
</script>

<style lang="scss" scoped></style>
