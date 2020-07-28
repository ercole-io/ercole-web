<template>
  <section>
    <PageTitle />

    <boxContent>
      <div class="columns">
        <div class="column is-3">
          <div class="columns">
            <div class="column is-12">
              <BoxContent :title="`Cluster: ${clustername}`" border>
                <div class="is-flex" style="justify-content: space-around;">
                  <p class="is-size-7 has-text-centered">
                    Type <br />
                    <span class="is-size-5 has-text-weight-medium">
                      {{ clusters.currentCluster.type }}
                    </span>
                  </p>
                  <p class="is-size-7 has-text-centered">
                    Physical Host <br />
                    <span class="is-size-5 has-text-weight-medium">
                      {{ clusters.currentCluster.virtualizationNodesCount }}
                    </span>
                  </p>
                </div>
              </BoxContent>
            </div>
          </div>
          <div class="columns">
            <div class="column is-12">
              <BoxContent>
                <div class="is-flex" style="justify-content: space-around;">
                  <p class="is-size-7 has-text-centered">
                    CPU <br />
                    <span class="is-size-5 has-text-weight-medium">
                      {{ clusters.currentCluster.cpu }}
                    </span>
                  </p>
                  <p class="is-size-7 has-text-centered">
                    Sockets <br />
                    <span class="is-size-5 has-text-weight-medium">
                      {{ clusters.currentCluster.sockets }}
                    </span>
                  </p>
                </div>
              </BoxContent>
            </div>
          </div>
          <div class="columns">
            <div class="column is-12">
              <BarChart
                chartId="barChart"
                :barChartData="getClusterChartData"
                stacked
              />
            </div>
          </div>
        </div>

        <div class="column is-9">
          <TopTable>
            <b-input
              placeholder="Search on Cluster"
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
                  <v-th sortKey="virtualizationNode">
                    Physical Host
                  </v-th>
                  <v-th sortKey="hostname">Hostname</v-th>
                  <v-th sortKey="name">VM Name</v-th>
                  <v-th sortKey="cappedCPU">Capped CPU</v-th>
                </tr>
              </thead>
              <tbody slot="body" slot-scope="{ displayData }">
                <v-tr
                  v-for="(row, index) in displayData"
                  :key="index"
                  :row="row"
                >
                  <td>{{ row.virtualizationNode }}</td>
                  <td>{{ row.hostname }}</td>
                  <td>{{ row.name }}</td>
                  <td>{{ row.cappedCPU }}</td>
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
    </boxContent>
  </section>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters, mapState } from 'vuex'
import paginationMixin from '@/mixins/paginationMixin.js'
import PageTitle from '@/components/common/PageTitle.vue'
import BoxContent from '@/components/common/BoxContent.vue'
import TopTable from '@/components/common/TopTable.vue'
import BottomTable from '@/components/common/BottomTable.vue'
import SelectPerPage from '@/components/common/SelectPerPage.vue'
import ShowPerPage from '@/components/common/ShowPerPage.vue'
import exportButton from '@/components/common/exportButton.vue'
import BarChart from '@/components/common/charts/BarChart.vue'

export default {
  mixins: [paginationMixin],
  props: ['clustername'],
  components: {
    PageTitle,
    BoxContent,
    TopTable,
    BottomTable,
    SelectPerPage,
    ShowPerPage,
    exportButton,
    BarChart
  },
  data() {
    return {
      filters: {
        search: {
          value: '',
          keys: ['virtualizationNode', 'name', 'hostname', 'cappedCPU']
        }
      },
      barData: [
        {
          name: 'With Ercole',
          data: [
            ['s157-uiopuiop', 0],
            ['s157-yzxcxcyz', 0]
          ]
        },
        {
          name: 'Without Ercole',
          data: [
            ['s157-uiopuiop', 1],
            ['s157-yzxcxcyz', 1]
          ]
        }
      ]
    }
  },
  async beforeMount() {
    bus.$emit('dynamicTitle', this.clustername)
    await this.getClusterByName(this.clustername)

    this.total = this.clusters.currentCluster.vms
    console.log(this.getClusterChartData)
  },
  methods: {
    ...mapActions(['getClusterByName'])
  },
  computed: {
    ...mapState(['clusters']),
    ...mapGetters(['getClusterChartData'])
  }
}
</script>

<style lang="scss" scoped></style>
