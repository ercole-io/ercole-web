<template>
  <BoxContent
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
          <CapacityDatabases
            :capacityData="oracleDatabasesCapacity"
            v-if="!loadingTableStatus"
          />
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
import CapacityDatabases from '@/components/databases/oracle/capacity/Databases.vue'
import BoxContent from '@/components/common/BoxContent.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import NoContent from '@/components/common/NoContent.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  name: 'oracle-databases-capacity-page',

  components: {
    CapacityDatabases,
    BoxContent,
    SearchInput,
    NoContent,

    Loading,
  },
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
