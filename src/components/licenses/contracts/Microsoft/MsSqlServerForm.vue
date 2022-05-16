<template>
  <AdvancedFiltersBase
    filterTitle="Add or Modify an MsSqlServer Contract"
    :submitAction="createUpdateContract"
    :isDisabled="$v.$invalid"
    :applyText="msSqlServer.id ? 'Update Agreement' : 'Add Agreement'"
    cancelText="Cancel"
  >
    <b-field
      label="Licenses Types *"
      custom-class="is-small"
      :type="{
        'is-danger': $v.msSqlServer.type.$error,
      }"
    >
      <b-autocomplete
        v-model="msSqlServer.type"
        size="is-small"
        type="text"
        icon="magnify"
        field="full"
        :data="filteredtype"
        @typing="
          getAutocompleteLicensesTypes(
            $event,
            'type',
            getMicrosoftLicensesTypes
          )
        "
        @focus="() => (filteredtype = getMicrosoftLicensesTypes)"
        @blur="$v.msSqlServer.type.$touch()"
        @input="$v.msSqlServer.type.$touch()"
        open-on-focus
        clearable
      >
        <template slot-scope="props">
          <div class="media media-custom">
            <div class="media-content">
              <b>
                {{ props.option.id }} - {{ props.option.edition }} -
                {{ props.option.version }}
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
        <div v-if="!$v.msSqlServer.type.required && $v.msSqlServer.type.$error">
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
      </template>
    </b-field>

    <b-field
      label="Contract Number *"
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

    <b-field label="Hosts" custom-class="is-small">
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

    <b-field label="Clusters" custom-class="is-small">
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
import { mapActions, mapGetters, mapState } from 'vuex'
import { required, numeric } from 'vuelidate/lib/validators'
import { simpleAutocompleteData } from '@/helpers/helpers.js'
import AdvancedFiltersBase from '@/components/common/AdvancedFiltersBase.vue'

export default {
  components: {
    AdvancedFiltersBase,
  },
  validations: {
    msSqlServer: {
      type: { required },
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
      filteredtype: [],
      filteredclusterTags: [],
      filteredhostTags: [],
    }
  },
  beforeMount() {
    this.filteredtype = this.getMicrosoftLicensesTypes
    this.filteredclusterTags = this.clusternames.clusternames
    this.filteredhostTags = this.hostnames.hostnames

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
      this.msSqlServer.licensesNumber = Number(this.msSqlServer.licensesNumber)
      this.msSqlServer.type = _.split(this.msSqlServer.type, ' - ')[0]

      this.microsoftContractsActions({
        action: action,
        body: this.msSqlServer,
      }).then(() => {
        this.msSqlServer = {}
      })
    },
    editContract(data) {
      this.msSqlServer = {
        id: data.id,
        type: data.fullPartNumber,
        contractID: data.contractID,
        licensesNumber: data.licensesNumber,
        hosts: data.hosts,
        clusters: data.clusters,
      }
    },
    getAutocompleteLicensesTypes(text, toFilter, data) {
      // console.log(text, toFilter, data)
      const newData = []
      _.map(data, (val) => {
        newData.push(val.full)
      })

      const values = simpleAutocompleteData(text, newData)

      // console.log(values)

      const newValues = []
      _.map(values, (val) => {
        const newVal = _.split(val, ' - ')
        newValues.push({
          id: newVal[0],
          desc: newVal[1],
          version: newVal[3],
          edition: newVal[2],
          full: `${newVal[0]} - ${newVal[1]} - ${newVal[2]} - ${newVal[3]}`,
        })
      })

      this[`filtered${toFilter}`] = newValues
    },
    getAutocompleteData(text, toFilter, data) {
      const values = simpleAutocompleteData(text, data)
      this[`filtered${toFilter}`] = _.uniqBy(values, (e) => e)
    },
  },
  computed: {
    ...mapState(['hostnames', 'clusternames']),
    ...mapGetters(['getMicrosoftContracts', 'getMicrosoftLicensesTypes']),
  },
}
</script>

<style lang="scss" scoped></style>
