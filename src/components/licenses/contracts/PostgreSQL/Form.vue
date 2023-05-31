<template>
  <AdvancedFiltersBase
    filterTitle="Add or Modify an PostgreSQL Contract"
    :submitAction="createUpdateContract"
    :isDisabled="$v.$invalid"
    :applyText="postgreForm.id ? 'Update Contract' : 'Add Contract'"
    cancelText="Cancel"
  >
    <b-field
      label="Type *"
      custom-class="is-small"
      :type="{
        'is-danger': $v.postgreForm.type.$error,
      }"
    >
      <b-select
        @blur="$v.postgreForm.type.$touch()"
        @input="$v.postgreForm.type.$touch()"
        size="is-small"
        placeholder="Select"
        v-model="postgreForm.type"
        expanded
      >
        <option :value="cluster">{{ cluster }}</option>
        <option :value="host">{{ host }}</option>
      </b-select>
      <template #message>
        <div v-if="!$v.postgreForm.type.required && $v.postgreForm.type.$error">
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
      </template>
    </b-field>

    <b-field
      label="Licenses Types *"
      custom-class="is-small"
      :type="{
        'is-danger': $v.postgreForm.licenseTypeID.$error,
      }"
    >
      <b-autocomplete
        v-model="postgreForm.licenseTypeID"
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
        @blur="$v.postgreForm.licenseTypeID.$touch()"
        @input="$v.postgreForm.licenseTypeID.$touch()"
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
            !$v.postgreForm.licenseTypeID.required &&
            $v.postgreForm.licenseTypeID.$error
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
        'is-danger': $v.postgreForm.contractID.$error,
      }"
    >
      <b-input
        @blur="$v.postgreForm.contractID.$touch()"
        @input="$v.postgreForm.contractID.$touch()"
        size="is-small"
        v-model="postgreForm.contractID"
      />
      <template #message>
        <div
          v-if="
            !$v.postgreForm.contractID.required &&
            $v.postgreForm.contractID.$error
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
        'is-danger': $v.postgreForm.csi.$error,
      }"
    >
      <b-input
        @blur="$v.postgreForm.csi.$touch()"
        @input="$v.postgreForm.csi.$touch()"
        size="is-small"
        type="number"
        v-model="postgreForm.csi"
      />
      <template #message>
        <div v-if="!$v.postgreForm.csi.required && $v.postgreForm.csi.$error">
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
        <div v-if="!$v.postgreForm.csi.numeric && $v.postgreForm.csi.$error">
          {{ $i18n.t('common.validations.onlyNumbers') }}
        </div>
      </template>
    </b-field>

    <b-field label="Support Expiration" custom-class="is-small">
      <b-datepicker
        v-model="postgreForm.supportExpiration"
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
        'is-danger': $v.postgreForm.numberOfLicenses.$error,
      }"
    >
      <b-input
        @blur="$v.postgreForm.numberOfLicenses.$touch()"
        @input="$v.postgreForm.numberOfLicenses.$touch()"
        size="is-small"
        type="number"
        v-model="postgreForm.numberOfLicenses"
      />
      <template #message>
        <div
          v-if="
            !$v.postgreForm.numberOfLicenses.required &&
            $v.postgreForm.numberOfLicenses.$error
          "
        >
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
        <div
          v-if="
            !$v.postgreForm.numberOfLicenses.numeric &&
            $v.postgreForm.numberOfLicenses.$error
          "
        >
          {{ $i18n.t('common.validations.onlyNumbers') }}
        </div>
      </template>
    </b-field>

    <b-field
      label="Hosts"
      custom-class="is-small"
      v-if="postgreForm.type === host"
    >
      <b-taginput
        v-model="postgreForm.hosts"
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
      v-if="postgreForm.type === cluster"
    >
      <b-taginput
        v-model="postgreForm.clusters"
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
  name: 'licenses-contracts-postgre-form-component',
  mixins: [ContractsMixin],
  components: {
    AdvancedFiltersBase,
  },
  validations: {
    postgreForm: {
      type: { required },
      licenseTypeID: { required },
      numberOfLicenses: { required, numeric },
      contractID: { required },
      csi: { required, numeric },
    },
  },
  data() {
    return {
      postgreForm: {
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
