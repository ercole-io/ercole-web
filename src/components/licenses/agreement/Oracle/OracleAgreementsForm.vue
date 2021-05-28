<template>
  <AdvancedFiltersBase
    filterTitle="Add or Modify an Oracle Agreement"
    :submitAction="addUpdateAgreement"
    :isDisabled="$v.$invalid"
    :applyText="oracleForm.licenseID ? 'Update Agreement' : 'Add Agreement'"
    cancelText="Cancel"
  >
    <b-field
      label="Agreement Number *"
      custom-class="is-small"
      :type="{
        'is-danger': $v.oracleForm.agreeNumber.$error
      }"
      :message="{
        'This field is required':
          !$v.oracleForm.agreeNumber.required &&
          $v.oracleForm.agreeNumber.$error,
        'This field accepts only numbers':
          !$v.oracleForm.agreeNumber.numeric && $v.oracleForm.agreeNumber.$error
      }"
    >
      <b-autocomplete
        v-model="oracleForm.agreeNumber"
        size="is-small"
        type="number"
        :data="filteredAgreeNumbers"
        @typing="getAutocompleteData($event, 'agreeNumber', returnAgreeNumbers)"
        clearable
        @blur="$v.oracleForm.agreeNumber.$touch()"
        @input="$v.oracleForm.agreeNumber.$touch()"
      >
        <template slot="empty">No results found</template>
      </b-autocomplete>
    </b-field>

    <b-field
      label="Part Number, Item Description and Metric *"
      custom-class="is-small"
      :type="{
        'is-danger': $v.oracleForm.partNumber.$error
      }"
      :message="{
        'This field is required':
          !$v.oracleForm.partNumber.required && $v.oracleForm.partNumber.$error
      }"
    >
      <b-select
        @blur="$v.oracleForm.partNumber.$touch()"
        @input="$v.oracleForm.partNumber.$touch()"
        size="is-small"
        placeholder="Select"
        v-model="oracleForm.partNumber"
        expanded
      >
        <option
          v-for="(part, index) in returnAgreementParts"
          :key="index"
          :value="part.agreeParts"
        >
          {{ part.agreeParts }}
        </option>
      </b-select>
    </b-field>

    <b-field
      label="CSI *"
      custom-class="is-small"
      :type="{
        'is-danger': $v.oracleForm.csi.$error
      }"
      :message="{
        'This field is required':
          !$v.oracleForm.csi.required && $v.oracleForm.csi.$error
      }"
    >
      <b-autocomplete
        v-model="oracleForm.csi"
        size="is-small"
        type="text"
        :data="filteredCsi"
        @typing="getAutocompleteData($event, 'csi', returnCsiNumbers)"
        clearable
        @blur="$v.oracleForm.csi.$touch()"
        @input="$v.oracleForm.csi.$touch()"
      >
        <template slot="empty">No results found</template>
      </b-autocomplete>
    </b-field>

    <b-field
      label="Reference Number"
      custom-class="is-small"
      :type="{
        'is-danger': $v.oracleForm.referenceNumber.$error
      }"
      :message="{
        'This field is accepts only numbers':
          !$v.oracleForm.referenceNumber.numeric &&
          $v.oracleForm.referenceNumber.$error
      }"
    >
      <b-autocomplete
        v-model="oracleForm.referenceNumber"
        size="is-small"
        type="number"
        :data="filteredReferenceNumbers"
        @typing="
          getAutocompleteData($event, 'referenceNumber', returnReferenceNumbers)
        "
        clearable
        @blur="$v.oracleForm.referenceNumber.$touch()"
        @input="$v.oracleForm.referenceNumber.$touch()"
      >
        <template slot="empty">No results found</template>
      </b-autocomplete>
    </b-field>

    <b-field label="Licenses *" custom-class="is-small" grouped>
      <b-field label="ULA" custom-class="is-small" expanded>
        <b-checkbox size="is-small" v-model="oracleForm.ula" />
      </b-field>

      <span class="pr-4 pt-3">or</span>

      <b-field
        label="Number"
        custom-class="is-small"
        expanded
        :type="{
          'is-danger': $v.oracleForm.licenseNumber.$error
        }"
        :message="{
          'This field is required':
            !$v.oracleForm.licenseNumber.required &&
            $v.oracleForm.licenseNumber.$error,
          'This field accepts only numbers':
            !$v.oracleForm.licenseNumber.numeric &&
            $v.oracleForm.licenseNumber.$error
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
        />
      </b-field>
    </b-field>

    <b-field label="Host Associated" custom-class="is-small">
      <b-taginput
        v-model="oracleForm.hostAssociated"
        :data="filteredHostTags"
        ref="hostTag"
        autocomplete
        icon="label"
        placeholder="Add a hostname"
        @typing="getAutocompleteData($event, 'hostTags', hostnames.hostnames)"
        custom-class="is-small"
        :open-on-focus="true"
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

        <template slot="empty">
          There are no hostnames
        </template>
      </b-taginput>
    </b-field>

    <b-field label="Basket" custom-class="is-small">
      <div class="is-flex" style="justify-content: space-around;">
        <b-radio
          size="is-small"
          v-model="oracleForm.basket"
          :native-value="true"
          :disabled="restricted"
        >
          Yes
        </b-radio>
        <b-radio
          size="is-small"
          v-model="oracleForm.basket"
          :native-value="false"
          :disabled="restricted"
        >
          No
        </b-radio>
      </div>
    </b-field>

    <b-field label="Restricted" custom-class="is-small">
      <div class="is-flex" style="justify-content: space-around;">
        <b-radio
          size="is-small"
          v-model="oracleForm.restricted"
          :native-value="true"
        >
          Yes
        </b-radio>
        <b-radio
          size="is-small"
          v-model="oracleForm.restricted"
          :native-value="false"
        >
          No
        </b-radio>
      </div>
    </b-field>
  </AdvancedFiltersBase>
