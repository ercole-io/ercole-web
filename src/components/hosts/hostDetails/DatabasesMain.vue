<template>
  <GhostLoading :isLoading="loadingTableStatus" setHeight="390">
    <div class="columns">
      <div
        class="column"
        :class="
          (isOracle ? 'is-8' : 'is-12',
          !isOracle && !showDbFilters ? 'is-12' : 'is-8')
        "
      >
        <DatabasesData />
      </div>

      <div class="column is-4">
        <template v-if="isOracle">
          <ChartCpu v-show="currentHostDBs.length > 0 && !showDbFilters" />
        </template>
        <DatabasesFilters
          :filters="currentDatabasesOptions"
          v-show="showDbFilters"
        />
      </div>
    </div>
  </GhostLoading>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'

import databaseTypeMixin from '@/mixins/hostDetails/databaseType.js'
import hostDatabasesFilters from '@/mixins/hostDatabasesFilters.js'

import ChartCpu from '@/components/hosts/hostDetails/oracle/ChartCpu.vue'
import DatabasesData from '@/components/hosts/hostDetails/DatabasesData.vue'
import DatabasesFilters from '@/components/hosts/hostDetails/DatabasesFilters.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  mixins: [hostDatabasesFilters, databaseTypeMixin],
  components: {
    DatabasesData,
    DatabasesFilters,
    ChartCpu,
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
    ...mapGetters([
      'currentHostDBs',
      'currentDatabasesOptions',
      'loadingTableStatus',
    ]),
  },
}
</script>

<style lang="scss"></style>
