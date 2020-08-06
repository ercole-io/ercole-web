<template>
  <section>
    <FullTable
      placeholder="Search on Oracle ADDM"
      :filters="filters"
      :tableData="data"
      :clickedRow="() => []"
    >
      <template slot="headData">
        <v-th sortKey="benefit">Performance Impact</v-th>
        <v-th sortKey="hostname">Hostname</v-th>
        <v-th sortKey="dbname">Database</v-th>
        <v-th sortKey="finding">Finding</v-th>
        <v-th sortKey="recommendation">Recommendation</v-th>
        <v-th sortKey="action">Action</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <td>{{ rowData.scope.benefit }}</td>
        <td>{{ rowData.scope.hostname }}</td>
        <td>{{ rowData.scope.dbname }}</td>
        <td>{{ rowData.scope.finding }}</td>
        <td>{{ rowData.scope.recommendation }}</td>
        <td>{{ rowData.scope.action }}</td>
      </template>

      <exportButton
        slot="export"
        url="/hosts/technologies/oracle/databases/addms"
        expName="oracleADDM"
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
            'benefit',
            'hostname',
            'dbname',
            'finding',
            'recommendation',
            'action'
          ]
        }
      },
      data: []
    }
  },
  async beforeMount() {
    await this.getAddms()
    this.data = this.oracleAddm.addms
  },
  methods: {
    ...mapActions(['getAddms'])
  },
  computed: {
    ...mapState(['oracleAddm'])
  }
}
</script>

<style lang="scss" scoped></style>
