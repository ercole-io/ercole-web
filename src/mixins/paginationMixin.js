import { bus } from '@/helpers/eventBus.js'

export default {
  data() {
    return {
      currentPage: 1,
      totalPages: 0,
      perPage: 20,
      maxPageLinks: 5
    }
  },
  beforeMount() {
    this.checkPerPage()
  },
  mounted() {
    this.checkPerPage()
    bus.$on('changePerPage', value => {
      this.perPage = Number(value)
    })
  },
  beforeUpdate() {
    this.checkPerPage()
  },
  beforeDestroy() {
    let localstorage = Number(localStorage.getItem('perPage'))
    if (
      localstorage !== 50 ||
      localstorage !== 25 ||
      localstorage !== 20 ||
      localstorage !== 15 ||
      localstorage !== 10 ||
      localstorage !== 5
    ) {
      localStorage.setItem('perPage', 20)
    }
  },
  methods: {
    checkPerPage() {
      let storagePerPage = Number(localStorage.getItem('perPage'))

      if (storagePerPage && storagePerPage !== 0) {
        if (this.totalItems < storagePerPage) {
          this.perPage = Number(this.totalItems)
        } else {
          this.perPage = Number(localStorage.getItem('perPage'))
        }
      } else {
        localStorage.setItem('perPage', 20)
      }
    }
  }
}
