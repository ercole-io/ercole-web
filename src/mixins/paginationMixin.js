import { bus } from '../helpers/eventBus.js'

export default {
  data() {
    return {
      currentPage: 1,
      totalPages: 0,
      perPage: 10,
      maxPageLinks: 5,
      total: null
    }
  },
  created() {
    bus.$on('changePerPage', value => {
      this.perPage = value
    })
  },
  computed: {
    totalItems() {
      return this.total.length
    }
  }
}
