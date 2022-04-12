import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import { mapState, mapGetters, mapActions } from 'vuex'
import { simpleAutocompleteData } from '@/helpers/helpers.js'

export default {
  data() {
    return {
      filteredclusterTags: [],
      filteredhostTagsOracle: [],
      filteredhostTags: [],
      filteredcontractID: [],
      filteredcsi: [],
      filteredreferenceNumber: [],
      filteredpartNumber: [],
    }
  },
  beforeMount() {
    this.filteredclusterTags = this.clusternames.clusternames
    this.filteredhostTags = this.hostnames.hostnames
    this.filteredcontractID = this.returnContractIDs
    this.filteredcsi = this.returnCsiNumbers
    this.filteredreferenceNumber = this.returnReferenceNumbers
    setTimeout(() => {
      this.filteredpartNumber = this.returnLicensesTypes
    }, 1000)
  },
  methods: {
    ...mapActions([
      'getLicensesContracts',
      'createLicenseContract',
      'updateLicenseContract',
      'deleteLicenseContract',
    ]),
    deleteAgreement(type, id, agreeNumber = ' - ') {
      this.$buefy.dialog.confirm({
        title: 'Delete Agreement',
        message: `Are you sure you want to <b>delete</b> the agreement number <b>${agreeNumber}</b>? This action cannot be undone.`,
        confirmText: 'Confirm',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          const payload = {
            type: type,
            id: id,
          }
          this.deleteLicenseContract(payload)
            .then(() => {
              this.$store.commit('DELETE_AGREEMENT', payload)
            })
            .then(() => {
              bus.$emit('data', this.returnLicensesContracts(type))
            })
        },
      })
    },
    getAutocompleteData(text, toFilter, data) {
      const values = simpleAutocompleteData(text, data)
      this[`filtered${toFilter}`] = _.uniqBy(values, (e) => e)
    },
    getAutocompletePartNumber(text, toFilter, data) {
      const newData = []
      _.map(data, (val) => {
        newData.push(val.full)
      })

      const values = simpleAutocompleteData(text, newData)

      const newValues = []
      _.map(values, (val) => {
        const newVal = _.split(val, ' - ')
        newValues.push({
          id: newVal[0],
          desc: newVal[1],
          metric: newVal[2],
          full: `${newVal[0]} - ${newVal[1]} - ${newVal[2]}`,
        })
      })

      this[`filtered${toFilter}`] = newValues
    },
  },
  computed: {
    ...mapState(['hostnames', 'clusternames']),
    ...mapGetters([
      'returnLicensesTypes',
      'returnLicensesContracts',
      'returnContractIDs',
      'returnCsiNumbers',
      'returnReferenceNumbers',
    ]),
  },
}
