<template>
  <section>
    <FullTable
      placeholder="Search on Oracle Segment Advisor"
      :keys="keys"
      :tableData="getOracleSegmentAdvisor"
      @clickedRow="handleClickedRow"
      isClickable
    >
      <template slot="headData">
        <v-th sortKey="reclaimable">Reclaimable GB</v-th>
        <v-th sortKey="segmentsSize">GB Total</v-th>
        <v-th sortKey="retrieve">Retrieve</v-th>
        <v-th sortKey="hostname">Hostname</v-th>
        <v-th sortKey="dbname">DB Name</v-th>
        <v-th sortKey="segmentOwner">Segment Owner</v-th>
        <v-th sortKey="segmentName">Segment Name</v-th>
        <v-th sortKey="segmentType">Segment Type</v-th>
        <v-th sortKey="partitionName">Partition Name</v-th>
        <v-th sortKey="recommendation">Recommendation</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent
          :value="rowData.scope.reclaimable | formatNumber('0.00', 'GB')"
        />
        <TdContent
          :value="rowData.scope.segmentsSize | formatNumber('0.00', 'GB')"
        />
        <TdContent
          :value="(rowData.scope.retrieve * 100) | formatNumber('0.00', '%')"
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
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import FullTable from '@/components/common/Table/FullTable.vue'
import exportButton from '@/components/common/exportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import HostLink from '@/components/common/Table/HostLink.vue'

export default {
  mixins: [hostnameLinkRow],
  components: {
    FullTable,
    exportButton,
    TdContent,
    HostLink
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
      ]
    }
  },
  async beforeMount() {
    await this.getSegmentAdvisor()
  },
  methods: {
    ...mapActions(['getSegmentAdvisor'])
  },
  computed: {
    ...mapGetters(['getOracleSegmentAdvisor'])
  }
}
</script>

<style lang="scss" scoped></style>
