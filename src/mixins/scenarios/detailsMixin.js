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
  async beforeMount() {
    await this.fetchScenarioLicenses({
      id: this.$route.params.id,
      type: this.licenceType,
    })
  },
  methods: {
    ...mapActions(['fetchScenarioLicenses']),
    roundPerc(value) {
      return `${_.round(value, 2)}%`
    },
  },
  computed: {
    ...mapGetters(['getLicensesScenario', 'loadingTableStatus']),
  },
}
