import _ from 'lodash'
import { mapGetters } from 'vuex'
import { simpleAutocompleteData } from '@/helpers/helpers.js'

export default {
  data() {
    return {
      filteredhostTags: [],
      filteredclusterTags: [],
      currentTab: '',
      selectedID: '',
    }
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
    getAssociatedList(e, type) {
      if (e && e.id) {
        this.selectedID = e.id
        let list = this.filteredAssociatedListByLicenseId(type)

        this[`filtered${type}Tags`] = list
      }
    },
    filteredAssociatedListByLicenseId(type) {
      let list = []
      const newList = []
      if (type === 'host') {
        list = this.getHostsAssociated
      } else {
        list = this.getUsedLicensesByCluster
      }

      _.map(list, (item) => {
        if (type === 'host') {
          newList.push(item)
        } else {
          newList.push(item.name)
        }
      })
      return _.uniq(newList)
    },
    checkArray(array) {
      return array.every((i) => typeof i === 'string')
    },
    mapHostsAssociated(hostsAssociated) {
      return _.map(hostsAssociated, (host) => {
        return host.hostname
      })
    },
    mapClustersAssociated(clustersAssociated) {
      return _.map(clustersAssociated, (clust) => {
        return clust.name
      })
    },
    mapAssociated(data, type) {
      if (data === null) {
        return []
      } else {
        if (this.checkArray(data)) {
          return data
        } else if (!this.checkArray(data)) {
          if (type === 'host') {
            return this.mapHostsAssociated(data)
          } else {
            return this.mapClustersAssociated(data)
          }
        }
      }
    },
  },
  computed: {
    ...mapGetters([
      'getUsedLicensesByHost',
      'getUsedLicensesByCluster',
      'getHostsAssociated',
    ]),
  },
}
