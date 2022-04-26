import { bus } from '@/helpers/eventBus.js'

export default {
  data() {
    return {
      currentPage: 1,
      totalPages: 0,
      perPage: 25,
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

      if (!this.checkStorage) {
        localStorage.setItem('perPage', 25)
        this.perPage = 25
      }

      if (storagePerPage) {
        if (this.totalItems < storagePerPage) {
          this.perPage = Number(this.totalItems)
        } else {
          this.perPage = Number(storagePerPage)
        }
      } else {
        localStorage.setItem('perPage', 25)
        this.perPage = 25
      }
    },
  },
  computed: {
    checkStorage() {
      let storagePerPage = Number(localStorage.getItem('perPage'))
      return (
        storagePerPage === 25 ||
        storagePerPage === 50 ||
        storagePerPage === 100 ||
        storagePerPage === 200
      )
    },
  },
}
