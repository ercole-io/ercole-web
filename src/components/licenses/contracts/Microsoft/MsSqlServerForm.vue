<template>
  <AdvancedFiltersBase
    filterTitle="Add or Modify an SQLServer Contract"
    :submitAction="createUpdateContract"
    :isDisabled="$v.$invalid"
    :applyText="msSqlServer.id ? 'Update Contract' : 'Add Contract'"
    cancelText="Cancel"
  >
    <b-field
      label="Type *"
      custom-class="is-small"
      :type="{
        'is-danger': $v.msSqlServer.type.$error,
      }"
    >
      <b-select
        @blur="$v.msSqlServer.type.$touch()"
        @input="$v.msSqlServer.type.$touch()"
        size="is-small"
        placeholder="Select"
        v-model="msSqlServer.type"
        expanded
        data-cy="sqlserver-type"
      >
        <option :value="cluster">{{ cluster }}</option>
        <option :value="host">{{ host }}</option>
      </b-select>
      <template #message>
        <div v-if="!$v.msSqlServer.type.required && $v.msSqlServer.type.$error">
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
      </template>
    </b-field>

    <b-field
      label="Licenses Types *"
      custom-class="is-small"
      :type="{
        'is-danger': $v.msSqlServer.licenseTypeID.$error,
      }"
    >
      <b-autocomplete
        v-model="msSqlServer.licenseTypeID"
        size="is-small"
        type="text"
        icon="magnify"
        field="full"
        :data="filteredlicenseTypeID"
        @typing="
          getAutocompleteLicensesTypes(
            $event,
            'licenseTypeID',
            getMicrosoftLicensesTypes,
            'microsoft'
          )
        "
        @focus="() => (filteredlicenseTypeID = getMicrosoftLicensesTypes)"
        @blur="$v.msSqlServer.licenseTypeID.$touch()"
        @input="$v.msSqlServer.licenseTypeID.$touch()"
        @select="getAssociatedList($event, 'host')"
        open-on-focus
        clearable
        data-cy="sqlserver-license-type"
      >
        <template slot-scope="props">
          <div class="media media-custom">
            <div class="media-content" data-cy="sqlserver-license-type-options">
              <b>
                {{ props.option.id }}
              </b>
              <br />
              <small>
                {{ props.option.desc }}
                <br />
                {{ props.option.edition }} -
                {{ props.option.version }}
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
            !$v.msSqlServer.licenseTypeID.required &&
            $v.msSqlServer.licenseTypeID.$error
          "
        >
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
      </template>
    </b-field>

    <b-field
      label="Contract ID *"
      custom-class="is-small"
      expanded
      :type="{
        'is-danger': $v.msSqlServer.contractID.$error,
      }"
    >
      <b-input
        @blur="$v.msSqlServer.contractID.$touch()"
        @input="$v.msSqlServer.contractID.$touch()"
        size="is-small"
        v-model="msSqlServer.contractID"
        data-cy="sqlserver-contract-number"
      />
      <template #message>
        <div
          v-if="
            !$v.msSqlServer.contractID.required &&
            $v.msSqlServer.contractID.$error
          "
        >
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
      </template>
    </b-field>

    <b-field
      :label="`${$t('common.fields.numberLicenses')} *`"
      custom-class="is-small"
      expanded
      :type="{
        'is-danger': $v.msSqlServer.licensesNumber.$error,
      }"
    >
      <b-input
        @blur="$v.msSqlServer.licensesNumber.$touch()"
        @input="$v.msSqlServer.licensesNumber.$touch()"
        size="is-small"
        type="number"
        v-model="msSqlServer.licensesNumber"
        data-cy="sqlserver-number-license"
      />
      <template #message>
        <div
          v-if="
            !$v.msSqlServer.licensesNumber.required &&
            $v.msSqlServer.licensesNumber.$error
          "
        >
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
        <div
          v-if="
            !$v.msSqlServer.licensesNumber.numeric &&
            $v.msSqlServer.licensesNumber.$error
          "
        >
          {{ $i18n.t('common.validations.onlyNumbers') }}
        </div>
      </template>
    </b-field>

    <b-field
      label="Hosts"
      custom-class="is-small"
      v-if="msSqlServer.type === host"
    >
      <b-taginput
        v-model="msSqlServer.hosts"
        :data="filteredhostTags"
        ref="hostTag"
        autocomplete
        icon="label"
        placeholder="Add a hostname"
        @typing="
          getAutocompleteData(
            $event,
            'hostTags',
            filteredAssociatedListByLicenseId('host')
          )
        "
        custom-class="is-small"
        :open-on-focus="true"
      >
        <template slot-scope="props">
          {{ props.option }}
        </template>

        <template slot="selected" slot-scope="props">
          <b-tag
            v-for="(hosts, index) in props.tags"
            :key="index"
            type="is-primary"
            :tabstop="false"
            closable
            attached
            close-type="is-light"
            @close="$refs.hostTag.removeTag(index, $event)"
          >
            {{ hosts }}
          </b-tag>
        </template>

        <template slot="empty"> There are no hostnames </template>
      </b-taginput>
    </b-field>

    <b-field
      label="Clusters"
      custom-class="is-small"
      v-if="msSqlServer.type === cluster"
    >
      <b-taginput
        v-model="msSqlServer.clusters"
        :data="filteredclusterTags"
        ref="clusterTag"
        autocomplete
        icon="label"
        placeholder="Add a clustername"
        @typing="
          getAutocompleteData(
            $event,
            'clusterTags',
            filteredAssociatedListByLicenseId('cluster')
          )
        "
        custom-class="is-small"
        :open-on-focus="true"
      >
        <template slot-scope="props">
          {{ props.option }}
        </template>

        <template slot="selected" slot-scope="props">
          <b-tag
            v-for="(clusters, index) in props.tags"
            :key="index"
            type="is-primary"
            :tabstop="false"
            closable
            attached
            close-type="is-light"
            @close="$refs.clusterTag.removeTag(index, $event)"
          >
            {{ clusters }}
          </b-tag>
        </template>

        <template slot="empty"> There are no clusternames </template>
      </b-taginput>
    </b-field>

    <b-field label="Support Expiration" custom-class="is-small">
      <b-datepicker
        v-model="msSqlServer.supportExpiration"
        placeholder="Set a Date"
        size="is-small"
        append-to-body
        position="is-top-right"
        icon="calendar-today"
        data-cy="sqlserver-expiration"
      />
    </b-field>

    <b-field label="Location" custom-class="is-small">
      <b-select
        size="is-small"
        placeholder="Select"
        v-model="msSqlServer.location"
        expanded
        data-cy="sqlserver-location"
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
import { required, numeric } from 'vuelidate/lib/validators'
import toUpper from '@/filters/toUpper.js'
import AdvancedFiltersBase from '@/components/common/AdvancedFiltersBase.vue'
import ContractsMixin from '@/mixins/contracts/contracts-mixin.js'

