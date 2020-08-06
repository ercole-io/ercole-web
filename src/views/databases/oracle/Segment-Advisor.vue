<template>
  <section>
    <FullTable
      placeholder="Search on Oracle Segment Advisor"
      :filters="filters"
      :tableData="data"
      :clickedRow="() => []"
    >
      <template slot="headData">
        <v-th sortKey="reclaimableGb">Reclaimable GB</v-th>
        <v-th sortKey="gbTotal">GB Total</v-th>
        <v-th sortKey="retrieve">Retrieve</v-th>
        <v-th sortKey="hostname">Hostname</v-th>
        <v-th sortKey="dbName">DB Name</v-th>
        <v-th sortKey="segOwner">Segment Owner</v-th>
        <v-th sortKey="segName">Segment Name</v-th>
        <v-th sortKey="segType">Segment Type</v-th>
        <v-th sortKey="partName">Partition Name</v-th>
        <v-th sortKey="recommendation">Recommendation</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <td>{{ rowData.scope.reclaimableGb }}</td>
        <td>{{ rowData.scope.gbTotal }}</td>
        <td>{{ rowData.scope.retrieve }}</td>
        <td>{{ rowData.scope.hostname }}</td>
        <td>{{ rowData.scope.dbName }}</td>
        <td>{{ rowData.scope.segOwner }}</td>
        <td>{{ rowData.scope.segName }}</td>
        <td>{{ rowData.scope.segType }}</td>
        <td>{{ rowData.scope.partName }}</td>
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
            'reclaimableGb',
            'gbTotal',
            'retrieve',
            'hostname',
            'dbName',
            'segOwner',
            'segName',
            'segType',
            'partName',
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
