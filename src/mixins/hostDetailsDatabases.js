import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'

export default {
  props: {
    currentDBs: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isActive: 0,
    }
  },
  beforeMount() {
    const dbs = this.currentDBs

    this.isActive = this.currentHostActiveDbIndex(dbs)

    bus.$on('isSearching', (val) => {
      if (val) {
        this.isActive = 0
      } else {
        this.isActive = this.currentHostActiveDbIndex(dbs)
      }
    })
  },
  methods: {
    onChange(index) {
      bus.$emit('cpuChartSelected', [
        {
          name: this.currentDBs[index].name,
          id: this.currentDBs[index].dbID,
        },
      ])
      bus.$emit('selectedData', [this.currentDBs[index].dbID])
    },
  },
  computed: {
    ...mapGetters(['currentHostActiveDB', 'currentHostActiveDbIndex']),
  },
}
