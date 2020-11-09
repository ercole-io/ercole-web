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
                  {{ databases.totalMemory | formatNumber('0.00', 'GB') }}
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
                  {{ databases.totalSegment | formatNumber('0.00', 'GB') }}
                </span>
              </p>
              <p class="has-text-centered">
                <span class="is-size-7 has-text-weight-light">
                  Total Datafile Size
                </span>
                <br />
                <span class="is-size-5 has-text-weight-medium">
                  {{ databases.totalDatafile | formatNumber('0.00', 'GB') }}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <Collapse title="Type Of Databases" id="TypeOfDatabases" isOpen>
              <BarChart
                chartId="dt"
                :barChartData="getDatabasesTypeChartData"
                chartHeight="150px"
                stacked
              />
            </Collapse>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <Collapse title="Type Of Environment" id="TypeOfEnvironment">
              <BarChart
                chartId="et"
                :barChartData="getEnvironmentTypeChartData"
                chartHeight="150px"
                stacked
              />
            </Collapse>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <Collapse title="Archivelog Mode" id="ArchivelogMode">
              <BarChart
                chartId="al"
                :barChartData="getArchivelogChartData"
                chartHeight="150px"
                stacked
              />
            </Collapse>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <Collapse title="Disaster Recovery" id="DisasterRecovery">
              <BarChart
                chartId="dr"
                :barChartData="getDataguardChartData"
                chartHeight="150px"
                stacked
              />
            </Collapse>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <Collapse title="High Availability" id="HighAvailability">
              <BarChart
                chartId="ha"
                :barChartData="getHaChartData"
                chartHeight="150px"
                stacked
              />
            </Collapse>
          </div>
        </div>
      </div>
      <div class="column is-9">
        <FullTable
          placeholder="Search on Databases"
          :keys="keys"
          :tableData="getAllDatabases"
          :clickedRow="() => []"
        >
          <template slot="headData">
            <v-th sortKey="name">DB Name</v-th>
            <v-th sortKey="type">DB Type</v-th>
            <v-th sortKey="version">DB Version</v-th>
            <v-th sortKey="hostname">Hostname</v-th>
            <v-th sortKey="environment">Env.</v-th>
            <v-th sortKey="charset">Charset</v-th>
            <v-th sortKey="memory">Memory (GB)</v-th>
            <v-th sortKey="datafileSize">Datafile Size (GB)</v-th>
            <v-th sortKey="segmentsSize">Segment Size (GB)</v-th>
            <v-th sortKey="archivelog">Archivelog Mode</v-th>
            <v-th sortKey="dataguard">DR</v-th>
            <v-th sortKey="ha">HA</v-th>
          </template>

          <template slot="bodyData" slot-scope="rowData">
            <TdContent :value="rowData.scope.name" />
            <TdContent :value="rowData.scope.type" />
            <TdContent :value="rowData.scope.version" />
            <HostLink
              :hostname="[rowData.scope.hostname, rowData.scope.name]"
            />
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
            url="hosts/technologies/oracle/databases"
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
import Collapse from '@/components/common/Collapse.vue'
import { mapBooleanIcon } from '@/helpers/helpers.js'
import HostLink from '@/components/common/Table/HostLink.vue'

export default {
  components: {
    FullTable,
    exportButton,
    BarChart,
    TdContent,
    TdIcon,
    Collapse,
    HostLink
  },
  data() {
    return {
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
  async beforeMount() {
    await this.getDatabases()
  },
  methods: {
    ...mapActions(['getDatabases']),
    bindIcon(value) {
      return mapBooleanIcon(value)
    }
  },
  computed: {
    ...mapState(['databases']),
    ...mapGetters([
      'getAllDatabases',
      'getTotalCpu',
      'getDatabasesTypeChartData',
      'getEnvironmentTypeChartData',
      'getArchivelogChartData',
      'getDataguardChartData',
      'getHaChartData'
    ])
  }
}
</script>

<style lang="scss" scoped></style>
