import _ from 'lodash'
import {
  prepareDataForAutocomplete,
  organizeKeysBeforeFilter
} from '@/helpers/helpers.js'

export default {
  methods: {
    apply(filters) {
      this.$store.commit('SET_FILTERS', {
        status: true,
        filters: organizeKeysBeforeFilter(filters)
      })
    },
    reset() {
      this.$store.commit('SET_FILTERS', {
        status: false,
        filters: []
      })
    },
    setAutocompleteData(value, data) {
      this['filtered' + value] = prepareDataForAutocomplete(data, value)
    },
    setSliderFilterConfig(value, data, filters) {
      const fillNumbers = prepareDataForAutocomplete(data, value)
      this.resolveSliderData(value, fillNumbers, filters)
    },
    resolveSliderData(value, numbers, filters) {
      this['filtered' + value] = numbers

      this[filters][value] = [
        this['filtered' + value][0],
        _.last(this['filtered' + value])
      ]

      this['min' + value] = this['filtered' + value][0]
      this['max' + value] = _.last(this['filtered' + value])
    }
  },
  beforeDestroy() {
    this.resetFilters()
  }
}
