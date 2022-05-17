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
        type="number"
        v-model="mysqlForm.contractID"
      />
      <template #message>
        <div
          v-if="
            !$v.mysqlForm.contractID.required && $v.mysqlForm.contractID.$error
          "
        >
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
        <div
          v-if="
            !$v.mysqlForm.contractID.numeric && $v.mysqlForm.contractID.$error
          "
        >
          {{ $i18n.t('common.validations.onlyNumbers') }}
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
        @typing="getAutocompleteData($event, 'hostTags', hostnames.hostnames)"
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
import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import { required, numeric } from 'vuelidate/lib/validators'
import { mapGetters, mapState, mapActions } from 'vuex'
import { simpleAutocompleteData } from '@/helpers/helpers.js'
import toUpper from '@/filters/toUpper.js'
import AdvancedFiltersBase from '@/components/common/AdvancedFiltersBase.vue'

export default {
  components: {
    AdvancedFiltersBase,
  },
  validations: {
    mysqlForm: {
      type: { required },
      numberOfLicenses: { required, numeric },
      contractID: { required, numeric },
      csi: { required, numeric },
    },
  },
  data() {
    return {
      mysqlForm: {
        hosts: [],
        clusters: [],
      },
      filteredclusterTags: [],
      filteredhostTags: [],
      host: 'host',
      cluster: 'cluster',
    }
  },
  beforeMount() {
    this.filteredclusterTags = this.clusternames.clusternames
    this.filteredhostTags = this.hostnames.hostnames

    bus.$on('onResetAction', () => (this.mysqlForm = {}))
    bus.$on('editMysqlContract', (data) => {
      bus.$emit('onToggleEdit', true)
      this.editContract(data)
    })
  },
  methods: {
    ...mapActions(['mysqlContractsActions']),
    createUpdateContract() {
      const action = this.mysqlForm.id ? 'put' : 'post'
      this.mysqlForm.type = toUpper(this.mysqlForm.type)
      this.mysqlForm.numberOfLicenses = Number(this.mysqlForm.numberOfLicenses)

      this.mysqlContractsActions({
        action: action,
        body: this.mysqlForm,
      }).then(() => {
        this.mysqlForm = {}
      })
    },
    editContract(data) {
      this.mysqlForm = {
        id: data.id,
        type: data.type,
        numberOfLicenses: data.numberOfLicenses,
        contractID: data.contractID,
        csi: data.csi,
        hosts: data.type === 'host' ? data.hosts : [],
        clusters: data.type === 'cluster' ? data.clusters : [],
      }
    },
    getAutocompleteData(text, toFilter, data) {
      const values = simpleAutocompleteData(text, data)
      this[`filtered${toFilter}`] = _.uniqBy(values, (e) => e)
    },
  },
  computed: {
    ...mapState(['hostnames', 'clusternames']),
    ...mapGetters(['getMysqlContracts']),
  },
}
</script>

<style lang="scss" scoped></style>
