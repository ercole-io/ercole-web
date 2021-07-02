<template>
  <BaseLayoutColumns
    :pageCols="[
      { colsize: '3', slotName: 'col1' },
      { colsize: '6', slotName: 'col2' },
      { colsize: '3', slotName: 'col3' }
    ]"
    v-if="isMounted"
  >
    <SegnmentAdvisorsFilters slot="col1" />
    <FullTable
      slot="col2"
      placeholder="Oracle Segment Advisor"
      :keys="keys"
      :tableData="getOracleSegmentAdvisor"
      @clickedRow="handleClickedRow"
      isClickable
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

      <exportButton
        slot="export"
        url="hosts/technologies/oracle/databases/segment-advisors"
        expName="oracleSegmentAdvisor"
      />
    </FullTable>

    <BoxContent
      :title="$t('views.databases.topStorage', ['10'])"
      border
      slot="col3"
    >
      <PieChart
        chartId="top10reclaimable"
        :pieChartData="top10reclaimableChart"
        setSuffix=" GB"
      />
    </BoxContent>
  </BaseLayoutColumns>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import BaseLayoutColumns from '@/components/common/BaseLayoutColumns.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import exportButton from '@/components/common/exportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import SegnmentAdvisorsFilters from '@/components/databases/oracle/segmentAdvisor/SegmentAdvisorFIlters.vue'
import PieChart from '@/components/common/charts/PieChart.vue'
import BoxContent from '@/components/common/BoxContent.vue'

export default {
  mixins: [hostnameLinkRow],
  components: {
    BaseLayoutColumns,
    FullTable,
    exportButton,
    TdContent,
    HostLink,
    SegnmentAdvisorsFilters,
    PieChart,
    BoxContent
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
        'recommendation'
      ],
      isMounted: false
    }
  },
  async beforeMount() {
    await this.getSegmentAdvisor().then(() => (this.isMounted = true))
  },
  methods: {
    ...mapActions(['getSegmentAdvisor'])
  },
  computed: {
    ...mapGetters(['getOracleSegmentAdvisor', 'top10reclaimableChart'])
  }
}
</script>

<style lang="scss" scoped></style>
