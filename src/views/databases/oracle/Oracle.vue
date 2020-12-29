<template>
  <section>
    <div class="columns">
      <div class="column is-6">
        <BoxContent title="Top 3 Instance Workload" border>
          <!-- <a
            class="is-size-7 is-italic has-text-weight-normal has-text-dark"
            style="text-decoration: underline;"
            slot="customTitle"
          >
            see the top 10 >>>
          </a> -->
          <div class="columns py-1 px-4">
            <table class="table is-striped">
              <thead>
                <tr class="has-background-light">
                  <th class="is-size-7 has-text-dark"></th>
                  <th class="is-size-7 has-text-dark">Host Name</th>
                  <th class="is-size-7 has-text-dark has-text-centered">
                    DB Name
                  </th>
                  <th class="is-size-7 has-text-dark has-text-centered">
                    Thread Utilization
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(workload, index) in getTopWorkload"
                  :key="workload._id"
                >
                  <td class="is-size-5 has-text-centered">
                    <span
                      class="icon is-size-3"
                      :style="{ color: workload.color }"
                      style="position:relative"
                    >
                      <i class="fas fa-star" />
                      <span
                        class="is-size-6 has-text-grey-darker"
                        style="position: absolute; top: 2px;"
                      >
                        {{ index + 1 }}
                      </span>
                    </span>
                  </td>
                  <td class="is-size-7">
                    {{ workload.hostname }}
                  </td>
                  <td class="is-size-7 has-text-centered">
                    {{ workload.dbname }}
                  </td>
                  <td class="is-size-7 has-text-centered">
                    {{ workload.workload }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </BoxContent>
      </div>
      <div class="column is-6">
        <BoxContent title="Top 3 Unused Instance Resource" border>
          <!-- <a
            class="is-size-7 is-italic has-text-weight-normal has-text-dark"
            style="text-decoration: underline;"
            slot="customTitle"
          >
            see the top 10 >>>
          </a> -->
          <div class="columns py-1 px-4">
            <table class="table is-striped">
              <thead>
                <tr class="has-background-light">
                  <th class="is-size-7 has-text-dark"></th>
                  <th class="is-size-7 has-text-dark">Host Name</th>
                  <th class="is-size-7 has-text-dark has-text-centered">
                    DB Name
                  </th>
                  <th class="is-size-7 has-text-dark has-text-centered">
                    Thread Utilization
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(reclaimable, index) in getTopReclaimable"
                  :key="reclaimable._id"
                >
                  <td class="is-size-5 has-text-centered">
                    <span
                      class="icon is-size-3"
                      :style="{ color: reclaimable.color }"
                      style="position:relative"
                    >
                      <i class="fas fa-star" />
                      <span
                        class="is-size-6 has-text-grey-darker"
                        style="position: absolute; top: 2px;"
                      >
                        {{ index + 1 }}
                      </span>
                    </span>
                  </td>
                  <td class="is-size-7">
                    {{ reclaimable.hostname }}
                  </td>
                  <td class="is-size-7 has-text-centered">
                    {{ reclaimable.dbname }}
                  </td>
                  <td class="is-size-7 has-text-centered">
                    {{ reclaimable.reclaimableSegmentAdvisors }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </BoxContent>
      </div>
    </div>

    <div class="columns">
      <div class="column is-3">
        <div class="columns">
          <div class="column is-12">
            <Collapse title="Type Of Environment" id="TypeOfEnvironment" isOpen>
              <ColumnChart
                chartId="et"
                :columnChartData="getEnvironmentTypeChartDataOracle"
                chartHeight="150px"
                stacked
              />
            </Collapse>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <Collapse title="Archivelog Mode" id="ArchivelogMode">
              <ColumnChart
                chartId="al"
                :columnChartData="getArchivelogChartDataOracle"
                chartHeight="150px"
                stacked
              />
            </Collapse>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <Collapse title="Disaster Recovery" id="DisasterRecovery">
              <ColumnChart
                chartId="dr"
                :columnChartData="getDataguardChartDataOracle"
                chartHeight="150px"
                stacked
              />
            </Collapse>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <Collapse title="High Availability" id="HighAvailability">
              <ColumnChart
                chartId="ha"
                :columnChartData="getHaChartDataOracle"
                chartHeight="150px"
                stacked
              />
            </Collapse>
          </div>
        </div>
      </div>
      <div class="column is-9">
        <FullTable
          placeholder="Search on Oracle DBs"
          :keys="keys"
          :tableData="getAllOracleDBs"
          :clickedRow="() => []"
        >
          <template slot="headData">
            <v-th sortKey="name">DB Name</v-th>
            <v-th sortKey="version">DB Version</v-th>
            <v-th sortKey="hostname">Hostname</v-th>
            <v-th sortKey="environment">Env.</v-th>
            <v-th sortKey="charset">Charset</v-th>
            <v-th sortKey="work">Work</v-th>
            <v-th sortKey="cpuCount">CPU Count</v-th>
            <v-th sortKey="blockSize">Block Size</v-th>
            <v-th sortKey="status">Status</v-th>
            <v-th sortKey="uniqueName">Unique Name</v-th>
            <v-th sortKey="memory">Memory (GB)</v-th>
            <v-th sortKey="datafileSize">Datafile size (GB)</v-th>
            <v-th sortKey="segmentsSize">Segment size (GB)</v-th>
            <v-th sortKey="archivelog">Archivelog Mode</v-th>
            <v-th sortKey="dataguard">DR</v-th>
            <v-th sortKey="ha">HA</v-th>
          </template>

          <template slot="bodyData" slot-scope="rowData">
            <TdContent :value="rowData.scope.name" />
            <TdContent :value="rowData.scope.version" />
            <HostLink
              :hostname="[rowData.scope.hostname, rowData.scope.name]"
            />
            <TdContent :value="rowData.scope.environment" />
            <TdContent :value="rowData.scope.charset" />
            <TdContent :value="rowData.scope.work" />
            <TdContent :value="rowData.scope.cpuCount" />
            <TdContent :value="rowData.scope.blockSize" />
            <TdContent :value="rowData.scope.status" />
            <TdContent :value="rowData.scope.uniqueName" />
            <TdContent :value="rowData.scope.memory | formatNumber('0.00')" />
            <TdContent :value="rowData.scope.datafileSize" />
            <TdContent :value="rowData.scope.segmentsSize" />
            <TdIcon :value="bindIcon(rowData.scope.archivelog)" />
            <TdIcon :value="bindIcon(rowData.scope.dataguard)" />
            <TdIcon :value="bindIcon(rowData.scope.ha)" />
          </template>

          <exportButton
            slot="export"
            url="hosts/technologies/oracle/databases"
            expName="oracleDbs"
          />
        </FullTable>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import exportButton from '@/components/common/exportButton.vue'
import ColumnChart from '@/components/common/charts/ColumnChart.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import Collapse from '@/components/common/Collapse.vue'
import { mapBooleanIcon } from '@/helpers/helpers.js'
import HostLink from '@/components/common/Table/HostLink.vue'

export default {
  components: {
    BoxContent,
    FullTable,
    exportButton,
    ColumnChart,
    TdContent,
    TdIcon,
    Collapse,
    HostLink
  },
  data() {
    return {
      keys: [
        'name',
        'version',
        'hostname',
        'environment',
        'charset',
        'memory',
        'datafileSize',
        'segmentsSize',
        'archivelog',
        'dataguard',
        'ha',
        'work',
        'blockSize',
        'cpuCount',
        'status',
        'uniqueName'
      ]
    }
  },
  async beforeMount() {
    await this.getOracleDbs()
  },
  methods: {
    ...mapActions(['getOracleDbs']),
    bindIcon(value) {
      return mapBooleanIcon(value)
    }
  },
  computed: {
    ...mapGetters([
      'getAllOracleDBs',
      'getEnvironmentTypeChartDataOracle',
      'getArchivelogChartDataOracle',
      'getDataguardChartDataOracle',
      'getHaChartDataOracle',
      'getTopWorkload',
      'getTopReclaimable'
    ])
  }
}
</script>

<style lang="scss" scoped>
.top3 {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 33.3%;

  span:not(.number-marker) {
    font-size: 0.65em;
  }

  p {
    margin-bottom: 0.5em;
    font-size: 0.9em;
    font-weight: 500;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 100%;
  }
}

.number-marker {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background-color: #4a4a4a;
  color: #ffffff;
  font-weight: bold;
  font-size: 18px;
  padding-top: 1px;
  margin-bottom: 5px;
}
</style>
