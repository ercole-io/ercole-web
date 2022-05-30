import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import { simpleAutocompleteData } from '@/helpers/helpers.js'

export default {
  data() {
    return {
      filteredhostTags: [],
      filteredclusterTags: [],
      licensesUsedByHost: [],
      licensesUsedByCluster: [],
      currentTab: '',
    }
  },
  async beforeMount() {
    await this.getLicensesHosts()
    this.licensesUsedByHost = this.getUsedLicensesByHost
    await this.getLicensesClusters()
    this.licensesUsedByCluster = await this.getUsedLicensesByCluster

    bus.$on('onTabChange', (value) => (this.currentTab = value))
  },
  methods: {
    ...mapActions(['getLicensesHosts', 'getLicensesClusters']),
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
      let list = []
      if (type === 'host') {
        list = this.licensesUsedByHost
      } else {
        list = this.licensesUsedByCluster
      }

      if (e && e.id) {
        const hostsList = []
        const clusterList = []

        _.map(list, (item) => {
          if (e.id === item.licenseTypeID) {
            if (type === 'host') {
              hostsList.push(item.hostname)
            } else {
              clusterList.push(item.cluster)
            }
          }
        })

        if (!_.isEqual(this.filteredhostTags.sort(), hostsList.sort())) {
          if (this.currentTab === 2) {
            this.msSqlServer.hosts = []
          } else if (this.currentTab === 1) {
            this.mysqlForm.hosts = []
          } else {
            this.oracleForm.hostAssociated = []
          }
        }

        if (!_.isEqual(this.filteredclusterTags.sort(), clusterList.sort())) {
          if (this.currentTab === 2) {
            this.msSqlServer.clusters = []
          } else if (this.currentTab === 1) {
            this.mysqlForm.clusters = []
          }
        }

        this.filteredhostTags = hostsList
        this.filteredclusterTags = clusterList
      }
    },
    checkArray(array) {
      return array.every((i) => typeof i === 'string')
    },
    mapHostsAssociated(hostsAssociated) {
      return _.map(hostsAssociated, (host) => {
        return host.hostname
      })
    },
  },
  computed: {
    ...mapGetters(['getUsedLicensesByHost', 'getUsedLicensesByCluster']),
    returnFilteredhostTags() {
      return this.filteredhostTags
    },
  },
}
