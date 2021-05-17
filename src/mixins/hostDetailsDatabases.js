import { mapGetters } from 'vuex'
import { bus } from '@/helpers/eventBus.js'

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
    bus.$emit('selectedData', [this.currentHostActiveDB])

    bus.$on('isSearching', val => {
      if (val) {
        this.isActive = 0
      } else {
        this.isActive = this.currentHostActiveDbIndex(dbs)
      }

      setTimeout(() => {
        if (dbs[this.isActive] && dbs[this.isActive].name) {
          bus.$emit('selectedData', [dbs[this.isActive].name])
        } else {
          bus.$emit('selectedData', [this.currentHostActiveDB])
        }
      }, 500)
    })
  },
  methods: {
    onChange(index) {
      bus.$emit('selectedData', [this.currentDBs[index].name])
    }
  },
  computed: {
    ...mapGetters(['currentHostActiveDB', 'currentHostActiveDbIndex'])
  }
}
