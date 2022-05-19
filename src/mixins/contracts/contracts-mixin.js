import _ from 'lodash'
import { mapState } from 'vuex'
import { simpleAutocompleteData } from '@/helpers/helpers.js'

export default {
  data() {
    return {
      filteredhostTags: [],
      filteredclusterTags: [],
    }
  },
  beforeMount() {
    this.filteredclusterTags = this.clusternames.clusternames
    this.filteredhostTags = this.hostnames.hostnames
  },
  methods: {
    sussessToastMsg(contractID, text) {
      this.$buefy.toast.open({
        message: `The Contract Number <b>${contractID}</b> was successfully ${text}!`,
        type: 'is-success',
        duration: 5000,
        position: 'is-bottom',
      })
    },
    getAutocompleteData(text, toFilter, data) {
      const values = simpleAutocompleteData(text, data)
      this[`filtered${toFilter}`] = _.uniqBy(values, (e) => e)
    },
    getAutocompleteLicensesTypes(text, toFilter, data, from) {
      const newData = []
      _.map(data, (val) => {
        newData.push(val.full)
      })

      const values = simpleAutocompleteData(text, newData)

      const newValues = []
      _.map(values, (val) => {
        const newVal = _.split(val, ' - ')

        if (from === 'oracle') {
          newValues.push({
            id: newVal[0],
            desc: newVal[1],
            metric: newVal[2],
            full: `${newVal[0]} - ${newVal[1]} - ${newVal[2]}`,
          })
        } else if (from === 'microsoft') {
          newValues.push({
            id: newVal[0],
            desc: newVal[1],
            version: newVal[3],
            edition: newVal[2],
            full: `${newVal[0]} - ${newVal[1]} - ${newVal[2]} - ${newVal[3]}`,
          })
        }
      })

      this[`filtered${toFilter}`] = newValues
    },
  },
  computed: {
    ...mapState(['hostnames', 'clusternames']),
  },
}
