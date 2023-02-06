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
        <DatabasesFilters v-show="showDbFilters" />
      </div>
    </div>
  </GhostLoading>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'

import databaseTypesMixin from '@/mixins/hostDetails/databaseTypes.js'
import databaseFiltersMixin from '@/mixins/hostDetails/databaseFilters.js'

import ChartCpu from '@/components/hosts/hostDetails/oracle/ChartCpu.vue'
import DatabasesData from '@/components/hosts/hostDetails/DatabasesData.vue'
import DatabasesFilters from '@/components/hosts/hostDetails/DatabasesFilters.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  name: 'hosts-details-databases-main-component',
  mixins: [databaseFiltersMixin, databaseTypesMixin],
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
    ...mapGetters(['currentHostDBs', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss"></style>
