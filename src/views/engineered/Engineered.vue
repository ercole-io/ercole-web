<template>
  <section>
    <div class="columns">
      <div class="column">
        <BoxContent title="CPU" border>
          <p class="is-size-7">
            {{ engineeredSystems.cpu.running }} /
            {{ engineeredSystems.cpu.total }}
          </p>
        </BoxContent>
      </div>
      <div class="column">
        <BoxContent title="Memory" border>
          <p class="is-size-7">{{ engineeredSystems.memory }} GB</p>
        </BoxContent>
      </div>
      <div class="column">
        <BoxContent title="Storage Used" border>
          <p class="is-size-7">{{ engineeredSystems.storage }} %</p>
        </BoxContent>
      </div>
      <div class="column is-7">
        <BoxContent title="Patching" border>
          <BarChart
            chartId="patchingChart"
            :barChartData="engineeredSystems.patching"
            chartHeight="90px"
            :colors="[['rgb(87, 117, 144)', 'rgb(67, 170, 139)']]"
            :legend="false"
          />
        </BoxContent>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <BoxContent
          :title="data.hostname"
          border
          v-for="data in getEngSys"
          :key="data.hostname"
        >
          <FullTable
            :keys="keys"
            :tableData="data.dbServers"
            :clickedRow="() => []"
            hideSearch
            hidePerpage
            hidePagination
          >
            <template slot="headData">
              <th style="width: 30%">Hostname</th>
              <th style="width: 20%">Model</th>
              <th style="width: 10%">CPU</th>
              <th style="width: 10%">Memory</th>
              <th style="width: 25%">Version</th>
              <th style="width: 25%">Power / Temp</th>
            </template>

            <template slot="subCustomHeadData">
              <th colspan="6" class="subHeader">DB Servers</th>
            </template>

            <template slot="bodyData" slot-scope="rowData">
              <TdContent :value="rowData.scope.hostname" />
              <TdContent :value="rowData.scope.model" />
              <TdContent :value="rowData.scope.totalCPUCount" />
              <TdContent :value="rowData.scope.memory" />
              <TdContent :value="rowData.scope.swVersion" />
              <TdContent
                :value="
                  `${rowData.scope.totalPowerSupply || '-'}     ${rowData.scope
                    .tempActual || '-'}`
                "
              />
            </template>
          </FullTable>

          <FullTable
            :keys="keys"
            :tableData="data.ibSwitches"
            :clickedRow="() => []"
            hideSearch
            hidePerpage
            hidePagination
          >
            <template slot="headData">
              <th style="width: 30%; visibility: hidden;"></th>
              <th style="width: 20%; visibility: hidden;"></th>
              <th style="width: 10%; visibility: hidden;"></th>
              <th style="width: 10%; visibility: hidden;"></th>
              <th style="width: 25%; visibility: hidden;"></th>
              <th style="width: 25%; visibility: hidden;"></th>
            </template>

            <template slot="subCustomHeadData">
              <th colspan="6" class="subHeader">IBSwitch</th>
            </template>

            <template slot="bodyData" slot-scope="rowData">
              <TdContent :value="rowData.scope.hostname" />
              <TdContent :value="rowData.scope.model" />
              <TdContent :value="rowData.scope.totalCPUCount" />
              <TdContent :value="rowData.scope.memory" />
              <TdContent :value="rowData.scope.swVersion" />
              <TdContent
                :value="
                  `${rowData.scope.totalPowerSupply || '-'}     ${rowData.scope
                    .tempActual || '-'}`
                "
              />
            </template>
          </FullTable>

          <FullTable
            :keys="keys"
            :tableData="data.storageServers"
            :clickedRow="() => []"
            hideSearch
            hidePerpage
            hidePagination
          >
            <template slot="headData">
              <th style="width: 30%; visibility: hidden;"></th>
              <th style="width: 20%; visibility: hidden;"></th>
              <th style="width: 10%; visibility: hidden;"></th>
              <th style="width: 10%; visibility: hidden;"></th>
              <th style="width: 25%; visibility: hidden;"></th>
              <th style="width: 25%; visibility: hidden;"></th>
            </template>

            <template slot="subCustomHeadData">
              <th colspan="6" class="subHeader">Storage</th>
            </template>

            <template slot="bodyData" slot-scope="rowData">
              <TdContent :value="rowData.scope.hostname" />
              <TdContent :value="rowData.scope.model" />
              <TdContent :value="rowData.scope.totalCPUCount" />
              <TdContent :value="rowData.scope.memory" />
              <TdContent :value="rowData.scope.swVersion" />
              <TdContent
                :value="
                  `${rowData.scope.totalPowerSupply || '-'}     ${rowData.scope
                    .tempActual || '-'}`
                "
              />
            </template>
          </FullTable>
        </BoxContent>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import BarChart from '@/components/common/charts/BarChart.vue'

export default {
  components: {
    BoxContent,
    FullTable,
    TdContent,
    BarChart
  },
  data() {
    return {
      keys: []
    }
  },
  async beforeMount() {
    await this.getEngineeredSystems()
  },
  methods: {
    ...mapActions(['getEngineeredSystems'])
  },
  computed: {
    ...mapState(['engineeredSystems']),
    ...mapGetters(['getEngSys'])
  }
}
</script>

<style lang="scss" scoped>
.subHeader {
  border: none;
  background-color: antiquewhite;
  padding: 0.2em 0.75em;
  font-size: 12px;
}
</style>
