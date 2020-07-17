import { bus } from '../helpers/eventBus.js'

export default {
  data() {
    return {
      currentPage: 1,
      totalPages: 0,
      perPage: 10,
      maxPageLinks: 5,
      total: 0
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
