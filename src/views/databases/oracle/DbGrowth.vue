<template>
  <BoxContent
    title="DB Growth Charts"
    border
    hasShadow
    :mbottom="false"
    class="pt-0"
    v-if="isMounted"
  >
    <RangeDates :setRange="SET_RANGE_DATES_ALT" slot="customTitle" />

    <div class="is-flex px-5">
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
      class="vertical-tabs-scroll px-5"
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
            <DbGrowth :data="db.oracleChanges" :dataID="db.databasename" />

            <div class="pdb-box" v-if="Object.entries(db.pdbs).length > 0">
              <p class="has-text-centered has-text-weight-medium">
                {{ db.databasename }} - Pluggable Databases
              </p>

              <CollapseSimple
                :isOpen="false"
                :collapseID="`collapse-${pdb[0]}`"
                :collapseTitle="pdb[0]"
                v-for="pdb in Object.entries(db.pdbs)"
                :key="pdb[0]"
              >
                <DbGrowth :data="pdb[1]" :dataID="`dbgrowth-${pdb[0]}`" />
              </CollapseSimple>
            </div>
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
import BoxContent from '@/components/common/BoxContent.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import NoContent from '@/components/common/NoContent.vue'
import Loading from '@/components/common/Loading.vue'
import RangeDates from '@/components/common/RangeDates.vue'
import DbGrowth from '@/components/common/DbGrowth.vue'
import CollapseSimple from '@/components/common/CollapseSimple.vue'

// import VueJsonPretty from 'vue-json-pretty'
// import 'vue-json-pretty/lib/styles.css'

export default {
  name: 'oracle-databases-dbgrowth-page',
  components: {
    BoxContent,
    SearchInput,
    NoContent,
    Loading,
    RangeDates,
    DbGrowth,
    CollapseSimple,
    // VueJsonPretty,
  },
  data() {
    return {
      isMounted: false,
      searchTherm: '',
      activeTab: '',
      activeDB: '',
      currentDbGrowth: [],
      currentDbGrowthPdbs: [],
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
    ...mapMutations(['SET_SEARCH', 'SET_RANGE_DATES_ALT']),
    getDbGrowthData(hostname) {
      this.loadingDbGrwothChart = true
      setTimeout(() => {
        _.filter(this.filteredOracleDbGrowthHostnames, (val) => {
          if (val === hostname) {
            this.getDbgrowth(hostname)
              .then(() => {
                this.currentDbGrowth = this.getDbGrowthPdbData
              })
              .then(() => (this.loadingDbGrwothChart = false))
          }
        })
      }, 500)
    },
  },
  computed: {
    ...mapGetters([
      'filteredOracleDbGrowthHostnames',
      'getDbGrowthPdbData',
      'loadingTableStatus',
    ]),
  },
  watch: {
    searchTherm(value) {
      this.SET_SEARCH(value)
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
</style>
