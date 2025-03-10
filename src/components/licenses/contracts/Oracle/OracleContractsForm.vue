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
        data-cy="oracle-contract-number"
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
          getAutocompleteLicensesTypes(
            $event,
            'partNumber',
            getOracleLicensesTypes,
            'oracle'
          )
        "
        @focus="() => (filteredpartNumber = getOracleLicensesTypes)"
        @blur="$v.oracleForm.partNumber.$touch()"
        @input="$v.oracleForm.partNumber.$touch()"
        @select="getAssociatedList($event, 'host')"
        open-on-focus
        clearable
        data-cy="oracle-part-number"
      >
        <template slot-scope="props">
          <div class="media media-custom">
            <div class="media-content" data-cy="oracle-part-number-options">
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
        data-cy="oracle-csi"
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
        data-cy="oracle-reference-number"
      >
        <template slot="empty">
          {{ $i18n.t('common.validations.noResults') }}
        </template>
      </b-autocomplete>
    </b-field>

    <b-field label="Support Expiration" custom-class="is-small">
      <CustomDatepicker
        v-model="oracleForm.supportExpiration"
        data-cy="oracle-support-expiration"
        :maxDate="false"
      />
    </b-field>

    <b-field label="Status" custom-class="is-small" expanded>
      <b-input
        size="is-small"
        type="text"
        v-model="oracleForm.status"
        data-cy="oracle-status"
      />
    </b-field>

    <b-field label="Product Order Date" custom-class="is-small" expanded>
      <!-- <b-datepicker></b-datepicker> -->
      <CustomDatepicker
        v-model="oracleForm.productOrderDate"
        data-cy="oracle-product-order"
      />
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
        <b-checkbox
          size="is-small"
          v-model="oracleForm.ula"
          data-cy="oracle-ula"
        />
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
          data-cy="oracle-number"
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
        :data="filteredhostTags"
        ref="hostTag"
        autocomplete
        icon="label"
        :placeholder="`${$t('common.forms.choose')} hostname`"
        @typing="
          getAutocompleteData(
            $event,
            'hostTags',
            filteredAssociatedListByLicenseId('host')
          )
        "
        custom-class="is-small"
        open-on-focus
        :disabled="ula || !restricted"
        data-cy="oracle-host-associated"
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

    <b-field
      :label="`${$t('common.fields.basket')}`"
      custom-class="is-small"
      data-cy="oracle-basket"
    >
      <div class="is-flex" style="justify-content: space-around">
        <b-radio
          size="is-small"
          v-model="oracleForm.basket"
          :native-value="true"
          :disabled="restricted || ula"
          data-cy="oracle-basket-true"
        >
          {{ $t('common.forms.yes') }}
        </b-radio>
        <b-radio
          size="is-small"
          v-model="oracleForm.basket"
          :native-value="false"
          :disabled="restricted || ula"
          data-cy="oracle-basket-false"
        >
          {{ $t('common.forms.no') }}
        </b-radio>
      </div>
    </b-field>

    <b-field
      :label="`${$t('common.fields.restricted')}`"
      custom-class="is-small"
      data-cy="oracle-restricted"
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

    <b-field label="Location" custom-class="is-small">
      <b-select
        size="is-small"
        placeholder="Select"
        v-model="oracleForm.location"
        expanded
        data-cy="oracle-location"
      >
        <option v-for="(loc, index) in locationList" :key="index">
          {{ loc }}
        </option>
      </b-select>
    </b-field>

    <slot />
  </AdvancedFiltersBase>
</template>

<script>
import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import {
  required,
  requiredIf,
  numeric,
  decimal,
} from 'vuelidate/lib/validators'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import AdvancedFiltersBase from '@/components/common/AdvancedFiltersBase.vue'
import ContractsMixin from '@/mixins/contracts/contracts-mixin.js'
import CustomDatepicker from '@/components/common/Form/CustomDatepicker.vue'

export default {
  name: 'licenses-contracts-oracle-form-component',
  mixins: [TooltipMixin, ContractsMixin],
  components: {
    AdvancedFiltersBase,
    CustomDatepicker,
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
        supportExpiration: null,
        status: '',
        productOrderDate: null,
        location: 'All',
      },
      locationList: [],
      filteredcontractID: [],
      filteredcsi: [],
      filteredreferenceNumber: [],
      filteredpartNumber: [],
    }
  },
  beforeMount() {
    this.filteredcontractID = this.getOracleContractsIDs
    this.filteredcsi = this.getOracleCsiNumbers
    this.filteredreferenceNumber = this.getOracleReferenceNumbers
    setTimeout(() => {
      this.filteredpartNumber = this.getOracleLicensesTypes
    }, 1000)

    bus.$on('onResetAction', () => this.resetFormContract())

    bus.$on('editOracleContract', (data) => {
      bus.$emit('onToggleEdit', true)
      this.editContract(data)
    })

    bus.$on('cloneOracleContract', (data) => {
      bus.$emit('onToggleEdit', true)
      this.editContract(data)
    })

    this.getHostsAssociatedList()

    this.locationList = JSON.parse(
      localStorage.getItem('persisted-data')
    ).globalFilters.locationsLicenses
    this.locationList.unshift('All')
  },
  methods: {
    ...mapActions(['oracleContractsActions', 'getHostsAssociatedList']),
    createUpdateContract() {
      const action = this.oracleForm.licenseID ? 'put' : 'post'
      const toastMsg = this.oracleForm.licenseID ? 'modified' : 'created'
      const location =
        this.oracleForm.location !== 'All' ? this.oracleForm.location : ''

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
        supportExpiration: this.oracleForm.supportExpiration,
        status: this.oracleForm.status,
        productOrderDate: this.oracleForm.productOrderDate,
        location: location,
      }

      if (action === 'put') {
        oracleAgreementData['id'] = this.oracleForm.licenseID
      }

      this.oracleContractsActions({
        action: action,
        body: oracleAgreementData,
      }).then(() => {
        this.resetFormContract()
        this.sussessToastMsg(oracleAgreementData.contractID, toastMsg)
      })
    },
    resetFormContract() {
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
        supportExpiration: null,
        status: '',
        productOrderDate: null,
        location: 'All',
      }
    },
    editContract(data) {
      this.getAssociatedList(
        {
          desc: data.itemDescription,
          full: `${data.licenseTypeID} - ${data.itemDescription} - ${data.metric}`,
          id: data.licenseTypeID,
          metric: data.metric,
        },
        'host'
      )
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
        hostAssociated: this.mapAssociated(data.hosts, 'host'),
        basket: data.basket,
        restricted: data.restricted,
        supportExpiration: data.supportExpiration
          ? new Date(data.supportExpiration)
          : null,
        status: data.status,
        productOrderDate: new Date(data.productOrderDate),
        location: data.location === '' ? 'All' : data.location,
      }
    },
  },
  computed: {
    ...mapGetters([
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
      if (!val) {
        this.oracleForm.hostAssociated = []
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
