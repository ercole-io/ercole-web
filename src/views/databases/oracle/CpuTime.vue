<template>
  <BoxContent
    title="Daily Average CPU Time"
    border
    hasShadow
    :mbottom="false"
    v-if="isMounted"
  >
    <RangeDates
      :setRange="SET_RANGE_DATES"
      totalRange="31"
      slot="customTitle"
    />

    <div class="is-flex">
      <SearchInput
        :searchPlaceholder="$t('views.hostDetails.search')"
        v-model="searchTherm"
      />
    </div>

    <b-tabs
      v-model="activeTab"
      @input="getDatabasesData"
      size="is-small"
      type="is-toggle"
      destroy-on-hide
      vertical
      animated
      expanded
      class="vertical-tabs-scroll"
    >
      <b-tab-item
        v-for="(host, index) in getOracleHostsList"
        :value="host"
        :label="host"
        :key="index"
      >
        <div
          class="is-flex is-flex-direction-row is-justify-content-space-between is-align-content-flex-start mb-5"
        >
          <SearchableMultiSelect
            :dataOptions="getOracleCpuTimeChartInfo"
            :placeholderName="$t('views.hostDetails.searchBy')"
            :btnLabelText="$t('views.hostDetails.compareDb')"
            :selectionSlice="10"
            preSelection
          />
        </div>
        <div class="chart-wrap">
          <LineChart
            :chartId="`${host}-chart`"
            :lineChartData="getOracleCpuTimeChart(selectedDatabases)"
            v-if="!loadingTableStatus"
          />
          <Loading :isLoading="loadingTableStatus" />
        </div>
      </b-tab-item>
    </b-tabs>

    <NoContent
      v-if="getOracleHostsList.length === 0"
      noContentText="There are no results for this search"
      style="min-height: 332px"
    />
  </BoxContent>
</template>

<script>
import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import LineChart from '@/components/common/charts/LineChart.vue'
import SearchableMultiSelect from '@/components/common/SearchableMultiSelect.vue'
import RangeDates from '@/components/common/RangeDates.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import NoContent from '@/components/common/NoContent.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  name: 'oracle-databases-cputime-page',
  components: {
    BoxContent,
    LineChart,
    SearchableMultiSelect,
    RangeDates,
    SearchInput,
    NoContent,
    Loading,
  },
  data() {
    return {
      isMounted: false,
      activeTab: '',
      selectedDatabases: [],
      searchTherm: '',
    }
  },
  async beforeMount() {
    await this.getOracleHosts().then(() => {
      this.isMounted = true
    })
    this.activeTab = this.getOracleHostsList[0]
    this.getDatabasesData(this.activeTab)

    bus.$on('cpuChartSelected', (val) => {
      this.selectedDatabases = val
    })
  },
  methods: {
    ...mapActions(['getOracleHosts', 'getOracleCpuTimeData']),
    ...mapMutations(['SET_RANGE_DATES', 'SET_SEARCH_CPU_THEME']),
    getDatabasesData(hostname) {
      _.filter(this.getOracleHostsList, (val) => {
        if (val === hostname) {
          this.getOracleCpuTimeData(hostname)
        }
      })
    },
  },
  computed: {
    ...mapGetters([
      'getOracleHostsList',
      'loadingTableStatus',
      'getOracleCpuTimeChart',
      'getOracleCpuTimeChartInfo',
    ]),
  },
  watch: {
    searchTherm(value) {
      this.SET_SEARCH_CPU_THEME(value)
    },
  },
}
</script>

<style lang="scss" scoped>
.chart-wrap {
  min-height: 300px;
}
</style>
