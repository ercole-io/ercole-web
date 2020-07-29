<template>
  <section>
    <PageTitle />

    <BoxContent>
      <div class="columns">
        <div class="column is-3">
          <div class="columns">
            <div class="column is-12">
              <BoxContent title="Cluster" border>
                <div class="is-flex" style="justify-content: space-around;">
                  <p class="is-size-7 has-text-centered">
                    With Ercole <br />
                    <span class="is-size-5 has-text-weight-medium">
                      {{ getErcoleClusterCount.withErcole }}
                    </span>
                  </p>
                  <p class="is-size-7 has-text-centered">
                    Without Ercole <br />
                    <span class="is-size-5 has-text-weight-medium">
                      {{ getErcoleClusterCount.withoutErcole }}
                    </span>
                  </p>
                </div>
              </BoxContent>
            </div>
          </div>
          <div class="columns">
            <div class="column is-12">
              <BoxContent title="Type Of Virtualization" border>
                <ColumnChart
                  chartId="columnChart"
                  :columnChartData="getVirtualizationChartData"
                  stacked
                />
              </BoxContent>
            </div>
          </div>
        </div>

        <div class="column is-9">
          <TopTable>
            <b-input
              placeholder="Search on Hypervisors"
              size="is-small"
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
              @selectionChanged="clickedRow = $event"
              class="vTable-custom"
            >
              <thead slot="head">
                <tr class="has-background-grey-light">
                  <v-th sortKey="name">
                    Cluster Name
                  </v-th>
                  <v-th sortKey="type">Type</v-th>
                  <v-th sortKey="cpu">Core</v-th>
                  <v-th sortKey="sockets">Socket</v-th>
                  <v-th sortKey="hostname">
                    Phisical Host
                  </v-th>
                  <v-th sortKey="vmsCount">Total VM</v-th>
                  <v-th sortKey="vmsErcoleAgentCount">
                    Total VM Ercole
                  </v-th>
                </tr>
              </thead>
              <tbody slot="body" slot-scope="{ displayData }">
                <v-tr
                  v-for="(row, index) in displayData"
                  :key="index"
                  :row="row"
                >
                  <td>{{ row.name }}</td>
                  <td>{{ row.type }}</td>
                  <td>{{ row.cpu }}</td>
                  <td>{{ row.sockets }}</td>
                  <td>{{ row.hostname }}</td>
                  <td>{{ row.vmsCount }}</td>
                  <td>{{ row.vmsErcoleAgentCount }}</td>
                </v-tr>
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
                <exportButton url="hosts/clusters" expName="clusters-data" />
              </div>
            </template>
          </BottomTable>
        </div>
      </div>
    </BoxContent>
  </section>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import paginationMixin from '@/mixins/paginationMixin.js'
import PageTitle from '@/components/common/PageTitle.vue'
import BoxContent from '@/components/common/BoxContent.vue'
import TopTable from '@/components/common/TopTable.vue'
import BottomTable from '@/components/common/BottomTable.vue'
import SelectPerPage from '@/components/common/SelectPerPage.vue'
import ShowPerPage from '@/components/common/ShowPerPage.vue'
import exportButton from '@/components/common/exportButton.vue'
import ColumnChart from '@/components/common/charts/ColumnChart.vue'

export default {
  mixins: [paginationMixin],
  components: {
    PageTitle,
    BoxContent,
    TopTable,
    BottomTable,
    SelectPerPage,
    ShowPerPage,
    exportButton,
    ColumnChart
  },
  data() {
    return {
      filters: {
        search: {
          value: '',
          keys: [
            'name',
            'cpu',
            'type',
            'sockets',
            'hostname',
            'vmsCount',
            'vmsErcoleAgentCount'
          ]
        }
      },
      columnData: [
        {
          name: 'Type A',
          data: [['', 50]]
        },
        {
          name: 'Type B',
          data: [['', 20]]
        },
        {
          name: 'Type C',
          data: [['', 10]]
        },
        {
          name: 'Type D',
          data: [['', 60]]
        },
        {
          name: 'Type E',
          data: [['', 33]]
        },
        {
          name: 'Type F',
          data: [['', 42]]
        },
        {
          name: 'Type G',
          data: [['', 100]]
        },
        {
          name: 'Type H',
          data: [['', 70]]
        }
      ],
      clickedRow: []
    }
  },
  async beforeMount() {
    await this.getClusters()
    this.total = this.clusters.clusters
  },
  methods: {
    ...mapActions(['getClusters'])
  },
  computed: {
    ...mapState(['clusters']),
    ...mapGetters(['getErcoleClusterCount', 'getVirtualizationChartData'])
  },
  watch: {
    clickedRow(row) {
      if (row.length > 0) {
        const selectedRow = row[0].name
        this.$router.replace({
          name: 'cluster-details',
          params: { clustername: selectedRow }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
