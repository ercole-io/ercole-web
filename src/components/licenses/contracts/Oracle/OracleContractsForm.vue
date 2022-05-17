<template>
  <AdvancedFiltersBase
    :filterTitle="$t('views.licenses.addAgreement')"
    :submitAction="createUpdateContract"
    :isDisabled="$v.$invalid"
    :applyText="
      oracleForm.licenseID ? $t('common.forms.update') : $t('common.forms.add')
    "
    :cancelText="$t('common.forms.cancel')"
  >
    <b-field
      :label="`${$t('common.fields.agreeNumber')} *`"
      custom-class="is-small"
      :type="{
        'is-danger': $v.oracleForm.contractID.$error,
      }"
    >
      <b-autocomplete
        v-model="oracleForm.contractID"
        size="is-small"
        type="number"
        icon="magnify"
        :data="filteredcontractID"
        @typing="
          getAutocompleteData($event, 'contractID', getOracleContractsIDs)
        "
        clearable
        @blur="$v.oracleForm.contractID.$touch()"
        @input="$v.oracleForm.contractID.$touch()"
      >
        <template slot="empty">
          {{ $i18n.t('common.validations.noResults') }}
        </template>
      </b-autocomplete>
      <template #message>
        <div
          v-if="
            !$v.oracleForm.contractID.required &&
            $v.oracleForm.contractID.$error
          "
        >
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
        <div
          v-if="
            !$v.oracleForm.contractID.numeric && $v.oracleForm.contractID.$error
          "
        >
          {{ $i18n.t('common.validations.onlyNumbers') }}
        </div>
      </template>
    </b-field>

    <b-field
      :label="`${$t('common.fields.fullAgreement')} *`"
      custom-class="is-small"
      :type="{
        'is-danger': $v.oracleForm.partNumber.$error,
      }"
    >
      <b-autocomplete
        v-model="oracleForm.partNumber"
        size="is-small"
        type="text"
        icon="magnify"
        field="full"
        :data="filteredpartNumber"
        @typing="
          getAutocompletePartNumber(
            $event,
            'partNumber',
            getOracleLicensesTypes
          )
        "
        @focus="() => (filteredpartNumber = getOracleLicensesTypes)"
        @blur="$v.oracleForm.partNumber.$touch()"
        @input="$v.oracleForm.partNumber.$touch()"
        @select="getHostAssociatedList"
        open-on-focus
        clearable
      >
        <template slot-scope="props">
          <div class="media media-custom">
            <div class="media-content">
              <b>{{ props.option.id }}</b>
              <br />
              <small>
                {{ props.option.desc }}
                <br />
                {{ props.option.metric }}
              </small>
            </div>
          </div>
        </template>
        <template slot="empty">
          {{ $i18n.t('common.validations.noResults') }}
        </template>
      </b-autocomplete>

      <!-- <b-select
        @blur="$v.oracleForm.partNumber.$touch()"
        @input="$v.oracleForm.partNumber.$touch()"
        size="is-small"
        placeholder="Select"
        v-model="oracleForm.partNumber"
        expanded
      >
        <option
          v-for="(part, index) in getOracleLicensesTypes"
          :key="index"
          :value="part.agreeParts"
        >
          {{ part.agreeParts }}
        </option>
      </b-select> -->
      <template #message>
        <div
          v-if="
            !$v.oracleForm.partNumber.required &&
            $v.oracleForm.partNumber.$error
          "
        >
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
      </template>
    </b-field>

    <b-field
      :label="`${$t('common.fields.csi')} *`"
      custom-class="is-small"
      :type="{
        'is-danger': $v.oracleForm.csi.$error,
      }"
    >
      <b-autocomplete
        v-model="oracleForm.csi"
        size="is-small"
        type="text"
        icon="magnify"
        :data="filteredcsi"
        @typing="getAutocompleteData($event, 'csi', getOracleCsiNumbers)"
        clearable
        @blur="$v.oracleForm.csi.$touch()"
        @input="$v.oracleForm.csi.$touch()"
      >
        <template slot="empty">
          {{ $i18n.t('common.validations.noResults') }}
        </template>
      </b-autocomplete>
      <template #message>
        <div v-if="!$v.oracleForm.csi.required && $v.oracleForm.csi.$error">
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
      </template>
    </b-field>

    <b-field
      :label="`${$t('common.fields.refNumber')}`"
      custom-class="is-small"
    >
      <b-autocomplete
        v-model="oracleForm.referenceNumber"
        size="is-small"
        type="text"
        icon="magnify"
        :data="filteredreferenceNumber"
        @typing="
          getAutocompleteData(
            $event,
            'referenceNumber',
            getOracleReferenceNumbers
          )
        "
        clearable
      >
        <template slot="empty">
          {{ $i18n.t('common.validations.noResults') }}
        </template>
      </b-autocomplete>
    </b-field>

    <b-field
      :label="`${$t('common.fields.licemnses')} *`"
      custom-class="is-small"
      grouped
    >
      <b-field
        :label="`${$t('common.fields.ula')}`"
        custom-class="is-small"
        expanded
      >
        <b-checkbox size="is-small" v-model="oracleForm.ula" />
      </b-field>

      <span class="pr-4 pt-3">{{ $t('common.forms.or') }}</span>

      <b-field
        :label="`${$t('common.fields.number')}`"
        custom-class="is-small"
        expanded
        :type="{
          'is-danger': $v.oracleForm.licenseNumber.$error,
        }"
      >
        <b-input
          @blur="$v.oracleForm.licenseNumber.$touch()"
          @input="$v.oracleForm.licenseNumber.$touch()"
          size="is-small"
          type="number"
          step="any"
          v-model="oracleForm.licenseNumber"
          :disabled="ula"
          :custom-class="disableInput"
        />

        <template #message>
          <div
            v-if="
              !$v.oracleForm.licenseNumber.required &&
              $v.oracleForm.licenseNumber.$error
            "
          >
            {{ $i18n.t('common.validations.requiredAlt') }}
          </div>
        </template>
      </b-field>
    </b-field>

    <b-field
      :label="`${$t('common.fields.hostAssociated')}`"
      custom-class="is-small"
    >
      <b-taginput
        v-model="oracleForm.hostAssociated"
        :data="filteredhostTagsOracle"
        ref="hostTag"
        autocomplete
        icon="label"
        :placeholder="`${$t('common.forms.choose')} hostname`"
        @typing="getAutocompleteData($event, 'hostTags', hostAssociatedList)"
        custom-class="is-small"
        open-on-focus
        :disabled="ula"
      >
        <template slot-scope="props">
          {{ props.option }}
        </template>

        <template slot="selected" slot-scope="props">
          <b-tag
            v-for="(oracleHost, index) in props.tags"
            :key="index"
            type="is-primary"
            :tabstop="false"
            closable
            attached
            close-type="is-light"
            @close="$refs.hostTag.removeTag(index, $event)"
          >
            {{ oracleHost }}
          </b-tag>
        </template>

        <template slot="empty"> There are no hostnames </template>
      </b-taginput>
    </b-field>

    <b-field :label="`${$t('common.fields.basket')}`" custom-class="is-small">
      <div class="is-flex" style="justify-content: space-around">
        <b-radio
          size="is-small"
          v-model="oracleForm.basket"
          :native-value="true"
          :disabled="restricted || ula"
        >
          {{ $t('common.forms.yes') }}
        </b-radio>
        <b-radio
          size="is-small"
          v-model="oracleForm.basket"
          :native-value="false"
          :disabled="restricted || ula"
        >
          {{ $t('common.forms.no') }}
        </b-radio>
      </div>
    </b-field>

    <b-field
      :label="`${$t('common.fields.restricted')}`"
      custom-class="is-small"
    >
      <div class="is-flex" style="justify-content: space-around">
        <b-radio
          size="is-small"
          v-model="oracleForm.restricted"
          :native-value="true"
          :disabled="ula"
        >
          {{ $t('common.forms.yes') }}
        </b-radio>
        <b-radio
          size="is-small"
          v-model="oracleForm.restricted"
          :native-value="false"
          :disabled="ula"
        >
          No
        </b-radio>
      </div>
    </b-field>

    <slot />
  </AdvancedFiltersBase>
