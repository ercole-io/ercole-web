<template>
  <section>
    <BoxContent>
      <FullTable
        placeholder="Search on Licenses"
        :filters="filters"
        :tableData="data"
        :clickedRow="() => []"
      >
        <template slot="headData">
          <v-th sortKey="hostname">Hostname</v-th>
          <v-th sortKey="dbName">DB Name</v-th>
          <v-th sortKey="licenseName">License Name</v-th>
          <v-th sortKey="usedLicenses">Used Licenses</v-th>
        </template>

        <template slot="bodyData" slot-scope="rowData">
          <td>{{ rowData.scope.hostname }}</td>
          <td>{{ rowData.scope.dbName }}</td>
          <td>{{ rowData.scope.licenseName }}</td>
          <td>{{ rowData.scope.usedLicenses }}</td>
        </template>

        <exportButton
          slot="export"
          url="licenses?mode=list"
          expName="licenses-list-data"
        />
      </FullTable>
    </BoxContent>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import paginationMixin from '@/mixins/paginationMixin.js'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import exportButton from '@/components/common/exportButton.vue'

export default {
  mixins: [paginationMixin],
  components: {
    BoxContent,
    FullTable,
    exportButton
  },
  data() {
    return {
      filters: {
        search: {
          value: '',
          keys: ['hostname', 'dbName', 'licenseName', 'usedLicenses']
        }
      },
      data: []
    }
  },
  async beforeMount() {
    await this.getLicensesList()
    this.data = this.licenses.licenseList
  },
  methods: {
    ...mapActions(['getLicensesList'])
  },
  computed: {
    ...mapState(['licenses'])
  }
}
</script>

<style lang="scss" scoped></style>
