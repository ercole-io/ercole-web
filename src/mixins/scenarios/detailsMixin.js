import _ from 'lodash'
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
    }
  },
  methods: {
    ...mapActions(['fetchScenarioLicenses']),
    async handleOnTabClick(tabID) {
      if (this.getLicensesScenario(tabID).length > 0) {
        return
      } else {
        await this.fetchScenarioLicenses({
          id: this.$route.params.id,
          type: tabID,
        })
      }
    },
    roundPerc(value) {
      return `${_.round(value, 2)}%`
    },
  },
  computed: {
    ...mapGetters(['getLicensesScenario', 'loadingTableStatus']),
  },
}
