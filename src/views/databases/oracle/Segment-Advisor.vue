<template>
  <section>
    <FullTable
      placeholder="Search on Oracle Segment Advisor"
      :keys="keys"
      :tableData="data"
      :clickedRow="() => []"
    >
      <template slot="headData">
        <v-th sortKey="reclaimable">Reclaimable GB</v-th>
        <v-th sortKey="gbTotal">GB Total</v-th>
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
        <TdContent :value="rowData.scope.gbTotal" />
        <TdContent :value="rowData.scope.retrieve" />
        <TdContent :value="rowData.scope.hostname" />
        <TdContent :value="rowData.scope.dbname" />
        <TdContent :value="rowData.scope.segmentOwner" />
        <TdContent :value="rowData.scope.segmentName" />
        <TdContent :value="rowData.scope.segmentType" />
        <TdContent :value="rowData.scope.partitionName" />
        <TdContent :value="rowData.scope.recommendation" />
      </template>

      <exportButton
        slot="export"
        url="/hosts/technologies/oracle/databases/segment-advisors"
        expName="oraclePatchAdvisor"
      />
    </FullTable>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import FullTable from '@/components/common/Table/FullTable.vue'
import exportButton from '@/components/common/exportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  components: {
    FullTable,
    exportButton,
    TdContent
  },
  data() {
    return {
      keys: [
        'reclaimable',
        'gbTotal',
        'retrieve',
        'hostname',
        'dbname',
        'segmentOwner',
        'segmentName',
        'segmentType',
        'partitionName',
        'recommendation'
      ],
      data: []
    }
  },
  async beforeMount() {
    await this.getSegmentAdvisor()
    this.data = this.oracleSegmentAdvisor.segmentAdvisor
  },
  methods: {
    ...mapActions(['getSegmentAdvisor'])
  },
  computed: {
    ...mapState(['oracleSegmentAdvisor'])
  }
}
</script>

<style lang="scss" scoped></style>
