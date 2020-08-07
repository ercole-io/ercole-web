<template>
  <section>
    <FullTable
      placeholder="Search on Oracle Patch Advisor"
      :filters="filters"
      :tableData="data"
      :clickedRow="() => []"
    >
      <template slot="headData">
        <v-th sortKey="hostname">Hostname</v-th>
        <v-th sortKey="dbname">Database</v-th>
        <v-th sortKey="dbver">Version</v-th>
        <v-th sortKey="date">Release Date</v-th>
        <v-th sortKey="description">PSU</v-th>
        <v-th sortKey="fourMonth">4 Month</v-th>
        <v-th sortKey="sixMonth">6 Month</v-th>
        <v-th sortKey="twelveMonth">12 Month</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <td>{{ rowData.scope.hostname }}</td>
        <td>{{ rowData.scope.dbname }}</td>
        <td>{{ rowData.scope.dbver }}</td>
        <td>{{ rowData.scope.date | formatDate }}</td>
        <td>{{ rowData.scope.description }}</td>
        <td>{{ compareDates(rowData.scope.date) }}</td>
        <td>{{ compareDates(rowData.scope.date) }}</td>
        <td>{{ compareDates(rowData.scope.date) }}</td>
      </template>

      <exportButton
        slot="export"
        url="/hosts/technologies/oracle/databases/patch-advisors"
        expName="oraclePatchAdvisor"
      />
    </FullTable>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'
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
            'hostname',
            'dbname',
            'dbver',
            'date',
            'description',
            'fourMonth',
            'sixMonth',
            'twelveMonth'
          ]
        }
      },
      data: []
    }
  },
  async beforeMount() {
    await this.getPatchAdvisor()
    this.data = this.oraclePatchAdvisor.patchAdvisor
  },
  methods: {
    ...mapActions(['getPatchAdvisor']),
    compareDates(date) {
      const actualDate = moment.utc().format()
      const formatDate = moment.utc(date).format()
      return formatDate < actualDate ? 'KO' : 'OK'
    }
  },
  computed: {
    ...mapState(['oraclePatchAdvisor'])
  }
}
</script>

<style lang="scss" scoped></style>
