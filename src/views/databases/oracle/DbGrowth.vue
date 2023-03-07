<template>
  <BoxContent
    title="DB Growth Charts"
    border
    hasShadow
    :mbottom="false"
    class="pt-0"
    v-if="isMounted"
  >
    <RangeDates
      :setRange="SET_RANGE_DATES_ALT"
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
      size="is-small"
      type="is-toggle"
      destroy-on-hide
      vertical
      animated
      expanded
      class="vertical-tabs-scroll"
      v-model="activeTab"
      @input="getDbGrowthData"
    >
      <b-tab-item
        v-for="host in filteredOracleDbGrowthHostnames"
        :label="host"
        :key="host"
        :value="host"
      >
        <Loading :isLoading="loadingDbGrwothChart" />
        <b-tabs
          size="is-small"
          type="is-boxed"
          destroy-on-hide
          animated
          expanded
          multiline
          v-if="!loadingDbGrwothChart"
        >
          <b-tab-item
            v-for="(db, i) in currentDbGrowth"
            :label="db.databasename"
            :key="i"
          >
            <LineChart
              :chartId="db.databasename"
              :lineChartData="mountDbGrowthChart(db.oracleChanges)"
              class="mt-5"
              discrete
            />
          </b-tab-item>
        </b-tabs>
      </b-tab-item>
    </b-tabs>

    <NoContent
      v-if="filteredOracleDbGrowthHostnames.length === 0"
      noContentText="There are no results for this search"
      style="min-height: 332px"
    />
  </BoxContent>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import DbGrowthMixin from '@/mixins/oracle/dbGrowth.js'
import BoxContent from '@/components/common/BoxContent.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import NoContent from '@/components/common/NoContent.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  name: 'oracle-databases-dbgrowth-page',
  mixins: [DbGrowthMixin],
  components: {
    BoxContent,
    SearchInput,
    NoContent,
    Loading,
  },
  data() {
    return {
      isMounted: false,
      searchTherm: '',
      activeTab: '',
      currentDbGrowth: [],
      loadingDbGrwothChart: false,
    }
  },
  async beforeMount() {
    await this.getDbGrowthDbs().then(() => (this.isMounted = true))
    this.activeTab = this.filteredOracleDbGrowthHostnames[0]
    this.getDbGrowthData(this.activeTab)
  },
  methods: {
    ...mapActions(['getDbgrowth', 'getDbGrowthDbs']),
    ...mapMutations(['SET_SEARCH']),
    getDbGrowthData(hostname) {
      this.loadingDbGrwothChart = true
      setTimeout(() => {
        _.filter(this.filteredOracleDbGrowthHostnames, (val) => {
          if (val === hostname) {
            this.getDbgrowth(hostname)
              .then((res) => {
                this.currentDbGrowth = res.data[0].oracleChangesDBs
              })
              .then(() => (this.loadingDbGrwothChart = false))
          }
        })
      }, 500)
    },
  },
  computed: {
    ...mapGetters(['filteredOracleDbGrowthHostnames', 'loadingTableStatus']),
  },
  watch: {
    searchTherm(value) {
      this.SET_SEARCH(value)
    },
  },
}
</script>

<style lang="scss" scoped></style>
