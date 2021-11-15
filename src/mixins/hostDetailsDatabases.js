import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'

export default {
  props: {
    currentDBs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isActive: 0
    }
  },
  beforeMount() {
    const dbs = this.currentDBs

    this.isActive = this.currentHostActiveDbIndex(dbs)

    bus.$on('isSearching', val => {
      if (val) {
        this.isActive = 0
      } else {
        this.isActive = this.currentHostActiveDbIndex(dbs)
      }

      setTimeout(() => {
        if (dbs[this.isActive] && dbs[this.isActive].name) {
          bus.$emit('selectedData', [dbs[this.isActive].dbID])
        } else {
          bus.$emit('selectedData', [this.currentHostActiveDB])
        }
      }, 500)
    })
  },
  methods: {
    onChange(index) {
      bus.$emit('selectedData', [this.currentDBs[index].dbID])
    }
  },
  computed: {
    ...mapGetters(['currentHostActiveDB', 'currentHostActiveDbIndex'])
  }
}
