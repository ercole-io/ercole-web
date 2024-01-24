<template>
  <AdvancedFiltersBase
    filterTitle="Add or Modify an MongoDB Contract"
    :submitAction="createUpdateContract"
    :isDisabled="$v.$invalid"
    :applyText="mongodbForm.id ? 'Update Contract' : 'Add Contract'"
    cancelText="Cancel"
  >
    <b-field
      label="Type *"
      custom-class="is-small"
      :type="{
        'is-danger': $v.mongodbForm.type.$error,
      }"
    >
      <b-select
        @blur="$v.mongodbForm.type.$touch()"
        @input="$v.mongodbForm.type.$touch()"
        size="is-small"
        placeholder="Select"
        v-model="mongodbForm.type"
        expanded
      >
        <option :value="cluster">{{ cluster }}</option>
        <option :value="host">{{ host }}</option>
      </b-select>
      <template #message>
        <div v-if="!$v.mongodbForm.type.required && $v.mongodbForm.type.$error">
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
      </template>
    </b-field>

    <b-field
      label="Licenses Types *"
      custom-class="is-small"
      :type="{
        'is-danger': $v.mongodbForm.licenseTypeID.$error,
      }"
    >
      <b-autocomplete
        v-model="mongodbForm.licenseTypeID"
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
        @blur="$v.mongodbForm.licenseTypeID.$touch()"
        @input="$v.mongodbForm.licenseTypeID.$touch()"
        @select="getAssociatedList($event, 'host')"
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
            !$v.mongodbForm.licenseTypeID.required &&
            $v.mongodbForm.licenseTypeID.$error
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
        'is-danger': $v.mongodbForm.contractID.$error,
      }"
    >
      <b-input
        @blur="$v.mongodbForm.contractID.$touch()"
        @input="$v.mongodbForm.contractID.$touch()"
        size="is-small"
        v-model="mongodbForm.contractID"
      />
      <template #message>
        <div
          v-if="
            !$v.mongodbForm.contractID.required &&
            $v.mongodbForm.contractID.$error
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
        'is-danger': $v.mongodbForm.csi.$error,
      }"
    >
      <b-input
        @blur="$v.mongodbForm.csi.$touch()"
        @input="$v.mongodbForm.csi.$touch()"
        size="is-small"
        type="number"
        v-model="mongodbForm.csi"
      />
      <template #message>
        <div v-if="!$v.mongodbForm.csi.required && $v.mongodbForm.csi.$error">
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
        <div v-if="!$v.mongodbForm.csi.numeric && $v.mongodbForm.csi.$error">
          {{ $i18n.t('common.validations.onlyNumbers') }}
        </div>
      </template>
    </b-field>

    <b-field label="Support Expiration" custom-class="is-small">
      <b-datepicker
        v-model="mongodbForm.supportExpiration"
        placeholder="Set a Date"
        size="is-small"
        append-to-body
        position="is-top-right"
        icon="calendar-today"
      />
    </b-field>

    <b-field
      :label="`${$t('common.fields.numberLicenses')} *`"
      custom-class="is-small"
      expanded
      :type="{
        'is-danger': $v.mongodbForm.numberOfLicenses.$error,
      }"
    >
      <b-input
        @blur="$v.mongodbForm.numberOfLicenses.$touch()"
        @input="$v.mongodbForm.numberOfLicenses.$touch()"
        size="is-small"
        type="number"
        v-model="mongodbForm.numberOfLicenses"
      />
      <template #message>
        <div
          v-if="
            !$v.mongodbForm.numberOfLicenses.required &&
            $v.mongodbForm.numberOfLicenses.$error
          "
        >
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
        <div
          v-if="
            !$v.mongodbForm.numberOfLicenses.numeric &&
            $v.mongodbForm.numberOfLicenses.$error
          "
        >
          {{ $i18n.t('common.validations.onlyNumbers') }}
        </div>
      </template>
    </b-field>

    <b-field
      label="Hosts"
      custom-class="is-small"
      v-if="mongodbForm.type === host"
    >
      <b-taginput
        v-model="mongodbForm.hosts"
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
      v-if="mongodbForm.type === cluster"
    >
      <b-taginput
        v-model="mongodbForm.clusters"
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

    <slot />
  </AdvancedFiltersBase>
</template>

<script>
import { required, numeric } from 'vuelidate/lib/validators'
import AdvancedFiltersBase from '@/components/common/AdvancedFiltersBase.vue'
import ContractsMixin from '@/mixins/contracts/contracts-mixin.js'

export default {
  name: 'licenses-contracts-mongodb-form-component',
  mixins: [ContractsMixin],
  components: {
    AdvancedFiltersBase,
  },
  validations: {
    mongodbForm: {
      type: { required },
      licenseTypeID: { required },
      numberOfLicenses: { required, numeric },
      contractID: { required },
      csi: { required, numeric },
    },
  },
  data() {
    return {
      mongodbForm: {
        hosts: [],
        clusters: [],
      },
      host: 'host',
      cluster: 'cluster',
      filteredlicenseTypeID: [],
    }
  },
  methods: {
    createUpdateContract() {},
  },
}
</script>

<style lang="scss" scoped></style>
