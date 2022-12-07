import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'

export default {
  data() {
    return {
      query: '',
    }
  },
  mounted() {
    bus.$on('highlightSearch', (val) => {
      this.query = val
    })
  },
  methods: {
    highlight(value) {
      if (!this.query) {
        if (!_.isNil(value)) {
          return value.toString()
        }
      } else {
        if (!_.isNil(value)) {
          return value
            .toString()
            .replace(new RegExp(this.query, 'gi'), (match) => {
              return `<span class="highlightText">${match}</span>`
            })
        }
      }
    },
  },
}
