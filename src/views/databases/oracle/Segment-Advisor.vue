<template>
  <section>
    <FullTable
      placeholder="Search on Oracle Segment Advisor"
      :filters="filters"
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
        <td>{{ rowData.scope.reclaimable | formatNumber('0.00') }} GB</td>
        <td>{{ rowData.scope.gbTotal }}</td>
        <td>{{ rowData.scope.retrieve }}</td>
        <td>{{ rowData.scope.hostname }}</td>
        <td>{{ rowData.scope.dbname }}</td>
        <td>{{ rowData.scope.segmentOwner }}</td>
        <td>{{ rowData.scope.segmentName }}</td>
        <td>{{ rowData.scope.segmentType }}</td>
        <td>{{ rowData.scope.partitionName }}</td>
        <td>{{ rowData.scope.recommendation }}</td>
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

export default {
  components: {
    FullTable,
    exportButton
  },
  data() {
    return {
      filters: {
        search: {
          value: '',
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
          ]
        }
      },
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
