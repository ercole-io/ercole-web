<template>
  <section>
    <FullTable
      placeholder="Search on Oracle ADDM"
      :keys="keys"
      :tableData="getOracleAddms"
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
        <HostLink :hostname="rowData.scope.hostname" />
        <TdContent :value="rowData.scope.dbname" />
        <TdContent :value="rowData.scope.finding" />
        <TdContent :value="rowData.scope.recommendation" />
        <TdContent :value="rowData.scope.action" />
      </template>

      <exportButton
        slot="export"
        url="hosts/technologies/oracle/databases/addms"
        expName="oracleADDM"
      />
    </FullTable>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FullTable from '@/components/common/Table/FullTable.vue'
import exportButton from '@/components/common/exportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import HostLink from '@/components/common/Table/HostLink.vue'

export default {
  components: {
    FullTable,
    exportButton,
    TdContent,
    HostLink
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
      ]
    }
  },
  async beforeMount() {
    await this.getAddms()
  },
  methods: {
    ...mapActions(['getAddms'])
  },
  computed: {
    ...mapGetters(['getOracleAddms'])
  }
}
</script>

<style lang="scss" scoped></style>
