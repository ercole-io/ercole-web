<template>
  <div>
    <PageTitle />

    <BoxContent>
      <!--
      <div class="table-container">
        <v-table
          :data="total"
          :filters="filters"
          :hideSortIcons="true"
          :currentPage.sync="currentPage"
          :pageSize="perPage"
          @totalPagesChanged="totalPages = $event"
          class="vTable-custom"
        >
          <thead slot="head">
            <tr class="has-background-grey-light">
              <v-th sortKey="hostname">Hostname</v-th>
              <v-th sortKey="dbName">DB Name</v-th>
              <v-th sortKey="licenseName">License Name</v-th>
              <v-th sortKey="usedLicenses">Purchased Licenses</v-th>
            </tr>
          </thead>
          <tbody slot="body" slot-scope="{ displayData }">
            <tr v-for="row in displayData" :key="row._id">
              <td>{{ row.hostname }}</td>
              <td>{{ row.dbName }}</td>
              <td>{{ row.licenseName }}</td>
              <td>{{ row.usedLicenses }}</td>
            </tr>
          </tbody>
        </v-table>
      </div> -->

      <FullTable
        placeholder="Search on Hypervisors"
        :filters="filters"
        :tableData="data"
        :clickedRow="() => []"
      >
        <template slot="headData">
          <v-th sortKey="hostname">Hostname</v-th>
          <v-th sortKey="dbName">DB Name</v-th>
          <v-th sortKey="licenseName">License Name</v-th>
          <v-th sortKey="usedLicenses">Purchased Licenses</v-th>
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
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import paginationMixin from '@/mixins/paginationMixin.js'
import PageTitle from '@/components/common/PageTitle.vue'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import exportButton from '@/components/common/exportButton.vue'

export default {
  mixins: [paginationMixin],
  components: {
    PageTitle,
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
