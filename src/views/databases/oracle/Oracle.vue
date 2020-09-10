<template>
  <section>
    <div class="columns">
      <div class="column is-6">
        <BoxContent title="Top 3 Instance Workload" border>
          <a
            class="is-size-7 is-italic has-text-weight-normal has-text-dark"
            style="text-decoration: underline;"
            slot="customTitle"
          >
            see the top 10 >>>
          </a>
          <div class="columns">
            <div
              class="column top3"
              v-for="(workload, index) in oracle.topWorkload.slice(0, 3)"
              :key="index"
            >
              <span class="number-marker">{{ index + 1 }}</span>
              <span>Host Name</span>
              <p>{{ workload.hostname }}</p>
              <span>DB Name</span>
              <p>{{ workload.dbname }}</p>
              <span>Thread Utilization</span>
              <p>{{ workload.workload }}</p>
            </div>
          </div>
        </BoxContent>
      </div>
      <div class="column is-6">
        <BoxContent title="Top 3 Unused Instance Resource" border>
          <a
            class="is-size-7 is-italic has-text-weight-normal has-text-dark"
            style="text-decoration: underline;"
            slot="customTitle"
          >
            see the top 10 >>>
          </a>
          <div class="columns">
            <div
              class="column top3"
              v-for="(reclaimable, index) in oracle.topReclaimable.slice(0, 3)"
              :key="index"
            >
              <span class="number-marker">{{ index + 1 }}</span>
              <span>Host Name</span>
              <p>{{ reclaimable.hostname }}</p>
              <span>DB Name</span>
              <p>{{ reclaimable.dbname }}</p>
              <span>Thread Utilization</span>
              <p>{{ reclaimable.reclaimableSegmentAdvisors }}</p>
            </div>
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
          :tableData="data"
          :clickedRow="() => []"
        >
          <template slot="headData">
            <v-th sortKey="name">DB Name</v-th>
            <v-th sortKey="version">DB Version</v-th>
            <v-th sortKey="hostname">Hostname</v-th>
            <v-th sortKey="environment">Env.</v-th>
            <v-th sortKey="charset">Charset</v-th>
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
            <TdContent :value="rowData.scope.hostname" />
            <TdContent :value="rowData.scope.environment" />
            <TdContent :value="rowData.scope.charset" />
            <TdContent :value="rowData.scope.memory | formatNumber('0.00')" />
            <TdContent :value="rowData.scope.datafileSize" />
            <TdContent :value="rowData.scope.segmentsSize" />
            <TdIcon :value="bindIcon(rowData.scope.archivelog)" />
            <TdIcon :value="bindIcon(rowData.scope.dataguard)" />
            <TdIcon :value="bindIcon(rowData.scope.ha)" />
          </template>

          <exportButton
            slot="export"
            url="/hosts/technologies/oracle/databases"
            expName="oracleDbs"
          />
        </FullTable>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import exportButton from '@/components/common/exportButton.vue'
import ColumnChart from '@/components/common/charts/ColumnChart.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import Collapse from '@/components/common/Collapse.vue'
import { mapBooleanIcon } from '@/helpers/helpers.js'

export default {
  components: {
    BoxContent,
    FullTable,
    exportButton,
    ColumnChart,
    TdContent,
    TdIcon,
    Collapse
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
        'ha'
      ],
      data: []
    }
  },
  async beforeMount() {
    await this.getOracleDbs()
    this.data = this.oracle.oracleDbs
  },
  methods: {
    ...mapActions(['getOracleDbs']),
    bindIcon(value) {
      return mapBooleanIcon(value)
    }
  },
  computed: {
    ...mapState(['oracle']),
    ...mapGetters([
      'getEnvironmentTypeChartDataOracle',
      'getArchivelogChartDataOracle',
      'getDataguardChartDataOracle',
      'getHaChartDataOracle'
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
