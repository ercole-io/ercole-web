<template>
  <AdvancedFiltersBase
    filterTitle="Add or Modify an MySql Contract"
    :submitAction="createUpdateContract"
    :isDisabled="$v.$invalid"
    :applyText="mysqlForm.id ? 'Update Contract' : 'Add Contract'"
    cancelText="Cancel"
  >
    <b-field
      label="Type *"
      custom-class="is-small"
      :type="{
        'is-danger': $v.mysqlForm.type.$error,
      }"
    >
      <b-select
        @blur="$v.mysqlForm.type.$touch()"
        @input="$v.mysqlForm.type.$touch()"
        size="is-small"
        placeholder="Select"
        v-model="mysqlForm.type"
        expanded
        data-cy="mysql-type"
      >
        <option :value="cluster">{{ cluster }}</option>
        <option :value="host">{{ host }}</option>
      </b-select>
      <template #message>
        <div v-if="!$v.mysqlForm.type.required && $v.mysqlForm.type.$error">
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
      </template>
    </b-field>

    <b-field
      label="Licenses Types *"
      custom-class="is-small"
      :type="{
        'is-danger': $v.mysqlForm.licenseTypeID.$error,
      }"
    >
      <b-autocomplete
        v-model="mysqlForm.licenseTypeID"
        size="is-small"
        type="text"
        icon="magnify"
        field="full"
        :data="filteredlicenseTypeID"
        @typing="
          getAutocompleteLicensesTypes(
            $event,
            'licenseTypeID',
            getMysqlLicensesTypes,
            'mysql'
          )
        "
        @focus="() => (filteredlicenseTypeID = getMysqlLicensesTypes)"
        @blur="$v.mysqlForm.licenseTypeID.$touch()"
        @input="$v.mysqlForm.licenseTypeID.$touch()"
        @select="getAssociatedList($event, 'host')"
        open-on-focus
        clearable
        data-cy="mysql-license-type"
      >
        <template slot-scope="props">
          <div class="media media-custom">
            <div class="media-content" data-cy="mysql-license-type-options">
              <b>
                {{ props.option.id }}
              </b>
              <br />
              <small>
                {{ props.option.desc }}
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
            !$v.mysqlForm.licenseTypeID.required &&
            $v.mysqlForm.licenseTypeID.$error
          "
        >
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
      </template>
    </b-field>

    <b-field
      :label="`${$t('common.fields.agreeNumber')} *`"
      custom-class="is-small"
      expanded
      :type="{
        'is-danger': $v.mysqlForm.contractID.$error,
      }"
    >
      <b-input
        @blur="$v.mysqlForm.contractID.$touch()"
        @input="$v.mysqlForm.contractID.$touch()"
        size="is-small"
        v-model="mysqlForm.contractID"
        data-cy="mysql-contract-number"
      />
      <template #message>
        <div
          v-if="
            !$v.mysqlForm.contractID.required && $v.mysqlForm.contractID.$error
          "
        >
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
      </template>
    </b-field>

    <b-field
      :label="`${$t('common.fields.csi')} *`"
      custom-class="is-small"
      expanded
      :type="{
        'is-danger': $v.mysqlForm.csi.$error,
      }"
    >
      <b-input
        @blur="$v.mysqlForm.csi.$touch()"
        @input="$v.mysqlForm.csi.$touch()"
        size="is-small"
        type="number"
        v-model="mysqlForm.csi"
        data-cy="mysql-csi"
      />
      <template #message>
        <div v-if="!$v.mysqlForm.csi.required && $v.mysqlForm.csi.$error">
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
        <div v-if="!$v.mysqlForm.csi.numeric && $v.mysqlForm.csi.$error">
          {{ $i18n.t('common.validations.onlyNumbers') }}
        </div>
      </template>
    </b-field>

    <b-field label="Support Expiration" custom-class="is-small">
      <b-datepicker
        v-model="mysqlForm.supportExpiration"
        placeholder="Set a Date"
        size="is-small"
        append-to-body
        position="is-top-right"
        icon="calendar-today"
        data-cy="mysql-expiration"
      />
    </b-field>

    <b-field
      :label="`${$t('common.fields.numberLicenses')} *`"
      custom-class="is-small"
      expanded
      :type="{
        'is-danger': $v.mysqlForm.numberOfLicenses.$error,
      }"
    >
      <b-input
        @blur="$v.mysqlForm.numberOfLicenses.$touch()"
        @input="$v.mysqlForm.numberOfLicenses.$touch()"
        size="is-small"
        type="number"
        v-model="mysqlForm.numberOfLicenses"
        data-cy="mysql-license-number"
      />
      <template #message>
        <div
          v-if="
            !$v.mysqlForm.numberOfLicenses.required &&
            $v.mysqlForm.numberOfLicenses.$error
          "
        >
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
        <div
          v-if="
            !$v.mysqlForm.numberOfLicenses.numeric &&
            $v.mysqlForm.numberOfLicenses.$error
          "
        >
          {{ $i18n.t('common.validations.onlyNumbers') }}
        </div>
      </template>
    </b-field>

    <b-field
      label="Hosts"
      custom-class="is-small"
      v-if="mysqlForm.type === host"
    >
      <b-taginput
        v-model="mysqlForm.hosts"
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
        data-cy="mysql-hosts-associated"
      >
        <template slot-scope="props">
          {{ props.option }}
        </template>

        <template slot="selected" slot-scope="props">
          <b-tag
            v-for="(mysqlHost, index) in props.tags"
            :key="index"
            type="is-primary"
            :tabstop="false"
            closable
            attached
            close-type="is-light"
            @close="$refs.hostTag.removeTag(index, $event)"
          >
            {{ mysqlHost }}
          </b-tag>
        </template>

        <template slot="empty"> There are no hostnames </template>
      </b-taginput>
    </b-field>

    <b-field
      label="Clusters"
      custom-class="is-small"
      v-if="mysqlForm.type === cluster"
    >
      <b-taginput
        v-model="mysqlForm.clusters"
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
        data-cy="mysql-clusters-associated"
      >
        <template slot-scope="props">
          {{ props.option }}
        </template>

        <template slot="selected" slot-scope="props">
          <b-tag
            v-for="(mysqlCluster, index) in props.tags"
            :key="index"
            type="is-primary"
            :tabstop="false"
            closable
            attached
            close-type="is-light"
            @close="$refs.clusterTag.removeTag(index, $event)"
          >
            {{ mysqlCluster }}
          </b-tag>
        </template>

        <template slot="empty"> There are no clusternames </template>
      </b-taginput>
    </b-field>

    <b-field label="Location" custom-class="is-small">
      <b-select
        size="is-small"
        placeholder="Select"
        v-model="mysqlForm.location"
        expanded
        data-cy="mysql-location"
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
import { required, numeric } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'
import toUpper from '@/filters/toUpper.js'
import AdvancedFiltersBase from '@/components/common/AdvancedFiltersBase.vue'
import ContractsMixin from '@/mixins/contracts/contracts-mixin.js'

