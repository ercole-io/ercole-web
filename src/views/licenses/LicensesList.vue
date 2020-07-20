<template>
  <div>
    <PageTitle>
      <LicensesInfo :info="{ licenses: totalItems }" />
    </PageTitle>

    <BoxContent>
      <TopTable>
        <b-field
          class="search"
          custom-class="is-small"
          label="Search on Licenses"
          horizontal
        >
          <b-input size="is-small" v-model="filters.search.value" />
        </b-field>

        <SelectPerPage :totalItem="totalItems" />
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
              <v-th sortKey="number">Number</v-th>
            </tr>
          </thead>
          <tbody slot="body" slot-scope="{ displayData }">
            <tr v-for="row in displayData" :key="row._id">
              <td>{{ row.hostname }}</td>
              <td>{{ row.dbName }}</td>
              <td>{{ row.licenseName }}</td>
              <td>{{ row.number }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>

      <BottomTable>
        <template slot="info">
          Showing {{ perPage }} hosts from {{ totalItems }}
        </template>
        <template>
          <smart-pagination
            :currentPage.sync="currentPage"
            :totalPages="totalPages"
            :maxPageLinks="maxPageLinks"
          />

          <div class="buttons">
            <b-button type="is-primary" size="is-small">
              Export Data
            </b-button>
          </div>
        </template>
      </BottomTable>
    </BoxContent>
  </div>
</template>

<script>
import paginationMixin from '@/mixins/paginationMixin.js'
import PageTitle from '@/components/common/PageTitle.vue'
import BoxContent from '@/components/common/BoxContent.vue'
import SelectPerPage from '@/components/common/SelectPerPage.vue'
import TopTable from '@/components/common/TopTable.vue'
import BottomTable from '@/components/common/BottomTable.vue'
import LicensesInfo from '@/components/licenses/LicensesInfo.vue'

export default {
  mixins: [paginationMixin],
  components: {
    PageTitle,
    BoxContent,
    SelectPerPage,
    TopTable,
    BottomTable,
    LicensesInfo
  },
  data() {
    return {
      licenses: [
        {
          hostname: 'sorsedash0.sorint.it',
          dbName: 'DB27',
          licenseName: 'Oracle STD',
          number: 12
        },
        {
          hostname: 'sorsedash1.sorint.it',
          dbName: 'DB28',
          licenseName: 'Oracle EXE',
          number: 10
        },
        {
          hostname: 'sorsedash2.sorint.it',
          dbName: 'DB30',
          licenseName: 'Oracle ENT',
          number: 8
        },
        {
          hostname: 'sorsedash3.sorint.it',
          dbName: 'DB35',
          licenseName: 'Oracle ENT',
          number: 6
        },
        {
          hostname: 'sorsedash4.sorint.it',
          dbName: 'DB15',
          licenseName: 'Oracle EXE',
          number: 19
        },
        {
          hostname: 'sorsedash8.sorint.it',
          dbName: 'DB18',
          licenseName: 'Advanced Security',
          number: 7
        },
        {
          hostname: 'sorsedash5.sorint.it',
          dbName: 'DB10',
          licenseName: 'Active Data Guard',
          number: 2
        },
        {
          hostname: 'sorsedash6.sorint.it',
          dbName: 'DB17',
          licenseName: 'Active Data Guard',
          number: 10
        }
      ],
      filters: {
        search: {
          value: '',
          keys: ['hostname', 'dbName', 'licenseName', 'number']
        }
      }
    }
  },
  beforeMount() {
    this.total = this.licenses
    this.$store.dispatch('getLicensesData')
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
