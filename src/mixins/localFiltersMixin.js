import _ from 'lodash'
import {
  prepareDataForAutocomplete,
  organizeKeysBeforeFilter,
  returnAutocompleteData
} from '@/helpers/helpers.js'

export default {
  data() {
    return {
      filters: {
        cappedCPU: '',
        iconCluster: '',
        alertCategory: null,
        alertSeverity: null
      },
      filteredData: [],
      alertStatus: 'NEW'
    }
  },
  beforeMount() {
    if (this.$route.name === 'alerts') {
      this.filters = {
        alertCategory: this.alerts.params.category,
        alertSeverity: this.alerts.params.severity,
        hostname: this.alerts.params.hostname
      }
      this.apply()
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
      this.filters = {
        cappedCPU: '',
        iconCluster: '',
        alertCategory: null,
        alertSeverity: null
      }
      this.alertStatus = 'NEW'
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
      this['filtered' + value] = _.compact(numbers)

      this.filters[value] = [
        this['filtered' + value][0],
        _.last(this['filtered' + value])
      ]

      this['min' + value] = this['filtered' + value][0]
      this['max' + value] = _.last(this['filtered' + value])
    }
  },
  beforeDestroy() {
    this.reset()
    if (this.$route.name === 'alerts') {
      this.filters = {
        alertCategory: null,
        alertSeverity: null,
        hostname: null
      }
    }
  }
}
