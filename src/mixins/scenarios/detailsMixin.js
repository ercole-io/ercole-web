import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TDIcon from '@/components/common/Table/TDIcon.vue'

export default {
  components: {
    FullTable,
    TdContent,
    TDIcon,
  },
  data() {
    return {
      detailsTabs: [
        {
          id: 'COMPLIANCE',
          component: 'LicensesCompliance',
          label: 'Licenses Compliance',
        },
        {
          id: 'USED_DATABASES',
          component: 'LicensesUsedDatabases',
          label: 'Licenses Used - Databases',
        },
        {
          id: 'USED_HOSTS',
          component: 'LicensesUsedHosts',
          label: 'Licenses Used - Hosts',
        },
        {
          id: 'USED_CLUSTERS',
          component: 'LicensesUsedClusters',
          label: 'Licenses Used - Clusters',
        },
        {
          id: 'USED_CLUSTERS_VERITAS',
          component: 'LicensesUsedClustersVeritas',
          label: 'Licenses Used - Clusters Veritas',
        },
      ],
      wasFiltered: false,
    }
  },
  methods: {
    ...mapActions(['fetchScenarioLicenses']),
    async scenarioLicenses(type, id) {
      await this.fetchScenarioLicenses({ id, type })
    },
    async handleOnTabClick(tabID) {
      bus.$emit('scenarioType', tabID)

      if (this.hasGlobalFilters) {
        await this.scenarioLicenses(tabID, this.$route.params.id)
        this.wasFiltered = true
        return
      }

      if (this.wasFiltered) {
        await this.scenarioLicenses(tabID, this.$route.params.id)
        this.wasFiltered = false
        return
      }

      if (this.getLicensesScenario(tabID).length === 0) {
        await this.scenarioLicenses(tabID, this.$route.params.id)
      }
    },
    roundPerc(value) {
      return `${_.round(value, 2)}%`
    },
  },
  computed: {
    ...mapGetters([
      'getLicensesScenario',
      'loadingTableStatus',
      'getActiveFilters',
    ]),
    hasGlobalFilters() {
      const { date, environment, location } = this.getActiveFilters
      return date || environment || location
    },
  },
}
