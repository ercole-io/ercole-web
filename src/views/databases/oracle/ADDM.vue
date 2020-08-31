<template>
  <section>
    <FullTable
      placeholder="Search on Oracle ADDM"
      :keys="keys"
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
        <TdContent :value="rowData.scope.benefit" />
        <TdContent :value="rowData.scope.hostname" />
        <TdContent :value="rowData.scope.dbname" />
        <TdContent :value="rowData.scope.finding" />
        <TdContent :value="rowData.scope.recommendation" />
        <TdContent :value="rowData.scope.action" />
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
        'benefit',
        'hostname',
        'dbname',
        'finding',
        'recommendation',
        'action'
      ],
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
