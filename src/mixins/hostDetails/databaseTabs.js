import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'

import databaseTypesMixin from '@/mixins/hostDetails/databaseTypes.js'

export default {
  mixins: [databaseTypesMixin],
  data() {
    return {
      isActive: 0,
      isActiveSub: 0,
    }
  },
  beforeMount() {
    this.isActive = this.currentHostActiveDbIndex
    bus.$on('searchOnDbs', (val) => {
      if (val) {
        this.isActive = 0
      } else {
        this.isActive = this.currentHostActiveDbIndex
      }
      if (this.isOracle) {
        this.updateOracleChart(this.isActive)
      }
    })
  },
  mounted() {
    setTimeout(() => {
      this.onChangeDbTab(this.isActive)
    }, 1)
  },
  methods: {
    onChangeDbTab(index) {
      if (this.isOracle) {
        this.updateOracleChart(index)
      }
      this.isActiveSub = 0
    },
    updateOracleChart(dbIndex) {
      if (this.currentHostFiltered[dbIndex]) {
        bus.$emit('cpuChartSelected', [
          {
            name: this.currentHostFiltered[dbIndex].name,
            id: this.currentHostFiltered[dbIndex].dbID,
          },
        ])
      }
    },
  },
  computed: {
    ...mapGetters(['currentHostFiltered', 'currentHostActiveDbIndex']),
  },
}
