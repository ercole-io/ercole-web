<template>
  <section>
    <div class="columns">
      <div class="column">
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
      <div class="column">
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
        <BarChart chartId="barChart" :barChartData="barData" stacked />
      </div>
      <div class="column is-9">
        <FullTable
          placeholder="Search on Oracle DBs"
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
            <td>{{ rowData.scope.name }}</td>
            <td>{{ rowData.scope.type }}</td>
            <td>{{ rowData.scope.version }}</td>
            <td>{{ rowData.scope.hostname }}</td>
            <td>{{ rowData.scope.environment }}</td>
            <td>{{ rowData.scope.charset }}</td>
            <td>{{ rowData.scope.memory | formatNumber('0.00') }}</td>
            <td>{{ rowData.scope.datafileSize }}</td>
            <td>{{ rowData.scope.segmentsSize }}</td>
            <td>{{ rowData.scope.archivelog }}</td>
            <td>{{ rowData.scope.dataguard }}</td>
            <td>{{ rowData.scope.ha }}</td>
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
import { mapActions, mapState } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import exportButton from '@/components/common/exportButton.vue'
import BarChart from '@/components/common/charts/BarChart.vue'

export default {
  components: {
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
      data: [],
      barData: [
        {
          name: 'Series A',
          data: [
            ['Type 1', 32],
            ['Type 2', 46],
            ['Type 3', 28],
            ['Type 4', 21],
            ['Type 5', 20],
            ['Type 6', 13]
          ]
        },
        {
          name: 'Series B',
          data: [
            ['Type 1', 32],
            ['Type 2', 46],
            ['Type 3', 28],
            ['Type 4', 21],
            ['Type 5', 20],
            ['Type 6', 13]
          ]
        },
        {
          name: 'Series C',
          data: [
            ['Type 1', 32],
            ['Type 2', 46],
            ['Type 3', 28],
            ['Type 4', 21],
            ['Type 5', 20],
            ['Type 6', 13]
          ]
        },
        {
          name: 'Series D',
          data: [
            ['Type 1', 32],
            ['Type 2', 46],
            ['Type 3', 28],
            ['Type 4', 21],
            ['Type 5', 20],
            ['Type 6', 13]
          ]
        }
      ]
    }
  },
  async beforeMount() {
    await this.getOracleDbs()
    this.data = this.oracle.oracleDbs
  },
  methods: {
    ...mapActions(['getOracleDbs'])
  },
  computed: {
    ...mapState(['oracle'])
  }
}
</script>

<style lang="scss" scoped>
.top3 {
  display: flex;
  flex-direction: column;
  align-items: center;

  span:not(.number-marker) {
    font-size: 0.65em;
  }

  p {
    margin-bottom: 0.5em;
    font-size: 0.9em;
    font-weight: 500;
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