</template>

<script>
import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters, mapState } from 'vuex'
import {
  required,
  requiredIf,
  numeric,
  decimal,
} from 'vuelidate/lib/validators'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import AdvancedFiltersBase from '@/components/common/AdvancedFiltersBase.vue'
import { simpleAutocompleteData } from '@/helpers/helpers.js'

export default {
  mixins: [TooltipMixin],
  components: {
    AdvancedFiltersBase,
  },
  validations: {
    oracleForm: {
      contractID: { required, numeric },
      partNumber: { required },
      csi: { required },
      licenseNumber: {
        required: requiredIf((val) => {
          return !val.ula
        }),
        decimal,
      },
    },
  },
  data() {
    return {
      oracleForm: {
        licenseID: '',
        contractID: '',
        partNumber: '',
        csi: '',
        referenceNumber: '',
        ula: false,
        licenseNumber: '',
        hostAssociated: [],
        basket: false,
        restricted: false,
      },
      licensesUsed: [],
      hostAssociatedList: [],
      filteredclusterTags: [],
      filteredhostTagsOracle: [],
      filteredhostTags: [],
      filteredcontractID: [],
      filteredcsi: [],
      filteredreferenceNumber: [],
      filteredpartNumber: [],
    }
  },
  async beforeMount() {
    this.filteredclusterTags = this.clusternames.clusternames
    this.filteredhostTags = this.hostnames.hostnames
    this.filteredcontractID = this.getOracleContractsIDs
    this.filteredcsi = this.getOracleCsiNumbers
    this.filteredreferenceNumber = this.getOracleReferenceNumbers
    setTimeout(() => {
      this.filteredpartNumber = this.getOracleLicensesTypes
    }, 1000)

    bus.$on('onResetAction', () => this.cancelCreateContract())

    bus.$on('editOracleContract', (data) => {
      bus.$emit('onToggleEdit', true)
      this.editContract(data)
    })

    bus.$on('cloneOracleContract', (data) => {
      bus.$emit('onToggleEdit', true)
      this.editContract(data)
    })

    await this.getLicensesHosts()
    this.licensesUsed = await this.getUsedLicensesByHost
  },
  methods: {
    ...mapActions(['oracleContractsActions', 'getLicensesHosts']),
    createUpdateContract() {
      const action = this.oracleForm.licenseID ? 'put' : 'post'
      const toastMsg = this.oracleForm.licenseID ? 'modified' : 'created'

      let oracleAgreementData = {
        contractID: this.oracleForm.contractID,
        csi: this.oracleForm.csi,
        referenceNumber: this.oracleForm.referenceNumber,
        unlimited: this.oracleForm.ula,
        count: Number(this.oracleForm.licenseNumber),
        hosts: this.oracleForm.hostAssociated,
        basket: this.oracleForm.basket,
        licenseTypeID: this.oracleForm.partNumber.split(' - ')[0],
        restricted: this.oracleForm.restricted,
      }

      if (action === 'put') {
        oracleAgreementData['id'] = this.oracleForm.licenseID
      }

      this.oracleContractsActions({
        action: action,
        body: oracleAgreementData,
      }).then(() => {
        this.oracleForm = {}
        this.sussessToastMsg(this.oracleForm.contractID, toastMsg)
      })
    },
    cancelCreateContract() {
      this.oracleForm = {
        licenseID: '',
        contractID: '',
        partNumber: '',
        csi: '',
        referenceNumber: '',
        ula: false,
        licenseNumber: '',
        hostAssociated: [],
        basket: false,
        restricted: false,
      }
    },
    editContract(data) {
      this.getHostAssociatedList({
        desc: data.itemDescription,
        full: `${data.licenseTypeID} - ${data.itemDescription} - ${data.metric}`,
        id: data.licenseTypeID,
        metric: data.metric,
      })
      this.oracleForm = {
        licenseID: data.id,
        contractID: data.contractID,
        csi: data.csi,
        partNumber: `${data.licenseTypeID} - ${data.itemDescription} - ${data.metric}`,
        referenceNumber: data.referenceNumber,
        ula: data.unlimited,
        licenseNumber: _.sum([
          Number(data.licensesPerUser),
          Number(data.licensesPerCore),
        ]),
        hostAssociated: this.checkArray(data.hosts)
          ? data.hosts
          : this.mapHostsAssociated(data.hosts),
        basket: data.basket,
        restricted: data.restricted,
      }
    },
    getHostAssociatedList(e) {
      this.hostAssociatedList = []

      if (e) {
        _.map(this.licensesUsed, (item) => {
          if (e.id === item.licenseTypeID) {
            this.hostAssociatedList.push(item.hostname)
          }
        })
      }

      this.filteredhostTagsOracle = this.hostAssociatedList
    },
    checkArray(array) {
      return array.every((i) => typeof i === 'string')
    },
    mapHostsAssociated(hostsAssociated) {
      return _.map(hostsAssociated, (host) => {
        return host.hostname
      })
    },
    sussessToastMsg(contractID, text) {
      this.$buefy.toast.open({
        message: `The Agreement Number <b>${contractID}</b> was successfully ${text}!`,
        type: 'is-success',
        duration: 5000,
        position: 'is-bottom',
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
      'getUsedLicensesByHost',
      'getOracleContractsIDs',
      'getOracleCsiNumbers',
      'getOracleReferenceNumbers',
      'getOracleLicensesTypes',
    ]),
    ula() {
      return this.oracleForm.ula
    },
    restricted() {
      return this.oracleForm.restricted
    },
    disableInput() {
      return this.ula ? 'has-background-grey-lighter' : ''
    },
  },
  watch: {
    ula(val) {
      if (val) {
        this.oracleForm.licenseNumber = ''
        this.oracleForm.basket = true
        this.oracleForm.restricted = false
        this.oracleForm.hostAssociated = []
      }
    },
    restricted(val) {
      if (val) {
        this.oracleForm.basket = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.media-custom {
  line-height: 1.2;
  font-size: 0.75rem;
}
</style>
