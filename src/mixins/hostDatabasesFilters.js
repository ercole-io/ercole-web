import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      searchDb: '',
      hideMainSearch: false,
    }
  },
  beforeMount() {
    bus.$on('isDbFiltersOpen', (val) => {
      this.hideMainSearch = val
    })
  },
  methods: {
    onSearch(e) {
      if (e !== '' && e.length > 0) {
        bus.$emit('isSearching', true)
        bus.$emit('sendSearchVal', e)
      }
    },
    onSearchBlur() {
      if (this.searchDb.length === 0) {
        bus.$emit('isSearching', false)
        bus.$emit('sendSearchVal', '')
      }
    },
  },
  computed: {
    ...mapGetters(['currentHostFiltered', 'currentHostDBs']),
    countDatabases() {
      return this.currentHostFiltered(this.searchDb).length
    },
    showDatabases() {
      return this.currentHostFiltered(this.searchDb).length > 0
    },
  },
}
