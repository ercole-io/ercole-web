<template>
  <AdvancedFiltersBase
    filterTitle="Add or Modify an MsSqlServer Contract"
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
        open-on-focus
        clearable
      >
        <template slot-scope="props">
          <div class="media media-custom">
            <div class="media-content">
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
        @typing="getAutocompleteData($event, 'hostTags', hostnames.hostnames)"
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
          getAutocompleteData($event, 'clusterTags', clusternames.clusternames)
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
      },
      filteredlicenseTypeID: [],
      host: 'host',
      cluster: 'cluster',
    }
  },
  beforeMount() {
    this.filteredlicenseTypeID = this.getMicrosoftLicensesTypes

    bus.$on('onResetAction', () => (this.msSqlServer = {}))
    bus.$on('updateMicrosoftContract', (data) => {
      bus.$emit('onToggleEdit', true)
      this.editContract(data)
    })
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

      this.microsoftContractsActions({
        action: action,
        body: this.msSqlServer,
      }).then(() => {
        this.msSqlServer = {}
        this.sussessToastMsg(contractID, toastMsg)
      })
    },
    editContract(data) {
      this.msSqlServer = {
        id: data.id,
        type: data.type,
        licenseTypeID: data.fullPartNumber,
        contractID: data.contractID,
        licensesNumber: data.licensesNumber,
        hosts: data.hosts,
        clusters: data.clusters,
      }
    },
  },
  computed: {
    ...mapGetters(['getMicrosoftLicensesTypes']),
  },
}
</script>

<style lang="scss" scoped></style>
