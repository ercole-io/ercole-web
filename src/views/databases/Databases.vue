<template>
  <section>
    <div class="columns">
      <div class="column is-3">
        <div class="columns">
          <div class="column is-12">
            <div class="is-flex" style="justify-content: space-around;">
              <p class="is-size-7 has-text-centered" style="margin-bottom: 0">
                CPU <br />
                <span class="is-size-7 has-text-weight-light">
                  Total Thread Used
                </span>
                <br />
                <span class="is-size-5 has-text-weight-medium">
                  {{ getTotalCpu }}
                </span>
              </p>
              <p class="is-size-7 has-text-centered" style="margin-bottom: 0">
                Memory <br />
                <span class="is-size-7 has-text-weight-light">
                  Total Memory Size
                </span>
                <br />
                <span class="is-size-5 has-text-weight-medium">
                  {{ databases.totalMemory | formatNumber('0.00', 'TB') }}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <p class="is-size-7 has-text-centered" style="margin-bottom: 0">
              Storage
            </p>
            <div class="is-flex" style="justify-content: space-around;">
              <p class="has-text-centered">
                <span class="is-size-7 has-text-weight-light">
                  Total Segment Size
                </span>
                <br />
                <span class="is-size-5 has-text-weight-medium">
                  {{ databases.totalSegment | formatNumber('0.00', 'TB') }}
                </span>
              </p>
              <p class="has-text-centered">
                <span class="is-size-7 has-text-weight-light">
                  Total Datafile Size
                </span>
                <br />
                <span class="is-size-5 has-text-weight-medium">
                  {{ databases.totalDatafile | formatNumber('0.00', 'TB') }}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <BarChart
              chartId="barChart"
              :barChartData="getChartData"
              :legend="false"
              stacked
            />
          </div>
        </div>
      </div>
      <div class="column is-9">
        <FullTable
          placeholder="Search on Databases"
          :filters="filters"
          :tableData="data"
          :clickedRow="() => []"
        >
          <template slot="headData">
            <v-th sortKey="name">DB Name</v-th>
            <v-th sortKey="type">DB Type</v-th>
            <v-th sortKey="version">DB Version</v-th>
            <v-th sortKey="hostname">Hostname</v-th>
            <v-th sortKey="environment">Env.</v-th>
            <v-th sortKey="charset">Charset</v-th>
            <v-th sortKey="memory">Mem.</v-th>
            <v-th sortKey="datafileSize">DataFile</v-th>
            <v-th sortKey="segmentsSize">Seg.</v-th>
            <v-th sortKey="archivelog">A</v-th>
            <v-th sortKey="dataguard">D</v-th>
            <v-th sortKey="ha">HA</v-th>
          </template>

          <template slot="bodyData" slot-scope="rowData">
            <TdContent :value="rowData.scope.name" />
            <TdContent :value="rowData.scope.type" />
            <TdContent :value="rowData.scope.version" />
            <TdContent :value="rowData.scope.hostname" />
            <TdContent :value="rowData.scope.environment" />
            <TdContent :value="rowData.scope.charset" />
            <TdContent
              :value="rowData.scope.memory | formatNumber('0.00', 'TB')"
            />
            <TdContent :value="rowData.scope.datafileSize" />
            <TdContent :value="rowData.scope.segmentsSize" />
            <TdIcon :value="mapBooleanIcon(rowData.scope.archivelog)" />
            <TdIcon :value="mapBooleanIcon(rowData.scope.dataguard)" />
            <TdIcon :value="mapBooleanIcon(rowData.scope.ha)" />
          </template>

          <exportButton
            slot="export"
            url="/hosts/technologies/oracle/databases"
            expName="databases"
          />
        </FullTable>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import FullTable from '@/components/common/Table/FullTable.vue'
import exportButton from '@/components/common/exportButton.vue'
import BarChart from '@/components/common/charts/BarChart.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'

export default {
  components: {
    FullTable,
    exportButton,
    BarChart,
    TdContent,
    TdIcon
  },
  data() {
    return {
      filters: {
        search: {
          value: '',
          keys: [
            'name',
            'type',
            'version',
            'hostname',
            'environment',
            'charset',
            'memory',
            'datafileSize',
            'segmentsSize',
            'archivelog',
            'dataguard',
            'ha'
          ]
        }
      },
      data: []
    }
  },
  async beforeMount() {
    await this.getDatabases()
    this.data = this.databases.databases
  },
  methods: {
    ...mapActions(['getDatabases']),
    mapBooleanIcon(value) {
      return value
        ? ['circle', 'fas', 'is-success', 'yes']
        : ['circle', 'fas', 'is-danger', 'no']
    }
  },
  computed: {
    ...mapState(['databases']),
    ...mapGetters(['getTotalCpu', 'getChartData'])
  }
}
</script>

<style lang="scss" scoped></style>
