import { bus } from '@/helpers/eventBus.js'

export default {
  data() {
    return {
      query: ''
    }
  },
  created() {
    bus.$on('searchTerm', val => {
      this.query = val
    })
  },
  methods: {
    highlight(value) {
      if (!this.query) {
        return value.toString()
      }
      return value.toString().replace(new RegExp(this.query, 'gi'), match => {
        return `<span class="highlightText">${match}</span>`
      })
    }
  }
}