export default {
  name: 'licenses-contracts-microsoft-form-component',
  mixins: [ContractsMixin],
  components: {
    AdvancedFiltersBase,
  },
  validations: {
    msSqlServer: {
      type: { required },
      licenseTypeID: { required },
      contractID: { required },
      licensesNumber: { required, numeric },
    },
  },
  data() {
    return {
      msSqlServer: {
        hosts: [],
        clusters: [],
        location: 'All',
      },
      locationList: [],
      host: 'host',
      cluster: 'cluster',
      filteredlicenseTypeID: [],
    }
  },
  beforeMount() {
    this.filteredlicenseTypeID = this.getMicrosoftLicensesTypes

    bus.$on('onResetAction', () => (this.msSqlServer = { location: 'All' }))
    bus.$on('updateMicrosoftContract', (data) => {
      bus.$emit('onToggleEdit', true)
      this.editContract(data)
    })

    this.locationList = JSON.parse(
      localStorage.getItem('persisted-data')
    ).globalFilters.locations
    this.locationList.unshift('All')
  },
  methods: {
    ...mapActions(['microsoftContractsActions']),
    createUpdateContract() {
      const action = this.msSqlServer.id ? 'put' : 'post'
      const toastMsg = this.msSqlServer.id ? 'modified' : 'created'
      const contractID = this.msSqlServer.contractID

      this.msSqlServer.licensesNumber = Number(this.msSqlServer.licensesNumber)
      this.msSqlServer.licenseTypeID = _.split(
        this.msSqlServer.licenseTypeID,
        ' - '
      )[0]
      this.msSqlServer.type = toUpper(this.msSqlServer.type)
      this.msSqlServer.hosts =
        this.msSqlServer.type === 'HOST' ? this.msSqlServer.hosts : []
      this.msSqlServer.clusters =
        this.msSqlServer.type === 'CLUSTER' ? this.msSqlServer.clusters : []
      this.msSqlServer.location =
        this.msSqlServer.location !== 'All' ? this.msSqlServer.location : ''

      this.microsoftContractsActions({
        action: action,
        body: this.msSqlServer,
      }).then(() => {
        this.msSqlServer = {}
        this.sussessToastMsg(contractID, toastMsg)
      })
    },
    editContract(data) {
      this.getAssociatedList(
        {
          full: `${data.licenseTypeID} - ${data.itemDescription} - ${data.metric}`,
          licenseTypeID: data.licenseTypeID,
          description: data.itemDescription,
          metric: data.metric,
        },
        data.type
      )
      this.msSqlServer = {
        id: data.id,
        type: data.type,
        licenseTypeID: data.fullPartNumber,
        contractID: data.contractID,
        licensesNumber: data.licensesNumber,
        supportExpiration: data.supportExpiration
          ? new Date(data.supportExpiration)
          : null,
        hosts: this.mapAssociated(data.hosts, 'host'),
        clusters: this.mapAssociated(data.clusters, 'cluster'),
        location: data.location === '' ? 'All' : data.location,
      }
    },
  },
  computed: {
    ...mapGetters(['getMicrosoftLicensesTypes']),
  },
}
</script>

<style lang="scss" scoped></style>
