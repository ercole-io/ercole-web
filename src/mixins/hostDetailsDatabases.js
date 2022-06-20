import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      isActive: 0,
      isActiveSub: 0,
    }
  },
  beforeMount() {
    const dbs = this.currentHostFiltered

    this.isActive = this.currentHostActiveDbIndex(dbs)

    bus.$on('isSearching', (val) => {
      if (val) {
        this.isActive = 0
      } else {
        this.isActive = this.currentHostActiveDbIndex(dbs)
      }
    })

    if (this.getIgnoreLicenseDbTabActive) {
      this.isActive = this.getIgnoreLicenseDbTabActive
      this.isActiveSub = this.getLicensesSubTabActive
    }
  },
  mounted() {
    setTimeout(() => {
      this.onChange(this.isActive)
    }, 1)
  },
  methods: {
    ...mapMutations([
      'SET_IGNORE_LICENSE_ACTIVE_DB_TAB',
      'SET_LICENMSES_SUB_TAB_ACTIVE',
    ]),
    onChange(index) {
      this.SET_IGNORE_LICENSE_ACTIVE_DB_TAB(index)
      if (this.currentHostFiltered[index]) {
        bus.$emit('cpuChartSelected', [
          {
            name: this.currentHostFiltered[index].name,
            id: this.currentHostFiltered[index].dbID,
          },
        ])
      }
    },
    onChangeSub(index) {
      this.isActiveSub = index
      this.SET_LICENMSES_SUB_TAB_ACTIVE(index)
    },
  },
  computed: {
    ...mapGetters([
      'currentHost',
      'currentHostActiveDB',
      'currentHostActiveDbIndex',
      'getIgnoreLicenseDbTabActive',
      'getLicensesSubTabActive',
      'currentHostFiltered',
    ]),
  },
}
