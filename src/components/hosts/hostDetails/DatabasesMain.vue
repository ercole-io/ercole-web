<template>
  <GhostLoading :isLoading="loadingTableStatus" setHeight="390">
    <div class="columns">
      <div class="column is-8" v-if="isOracle">
        <OracleDatabases />
      </div>

      <div class="column is-4" v-if="isOracle">
        <ChartCpu v-show="currentHostDBs.length > 0 && !showDbFilters" />
        <DatabasesFilters v-show="showDbFilters" />
      </div>

      <div class="column is-12" v-if="isMysql">
        <MysqlDatabases />
      </div>

      <div class="column is-12" v-if="isMicrosoft">
        <MicrosoftDatabases />
      </div>
    </div>
  </GhostLoading>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'
import hostDatabasesFilters from '@/mixins/hostDatabasesFilters.js'
import OracleDatabases from '@/components/hosts/hostDetails/oracle/OracleDatabases.vue'
import DatabasesFilters from '@/components/hosts/hostDetails/oracle/databases/DatabasesFilters.vue'
import ChartCpu from '@/components/hosts/hostDetails/oracle/ChartCpu.vue'
import MysqlDatabases from '@/components/hosts/hostDetails/mysql/MysqlDatabases.vue'
import MicrosoftDatabases from '@/components/hosts/hostDetails/microsoft/MicrosoftDatabases.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  mixins: [hostDatabasesFilters],
  components: {
    OracleDatabases,
    DatabasesFilters,
    ChartCpu,
    MysqlDatabases,
    MicrosoftDatabases,
    GhostLoading,
  },
  data() {
    return {
      showDbFilters: false,
    }
  },
  beforeMount() {
    bus.$on('isDbFiltersOpen', (val) => {
      this.showDbFilters = val
    })
  },
  computed: {
    ...mapGetters(['currentHostDBs', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss"></style>
