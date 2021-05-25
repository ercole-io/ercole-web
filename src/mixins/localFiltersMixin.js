import _ from 'lodash'
import {
  prepareDataForAutocomplete,
  organizeKeysBeforeFilter,
  returnAutocompleteData
} from '@/helpers/helpers.js'

export default {
  data() {
    return {
      fullData: [],
      filters: {}
    }
  },
  beforeMount() {
    this.setAutocompletes()
    this.setSelects()
    this.setSliders()
  },
  methods: {
    apply() {
      this.$store.commit('SET_FILTERS', {
        status: true,
        filters: organizeKeysBeforeFilter(this.filters),
        showCheckbox: [this.alertStatus, this.filters.alertCategory]
      })
    },
    reset(cb = () => {}) {
      this.$store.commit('SET_FILTERS', {
        status: false,
        filters: [],
        showCheckbox: []
      })
      this.filters = {}

      cb()

      this.setSliders()
    },

    // input autocompletes
    setAutocompletes(text = '') {
      _.forEach(this.autocompletes, val => {
        this['filtered' + val] = returnAutocompleteData(
          text,
          this.fullData,
          val
        )
      })
    },

    // selects
    setSelects() {
      _.forEach(this.selects, val => {
        const fillNumbers = prepareDataForAutocomplete(this.fullData, val)
        this['filtered' + val] = this.clearFilteredResult(fillNumbers)
      })
    },

    // sliders
    setSliders() {
      _.forEach(this.sliders, val => {
        const fillNumbers = prepareDataForAutocomplete(this.fullData, val)
        this.resolveSliders(val, fillNumbers)
      })
    },
    resolveSliders(value, numbers) {
      this['filtered' + value] = this.clearFilteredResult(numbers)

      this.filters[value] = [
        this['filtered' + value][0],
        _.last(this['filtered' + value])
      ]

      this['min' + value] = this['filtered' + value][0]
      this['max' + value] = _.last(this['filtered' + value])
    },
    clearFilteredResult(numbers) {
      return _.without(numbers, undefined, null, '')
    }
  },
  beforeDestroy() {
    this.fullData = []
    this.reset()
  }
}
