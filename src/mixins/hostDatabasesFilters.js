import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapMutations } from 'vuex'

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
    ...mapMutations(['SET_SEARCH_TERM_DB']),
    onSearch(e) {
      if (e !== '' && e.length > 0) {
        bus.$emit('isSearching', true)
        bus.$emit('sendSearchVal', e)
        this.SET_SEARCH_TERM_DB(e)
      }
    },
    onSearchBlur() {
      if (this.searchDb.length === 0) {
        bus.$emit('isSearching', false)
        bus.$emit('sendSearchVal', '')
        this.SET_SEARCH_TERM_DB('')
      }
    },
  },
  computed: {
    ...mapGetters(['currentHostFiltered', 'currentHostDBs']),
    countDatabases() {
      return this.currentHostFiltered.length
    },
    showDatabases() {
      return this.currentHostFiltered.length > 0
    },
  },
}