export default {
  name: 'licenses-contracts-mysql-form-component',
  mixins: [ContractsMixin],
  components: {
    AdvancedFiltersBase,
  },
  validations: {
    mysqlForm: {
      type: { required },
      licenseTypeID: { required },
      numberOfLicenses: { required, numeric },
      contractID: { required },
      csi: { required, numeric },
    },
  },
  data() {
    return {
      mysqlForm: {
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
  async beforeMount() {
    this.filteredlicenseTypeID = this.getMysqlLicensesTypes

    bus.$on('onResetAction', () => (this.mysqlForm = { location: 'All' }))
    bus.$on('updateMysqlContract', (data) => {
      bus.$emit('onToggleEdit', true)
      this.editContract(data)
    })

    this.locationList = JSON.parse(
      localStorage.getItem('persisted-data')
    ).globalFilters.locations
    this.locationList.unshift('All')
  },
  methods: {
    ...mapActions(['mysqlContractsActions']),
    createUpdateContract() {
      const action = this.mysqlForm.id ? 'put' : 'post'
      const toastMsg = this.mysqlForm.id ? 'modified' : 'created'
      const contractID = this.mysqlForm.contractID

      this.mysqlForm.type = toUpper(this.mysqlForm.type)
      this.mysqlForm.licenseTypeID = _.split(
        this.mysqlForm.licenseTypeID,
        ' - '
      )[0]
      this.mysqlForm.numberOfLicenses = Number(this.mysqlForm.numberOfLicenses)
      this.mysqlForm.hosts =
        this.mysqlForm.type === 'HOST' ? this.mysqlForm.hosts : []
      this.mysqlForm.clusters =
        this.mysqlForm.type === 'CLUSTER' ? this.mysqlForm.clusters : []
      this.mysqlForm.type === 'CLUSTER' ? this.mysqlForm.clusters : []
      this.mysqlForm.location =
        this.mysqlForm.location !== 'All' ? this.mysqlForm.location : ''

      this.mysqlContractsActions({
        action: action,
        body: this.mysqlForm,
      }).then(() => {
        this.mysqlForm = {}
        this.sussessToastMsg(contractID, toastMsg)
      })
    },
    editContract(data) {
      this.getAssociatedList(
        {
          full: `${data.licenseTypeID} - ${data.itemDescription}`,
          licenseTypeID: data.licenseTypeID,
          description: data.itemDescription,
        },
        data.type
      )

      this.mysqlForm = {
        id: data.id,
        type: data.type,
        licenseTypeID: data.fullPartNumber,
        numberOfLicenses: data.numberOfLicenses,
        contractID: data.contractID,
        csi: data.csi,
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
    ...mapGetters(['getMysqlLicensesTypes']),
  },
}
</script>

<style lang="scss" scoped></style>
