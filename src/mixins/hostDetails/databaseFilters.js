import { bus } from '@/helpers/eventBus.js'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      searchDb: '',
    }
  },
  methods: {
    ...mapMutations(['SET_SEARCH_TERM_DB']),
    onSearch(e) {
      if (e !== '' && e.length > 0) {
        bus.$emit('searchOnDbs', e)
        this.SET_SEARCH_TERM_DB(e)
      } else if (this.searchDb.length === 0) {
        bus.$emit('searchOnDbs', '')
        this.SET_SEARCH_TERM_DB('')
      }
    },
  },
}
