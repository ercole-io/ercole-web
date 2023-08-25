<template>
  <BoxContent
    title="Capacity Average and Daily Average Usage"
    border
    hasShadow
    :mbottom="false"
    customStyle="padding: 20px"
    v-if="isMounted"
  >
    <div class="is-flex">
      <SearchInput
        :searchPlaceholder="$t('views.hostDetails.search')"
        v-model="searchTherm"
        isLazy
      />
    </div>

    <div class="chart-wrap">
      <b-tabs
        v-model="activeTab"
        @input="getHostDatabasesData"
        size="is-small"
        type="is-toggle"
        destroy-on-hide
        vertical
        animated
        expanded
        class="vertical-tabs-scroll"
      >
        <b-tab-item
          v-for="(host, index) in oracleHostNamesList"
          :value="host"
          :label="host"
          :key="index"
        >
          <b-tabs
            size="is-small"
            type="is-boxed"
            destroy-on-hide
            animated
            v-if="!loadingTableStatus"
          >
            <b-tab-item
              v-for="db in oracleDatabasesCapacity"
              :value="db.dbName"
              :label="db.dbName"
              :key="db.dbName"
            >
              <b-tabs size="is-small" type="is-toggle" class="p-5" expanded>
                <b-tab-item
                  v-for="cap in capacityTabs"
                  :key="cap.id"
                  :label="checkID(cap.id) ? `${cap.label} - Daily` : cap.label"
                  :value="cap.id"
                >
                  <ChartBuilder
                    chartType="line"
                    :chartID="`${cap.id}-${cap.label}CapacityDailyChart`"
                    :chartOptions="
                      chartDailyOptions(cap.id, db.dbCapacityDaily)
                    "
                    :chartSeries="chartDailySeries(cap.id, db.dbCapacityDaily)"
                    v-if="checkID(cap.id)"
                  />

                  <ChartBuilder
                    chartType="bar"
                    :chartID="`${cap.id}-${cap.label}CapacityChart`"
                    :chartOptions="chartOptions(cap.label)"
                    :chartSeries="getSeries(cap.id, db.dbCapacity)"
                    v-if="!checkID(cap.id)"
                  />
                </b-tab-item>
              </b-tabs>

              <div class="pdb-box" v-if="db.pdbs && db.pdbs.length > 0">
                <p class="has-text-centered has-text-weight-medium">
                  {{ db.dbName }} - Pluggable Databases
                </p>

                <CollapseSimple
                  :isOpen="false"
                  :collapseID="`collapse-${pdb.pdbName}`"
                  :collapseTitle="pdb.pdbName"
                  v-for="pdb in db.pdbs"
                  :key="pdb.pdbName"
                >
                  <b-tabs size="is-small" type="is-toggle" class="p-5" expanded>
                    <b-tab-item
                      v-for="capPdb in capacityTabs"
                      :key="capPdb.id"
                      :label="
                        checkID(capPdb.id)
                          ? `${capPdb.label} - Daily`
                          : capPdb.label
                      "
                      :value="capPdb.id"
                    >
                      <ChartBuilder
                        chartType="line"
                        :chartID="`${capPdb.id}-${capPdb.label}CapacityDailyPdbChart`"
                        :chartOptions="
                          chartDailyOptions(capPdb.id, pdb.pdbCapacityDaily)
                        "
                        :chartSeries="
                          chartDailySeries(capPdb.id, pdb.pdbCapacityDaily)
                        "
                        v-if="checkID(capPdb.id)"
                      />
                      <ChartBuilder
                        chartType="bar"
                        :chartID="`${capPdb.id}-${capPdb.label}CapacityPdbChart`"
                        :chartOptions="chartOptions(capPdb.label)"
                        :chartSeries="getSeries(capPdb.id, pdb.pdbCapacity)"
                        v-if="!checkID(capPdb.id)"
                      />
                    </b-tab-item>
                  </b-tabs>
                </CollapseSimple>
              </div>
            </b-tab-item>
          </b-tabs>
        </b-tab-item>
      </b-tabs>

      <Loading :isLoading="loadingTableStatus" />
    </div>

    <NoContent
      v-if="oracleHostNamesList.length === 0"
      noContentText="There are no results for this search"
      style="min-height: 332px"
    />
  </BoxContent>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import databasesCapacityMixin from '@/mixins/hostDetails/capacity/databasesCapacity.js'
import databasesCapacityMonthMixin from '@/mixins/hostDetails/capacity/databasesCapacityMonth.js'
import databasesCapacityDailyMixin from '@/mixins/hostDetails/capacity/databasesCapacityDaily.js'
import BoxContent from '@/components/common/BoxContent.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import NoContent from '@/components/common/NoContent.vue'
import CollapseSimple from '@/components/common/CollapseSimple.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  name: 'oracle-databases-capacity-page',
  mixins: [
    databasesCapacityMixin,
    databasesCapacityMonthMixin,
    databasesCapacityDailyMixin,
  ],
  components: { BoxContent, SearchInput, NoContent, CollapseSimple, Loading },
  data() {
    return {
      isMounted: false,
      activeTab: '',
      searchTherm: '',
    }
  },
  async beforeMount() {
    await this.getOracleHostNames()
      .then(() => {
        this.activeTab = this.oracleHostNamesList[0]
      })
      .then(() => {
        this.isMounted = true
      })
      .then(async () => {
        await this.getHostDatabasesData(this.activeTab)
      })
  },
  methods: {
    ...mapActions(['getOracleHostNames', 'getOracleCapacityData']),
    ...mapMutations(['SET_SEARCH_HOSTNAME', 'SET_CURRENT_HOST_DB_CAPACITY']),
    getHostDatabasesData(hostname) {
      this.SET_CURRENT_HOST_DB_CAPACITY([])
      _.filter(this.oracleHostNamesList, (val) => {
        if (val === hostname) {
          this.getOracleCapacityData(val)
        }
      })
    },
  },
  computed: {
    ...mapGetters([
      'oracleHostNamesList',
      'oracleDatabasesCapacity',
      'loadingTableStatus',
    ]),
  },
  watch: {
    searchTherm(value) {
      this.SET_SEARCH_HOSTNAME(value)

      setTimeout(() => {
        this.activeTab = this.oracleHostNamesList[0]
        this.getHostDatabasesData(this.activeTab)
      }, 100)
    },
  },
}
</script>

<style lang="scss" scoped>
.pdb-box {
  margin-top: 20px;
  padding: 10px 10px 0 10px;
  border: 1px solid #dbdbdb;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.5),
    0 0.5em 1em -0.125em rgba(10, 10, 10, 0.5);
}

.chart-wrap {
  min-height: 780px;
}
</style>
