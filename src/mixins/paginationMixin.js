import { bus } from '@/helpers/eventBus.js'

export default {
  data() {
    return {
      currentPage: 1,
      totalPages: 0,
      perPage: 20,
      maxPageLinks: 5,
    }
  },
  beforeMount() {
    this.checkPerPage()
  },
  mounted() {
    bus.$on('changePerPage', (value) => {
      this.perPage = Number(value)
    })
  },
  beforeUpdate() {
    this.checkPerPage()
  },
  beforeDestroy() {
    this.checkPerPage()
  },
  methods: {
    checkPerPage() {
      let storagePerPage = Number(localStorage.getItem('perPage'))

      if (storagePerPage) {
        if (this.totalItems < storagePerPage) {
          this.perPage = Number(this.totalItems)
        } else {
          this.perPage = Number(storagePerPage)
        }
      } else {
        localStorage.setItem('perPage', 20)
        this.perPage = 20
      }
    },
  },
}