</template>

<script>
import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import { mapMutations } from 'vuex'
import {
  required,
  requiredIf,
  numeric,
  decimal
} from 'vuelidate/lib/validators'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import LicensesAgreementMixin from '@/mixins/licensesAgreement.js'
import AdvancedFiltersBase from '@/components/common/AdvancedFiltersBase.vue'

export default {
  mixins: [TooltipMixin, LicensesAgreementMixin],
  components: {
    AdvancedFiltersBase
  },
  validations: {
    oracleForm: {
      agreeNumber: { required, numeric },
      partNumber: { required },
      csi: { required },
      referenceNumber: { numeric },
      licenseNumber: {
        required: requiredIf(val => {
          return !val.ula
        }),
        decimal
      }
    }
  },
  data() {
    return {
      oracleForm: {
        licenseID: '',
        agreeNumber: '',
        partNumber: [],
        csi: '',
        referenceNumber: '',
        ula: false,
        licenseNumber: '',
        hostAssociated: [],
        basket: false,
        restricted: false
      }
    }
  },
  beforeMount() {
    bus.$on('onResetAction', () => this.cancelAddLicense())
    bus.$on('editAgreementOracle', data => {
      this.editAgreement(data)
    })
  },
  methods: {
    ...mapMutations(['CREATE_AGREEMENT']),
    addUpdateAgreement() {
      const oracleAgreementData = {
        agreementID: this.oracleForm.agreeNumber,
        csi: this.oracleForm.csi,
        referenceNumber: this.oracleForm.referenceNumber,
        unlimited: this.oracleForm.ula,
        count: Number(this.oracleForm.licenseNumber),
        hosts: this.oracleForm.hostAssociated,
        catchAll: this.oracleForm.basket,
        licenseTypeID: this.oracleForm.partNumber.split(' - ')[0],
        restricted: this.oracleForm.restricted
      }
      if (!this.oracleForm.licenseID) {
        this.createLicenseAgreement({
          body: oracleAgreementData,
          type: 'oracle'
        }).then(() => {
          this.cancelAddLicense()
        })
      } else {
        oracleAgreementData.id = this.oracleForm.licenseID
        this.updateLicenseAgreement({
          body: oracleAgreementData,
          type: 'oracle'
        }).then(() => {
          this.cancelAddLicense()
        })
      }
    },
    cancelAddLicense() {
      this.oracleForm = {
        licenseID: '',
        agreeNumber: '',
        partNumber: [],
        csi: '',
        referenceNumber: '',
        ula: false,
        licenseNumber: '',
        hostAssociated: [],
        basket: false,
        restricted: false
      }
    },
    editAgreement(data) {
      this.oracleForm = {
        licenseID: data.id,
        agreeNumber: data.agreementID,
        csi: data.csi,
        partNumber: `${data.licenseTypeID} - ${data.itemDescription} - ${data.metric}`,
        referenceNumber: data.referenceNumber,
        ula: data.unlimited,
        licenseNumber: Number(data.count),
        hostAssociated: this.checkArray(data.hosts)
          ? data.hosts
          : this.mapHostsAssociated(data.hosts),
        basket: data.catchAll,
        restricted: data.restricted
      }
    },
    checkArray(array) {
      return array.every(i => typeof i === 'string')
    },
    mapHostsAssociated(hostsAssociated) {
      return _.map(hostsAssociated, host => {
        return host.hostname
      })
    }
  },
  computed: {
    ula() {
      return this.oracleForm.ula
    },
    restricted() {
      return this.oracleForm.restricted
    }
  },
  watch: {
    ula(val) {
      if (val) {
        this.oracleForm.licenseNumber = ''
      }
    },
    restricted(val) {
      if (val) {
        this.oracleForm.basket = false
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
