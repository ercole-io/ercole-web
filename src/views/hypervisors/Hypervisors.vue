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
          <FullTable
            placeholder="Search on Hypervisors"
            :filters="filters"
            :tableData="data"
            :clickedRow="handleClickedRow"
          >
            <template slot="headData">
              <v-th sortKey="name">Cluster Name</v-th>
              <v-th sortKey="type">Type</v-th>
              <v-th sortKey="cpu">Core</v-th>
              <v-th sortKey="sockets">Socket</v-th>
              <v-th sortKey="hostname">Phisical Host</v-th>
              <v-th sortKey="vmsCount">Total VM</v-th>
              <v-th sortKey="vmsErcoleAgentCount">Total VM Ercole</v-th>
            </template>

            <template slot="bodyData" slot-scope="rowData">
              <td>{{ rowData.scope.name }}</td>
              <td>{{ rowData.scope.type }}</td>
              <td>{{ rowData.scope.cpu }}</td>
              <td>{{ rowData.scope.sockets }}</td>
              <td>{{ rowData.scope.hostname }}</td>
              <td>{{ rowData.scope.vmsCount }}</td>
              <td>{{ rowData.scope.vmsErcoleAgentCount }}</td>
            </template>

            <exportButton
              slot="export"
              url="hosts/clusters"
              expName="clusters-data"
            />
          </FullTable>
        </div>
      </div>
    </BoxContent>
  </section>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import PageTitle from '@/components/common/PageTitle.vue'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import exportButton from '@/components/common/exportButton.vue'
import ColumnChart from '@/components/common/charts/ColumnChart.vue'

export default {
  components: {
    PageTitle,
    BoxContent,
    FullTable,
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
      data: []
    }
  },
  async beforeMount() {
    await this.getClusters()
    this.data = this.clusters.clusters
  },
  methods: {
    ...mapActions(['getClusters']),
    handleClickedRow($event) {
      if ($event.length > 0) {
        const selectedRow = $event[0].name
        this.$router.replace({
          name: 'cluster-details',
          params: { clustername: selectedRow }
        })
      }
    }
  },
  computed: {
    ...mapState(['clusters']),
    ...mapGetters(['getErcoleClusterCount', 'getVirtualizationChartData'])
  }
}
</script>

<style lang="scss" scoped></style>
