<template>
  <div>
    <PageTitle />

    <BoxContent>
      <TopTable>
        <b-input
          size="is-small"
          placeholder="Search on Licenses"
          v-model="filters.search.value"
        />

        <SelectPerPage :totalItems="total.length" />
      </TopTable>

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
      </div>

      <BottomTable>
        <ShowPerPage
          slot="info"
          :totalItems="total.length"
          :perPage="perPage"
        />
        <template>
          <smart-pagination
            :currentPage.sync="currentPage"
            :totalPages="totalPages"
            :maxPageLinks="maxPageLinks"
          />

          <div class="buttons">
            <exportButton
              url="licenses?mode=list"
              expName="licenses-list-data"
            />
          </div>
        </template>
      </BottomTable>
    </BoxContent>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import paginationMixin from '@/mixins/paginationMixin.js'
import PageTitle from '@/components/common/PageTitle.vue'
import BoxContent from '@/components/common/BoxContent.vue'
import SelectPerPage from '@/components/common/SelectPerPage.vue'
import TopTable from '@/components/common/TopTable.vue'
import BottomTable from '@/components/common/BottomTable.vue'
import ShowPerPage from '@/components/common/ShowPerPage.vue'
import exportButton from '@/components/common/exportButton.vue'

export default {
  mixins: [paginationMixin],
  components: {
    PageTitle,
    BoxContent,
    SelectPerPage,
    TopTable,
    BottomTable,
    ShowPerPage,
    exportButton
  },
  data() {
    return {
      filters: {
        search: {
          value: '',
          keys: ['hostname', 'dbName', 'licenseName', 'usedLicenses']
        }
      }
    }
  },
  async beforeMount() {
    await this.getLicensesList()
    this.total = this.licenses.licenseList
  },
  methods: {
    ...mapActions(['getLicensesList'])
  },
  computed: {
    ...mapState(['licenses'])
  }
}
</script>

<style lang="scss">
.search {
  margin-bottom: 0;

  .field-label {
    .label {
      min-width: 110px;
    }
  }
}
</style>
