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
          <FullTable
            placeholder="Search on Cluster"
            :filters="filters"
            :tableData="data"
            :clickedRow="() => []"
          >
            <template slot="headData">
              <v-th sortKey="virtualizationNode">Physical Host</v-th>
              <v-th sortKey="hostname">Hostname</v-th>
              <v-th sortKey="name">VM Name</v-th>
              <v-th sortKey="cappedCPU">Capped CPU</v-th>
            </template>

            <template slot="bodyData" slot-scope="rowData">
              <td>{{ rowData.scope.virtualizationNode }}</td>
              <td>{{ rowData.scope.hostname }}</td>
              <td>{{ rowData.scope.name }}</td>
              <td>{{ rowData.scope.cappedCPU }}</td>
            </template>

            <exportButton
              slot="export"
              :url="`hosts/clusters/${clustername}`"
              :expName="`cluster-${clustername}`"
            />
          </FullTable>
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
import FullTable from '@/components/common/Table/FullTable.vue'
import exportButton from '@/components/common/exportButton.vue'
import BarChart from '@/components/common/charts/BarChart.vue'

export default {
  mixins: [paginationMixin],
  props: ['clustername'],
  components: {
    PageTitle,
    BoxContent,
    FullTable,
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
      data: []
    }
  },
  async beforeMount() {
    await this.getClusterByName(this.clustername)
    bus.$emit('dynamicTitle', this.clustername)

    this.data = this.clusters.currentCluster.vms
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
