import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'

import {
  prepareDataForAutocomplete,
  organizeKeysBeforeFilter,
  returnAutocompleteData,
} from '@/helpers/helpers.js'

import AdvancedFiltersBase from '@/components/common/AdvancedFiltersBase.vue'
import CustomField from '@/components/common/Form/CustomField.vue'
import CustomAutocomplete from '@/components/common/Form/CustomAutocomplete.vue'
import CustomSelect from '@/components/common/Form/CustomSelect.vue'
import CustomSlider from '@/components/common/Form/CustomSlider.vue'
import CustomRadio from '@/components/common/Form/CustomRadio.vue'
import CustomDatepicker from '@/components/common/Form/CustomDatepicker.vue'

export default {
  components: {
    AdvancedFiltersBase,
    CustomField,
    CustomAutocomplete,
    CustomSelect,
    CustomSlider,
    CustomRadio,
    CustomDatepicker,
  },
  data() {
    return {
      fullData: [],
      filters: {},
      filteredhostname: [],
      filtereddatabases: [],
      filteredmodel: [],
      filteredos: [],
      filteredcluster: [],
      filteredvirtNode: [],
      filteredkernel: [],
      filteredenvironment: [],
      filteredtechType: [],
      filteredplatform: [],
      filteredversion: [],
      filteredname: [],
      filteredtype: [],
      filteredcharset: [],
      filteredservices: [],
      filteredstatus: [],
      filtereduniqueName: [],
      filtereddbname: [],
      filteredfinding: [],
      filteredrecommendation: [],
      filteredaction: [],
      filteredsegmentOwner: [],
      filteredsegmentName: [],
      filteredsegmentType: [],
      filtereddbver: [],
      filtereddescription: [],
      filteredcharsetSystem: [],
      filteredarchitecture: [],
      filterededition: [],
      filteredengine: [],
      filteredfetchEndpoint: [],
      filteredsockets: [],
      filteredvirtualizationNodes: [],
      filteredvirtualizationNode: [],
      filteredalertCode: [],
      filteredcontractID: [],
      filteredfullPartNumber: [],
      filteredmetric: [],
      filteredcsi: [],
      filteredreferenceNumber: [],
      filterednumberOfLicenses: [],
      filtereddbName: [],
      filteredName: [],
      filteredFilename: [],
      filteredArch: [],
      filteredOperatingSystem: [],
      filteredOperatingSystemFamily: [],
      filteredRepository: [],
      filteredVersion: [],
      filteredprofile: [],
      filteredtenancyOCID: [],
      filtereduserOCID: [],
      filteredkeyFingerprint: [],
      filteredregion: [],
      filteredtenOCID: [],
      filteredimportance: [],
      filteredcompartmentName: [],
      filteredresourceID: [],
      filteredcategory: [],
      filteredobjectType: [],
      filteredsuggestion: [],
      filteredstateDesc: [],
      filteredcollationName: [],
      filteredlicensesNumber: [],
      filteredgrantee: [],
      filteredadminOption: [],
      filtereddefaultRole: [],
      filteredignoredComment: [],
      filteredid: [],
      filteredaccesskeyid: [],
      filteredprofileID: [],

      minmemorytotal: null,
      maxmemorytotal: null,
      minswaptotal: null,
      maxswaptotal: null,
      minthreads: null,
      maxthreads: null,
      mincores: null,
      maxcores: null,
      minsocket: null,
      maxsocket: null,
      minmemory: null,
      maxmemory: null,
      minsegmentSize: null,
      maxsegmentSize: null,
      mindatafileSize: null,
      maxdatafileSize: null,
      minwork: null,
      maxwork: null,
      mincpuCount: null,
      maxcpuCount: null,
      minblockSize: null,
      maxblockSize: null,
      minsegmentsSize: null,
      maxsegmentsSize: null,
      minbenefit: null,
      maxbenefit: null,
      minreclaimable: null,
      maxreclaimable: null,
      minbufferPoolSize: null,
      maxbufferPoolSize: null,
      mincpu: null,
      maxcpu: null,
      minvmsCount: null,
      maxvmsCount: null,
      minvmsErcoleAgentCount: null,
      maxvmsErcoleAgentCount: null,
      minlicensesPerCore: null,
      maxlicensesPerCore: null,
      minlicensesPerUser: null,
      maxlicensesPerUser: null,
      minavailableLicensesPerCore: null,
      maxavailableLicensesPerCore: null,
      minavailableLicensesPerUser: null,
      maxavailableLicensesPerUser: null,
      minavailable: null,
      maxavailable: null,
      minpurchased: null,
      maxpurchased: null,
      minconsumed: null,
      maxconsumed: null,
      mincovered: null,
      maxcovered: null,
      minusedLicenses: null,
      maxusedLicenses: null,
      minclusterLicenses: null,
      maxclusterLicenses: null,
      mindatabases: null,
      maxdatabases: null,
      minhostCount: null,
      maxhostCount: null,
      minpending: null,
      maxpending: null,
      mincostSaving: null,
      maxcostSaving: null,
    }
  },
  mounted() {
    bus.$on('onResetAction', () => this.reset(this.resetFilters))
    bus.$on('data', (data) => {
      this.fullData = data
    })
  },
  methods: {
    apply() {
      this.$store.commit('SET_FILTERS', {
        status: true,
        filters: organizeKeysBeforeFilter(this.filters),
        showCheckbox: [this.alertStatus, this.filters.alertCategory],
        selectList: this.selects,
      })
    },
    reset(cb = () => {}) {
      this.$store.commit('SET_FILTERS', {
        status: false,
        filters: [],
        showCheckbox: [],
      })
      this.filters = {}
      cb()
      this.setAutocompletes()
      this.setSelects()
      this.setSliders()
    },

    // input autocompletes
    setAutocompletes(text = '') {
      _.forEach(this.autocompletes, (val) => {
        this['filtered' + val] = returnAutocompleteData(
          text,
          this.fullData,
          val
        )
      })
    },

    // selects
    setSelects() {
      _.forEach(this.selects, (val) => {
        const fillNumbers = prepareDataForAutocomplete(this.fullData, val)
        this['filtered' + val] = this.clearFilteredResult(fillNumbers)
      })
    },

    // sliders
    setSliders() {
      _.forEach(this.sliders, (val) => {
        const fillNumbers = prepareDataForAutocomplete(this.fullData, val)
        this.resolveSliders(val, fillNumbers)
      })
    },
    resolveSliders(value, numbers) {
      this['filtered' + value] = this.clearFilteredResult(numbers)

      this.filters[value] = [
        this['filtered' + value][0],
        _.last(this['filtered' + value]),
      ]

      this['min' + value] = this['filtered' + value][0]
      this['max' + value] = _.last(this['filtered' + value])
    },
    clearFilteredResult(numbers) {
      return _.without(numbers, undefined, null, '')
    },
  },
  watch: {
    fullData(data) {
      if (data) {
        this.setAutocompletes()
        this.setSelects()
        this.setSliders()
      }
    },
  },
  beforeDestroy() {
    this.reset()
  },
}
