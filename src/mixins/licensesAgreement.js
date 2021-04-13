import { mapState, mapGetters, mapActions } from 'vuex'
import { simpleAutocompleteData } from '@/helpers/helpers.js'

export default {
  data() {
    return {
      filteredClusterTags: [],
      filteredHostTags: [],
      filteredAgreeNumbers: [],
      filteredCsi: [],
      filteredReferenceNumbers: []
    }
  },
  beforeMount() {
    this.filteredClusterTags = this.clusternames.clusternames
    this.filteredHostTags = this.hostnames.hostnames
    this.filteredAgreeNumbers = this.returnAgreeNumbers
    this.filteredCsi = this.returnCsiNumbers
    this.filteredReferenceNumbers = this.returnReferenceNumbers
  },
  methods: {
    ...mapActions([
      'getLicensesAgreement',
      'createLicenseAgreement',
      'updateLicenseAgreement',
      'deleteLicenseAgreement'
    ]),
    deleteAgreement(type, id) {
      const payload = {
        type: type,
        id: id
      }
      this.deleteLicenseAgreement(payload).then(() => {
        this.$store.commit('DELETE_AGREEMENT', payload)
      })
    },
    getAutocompleteData(text, toFilter, data) {
      const autocomplete = simpleAutocompleteData(text, data)

      switch (toFilter) {
        case 'clusterTags':
          this.filteredClusterTags = autocomplete
          break
        case 'hostTags':
          this.filteredHostTags = autocomplete
          break
        case 'agreeNumber':
          this.filteredAgreeNumbers = autocomplete
          break
        case 'csi':
          this.filteredCsi = autocomplete
          break
        case 'referenceNumber':
          this.filteredReferenceNumbers = autocomplete
          break
        default:
          break
      }
    }
  },
  computed: {
    ...mapState(['hostnames', 'clusternames']),
    ...mapGetters([
      'returnAgreementParts',
      'returnLicensesAgreement',
      'returnAgreeNumbers',
      'returnCsiNumbers',
      'returnReferenceNumbers'
    ])
  }
}
