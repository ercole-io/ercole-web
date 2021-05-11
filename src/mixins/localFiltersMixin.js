import _ from 'lodash'
import {
  prepareDataForAutocomplete,
  organizeKeysBeforeFilter,
  returnAutocompleteData
} from '@/helpers/helpers.js'

export default {
  data() {
    return {
      filteredData: []
    }
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
    },
    setAutocompleteData(value, data) {
      this.filteredData = prepareDataForAutocomplete(data, value)
    },
    setFilteredAutocomplete(text, toFilter, data) {
      this.filteredData = returnAutocompleteData(text, data, toFilter)
    },
    setSliderFilterConfig(value, data) {
      const fillNumbers = prepareDataForAutocomplete(data, value)
      this.resolveSliderData(value, fillNumbers)
    },
    resolveSliderData(value, numbers) {
      this['filtered' + value] = _.without(numbers, undefined, null, '')

      this.filters[value] = [
        this['filtered' + value][0],
        _.last(this['filtered' + value])
      ]

      this['min' + value] = this['filtered' + value][0]
      this['max' + value] = _.last(this['filtered' + value])
    }
  }
}
