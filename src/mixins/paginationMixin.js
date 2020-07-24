import { bus } from '../helpers/eventBus.js'

export default {
  data() {
    return {
      currentPage: 1,
      totalPages: 0,
      perPage: Number(localStorage.getItem('perPage')),
      maxPageLinks: 5,
      total: []
    }
  },
  mounted() {
    bus.$on('changePerPage', value => {
      this.perPage = value
    })
  }
}
