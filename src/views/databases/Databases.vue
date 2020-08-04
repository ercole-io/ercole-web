<template>
  <section>
    <BoxContent>
      <div class="columns">
        <div class="column is-3">
          <div class="columns">
            <div class="column is-12">
              <BoxContent>
                <div class="is-flex" style="justify-content: space-around;">
                  <p
                    class="is-size-7 has-text-centered"
                    style="margin-bottom: 0"
                  >
                    CPU <br />
                    <span class="is-size-7 has-text-weight-light">
                      Total Thread Used
                    </span>
                    <br />
                    <span class="is-size-5 has-text-weight-medium">
                      {{ getTotalCpu }}
                    </span>
                  </p>
                  <p
                    class="is-size-7 has-text-centered"
                    style="margin-bottom: 0"
                  >
                    Memory <br />
                    <span class="is-size-7 has-text-weight-light">
                      Total Memory Size
                    </span>
                    <br />
                    <span class="is-size-5 has-text-weight-medium">
                      {{ databases.totalMemory }} TB
                    </span>
                  </p>
                </div>
              </BoxContent>
            </div>
          </div>
          <div class="columns">
            <div class="column is-12">
              <BoxContent>
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
                      {{ databases.totalSegment }} TB
                    </span>
                  </p>
                  <p class="has-text-centered">
                    <span class="is-size-7 has-text-weight-light">
                      Total Datafile Size
                    </span>
                    <br />
                    <span class="is-size-5 has-text-weight-medium">
                      {{ databases.totalDatafile }} TB
                    </span>
                  </p>
                </div>
              </BoxContent>
            </div>
          </div>
          <div class="columns">
            <div class="column is-12">
              <BarChart chartId="barChart" :barChartData="barData" stacked />
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
              <td>{{ rowData.scope.name }}</td>
              <td>{{ rowData.scope.type }}</td>
              <td>{{ rowData.scope.version }}</td>
              <td>{{ rowData.scope.hostname }}</td>
              <td>{{ rowData.scope.environment }}</td>
              <td>{{ rowData.scope.charset }}</td>
              <td>{{ rowData.scope.memory }}</td>
              <td>{{ rowData.scope.datafileSize }}</td>
              <td>{{ rowData.scope.segmentsSize }}</td>
              <td>{{ rowData.scope.archivelog }}</td>
              <td>{{ rowData.scope.dataguard }}</td>
              <td>{{ rowData.scope.ha }}</td>
            </template>

            <exportButton
              slot="export"
              url="/hosts/technologies/oracle/databases"
              expName="databases"
            />
          </FullTable>
        </div>
      </div>
    </BoxContent>
  </section>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
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
    await this.getDatabases()
    await this.getTotalMemory()
    await this.getTotalSegment()
    await this.getTotalDatafile()
    this.data = this.databases.databases
  },
  methods: {
    ...mapActions([
      'getDatabases',
      'getTotalMemory',
      'getTotalSegment',
      'getTotalDatafile'
    ])
  },
  computed: {
    ...mapState(['databases']),
    ...mapGetters(['getTotalCpu'])
  }
}
</script>

<style lang="scss" scoped></style>
