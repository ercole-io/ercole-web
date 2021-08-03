<template>
  <AdvancedFiltersBase
    filterTitle="Add or Modify an MySql Agreement"
    :submitAction="addUpdateAgreement"
    :isDisabled="$v.$invalid"
    :applyText="mysqlForm.licenseID ? 'Update Agreement' : 'Add Agreement'"
    cancelText="Cancel"
  >
    <b-field
      :label="`${$t('common.fields.type')} *`"
      custom-class="is-small"
      :type="{
        'is-danger': $v.mysqlForm.agreeType.$error
      }"
    >
      <b-select
        @blur="$v.mysqlForm.agreeType.$touch()"
        @input="$v.mysqlForm.agreeType.$touch()"
        size="is-small"
        placeholder="Select"
        v-model="mysqlForm.agreeType"
        expanded
      >
        <option :value="cluster">{{ cluster }}</option>
        <option :value="host">{{ host }}</option>
      </b-select>
      <template #message>
        <div
          v-if="
            !$v.mysqlForm.agreeType.required && $v.mysqlForm.agreeType.$error
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
        'is-danger': $v.mysqlForm.agreeNumber.$error
      }"
    >
      <b-input
        @blur="$v.mysqlForm.agreeNumber.$touch()"
        @input="$v.mysqlForm.agreeNumber.$touch()"
        size="is-small"
        type="number"
        v-model="mysqlForm.agreeNumber"
      />
      <template #message>
        <div
          v-if="
            !$v.mysqlForm.agreeNumber.required &&
              $v.mysqlForm.agreeNumber.$error
          "
        >
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
        <div
          v-if="
            !$v.mysqlForm.agreeNumber.numeric && $v.mysqlForm.agreeNumber.$error
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
        'is-danger': $v.mysqlForm.agreeCsi.$error
      }"
    >
      <b-input
        @blur="$v.mysqlForm.agreeCsi.$touch()"
        @input="$v.mysqlForm.agreeCsi.$touch()"
        size="is-small"
        type="number"
        v-model="mysqlForm.agreeCsi"
      />
      <template #message>
        <div
          v-if="!$v.mysqlForm.agreeCsi.required && $v.mysqlForm.agreeCsi.$error"
        >
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
        <div
          v-if="!$v.mysqlForm.agreeCsi.numeric && $v.mysqlForm.agreeCsi.$error"
        >
          {{ $i18n.t('common.validations.onlyNumbers') }}
        </div>
      </template>
    </b-field>

    <b-field
      :label="`${$t('common.fields.numberLicenses')} *`"
      custom-class="is-small"
      expanded
      :type="{
        'is-danger': $v.mysqlForm.agreeLicenses.$error
      }"
    >
      <b-input
        @blur="$v.mysqlForm.agreeLicenses.$touch()"
        @input="$v.mysqlForm.agreeLicenses.$touch()"
        size="is-small"
        type="number"
        v-model="mysqlForm.agreeLicenses"
      />
      <template #message>
        <div
          v-if="
            !$v.mysqlForm.agreeLicenses.required &&
              $v.mysqlForm.agreeLicenses.$error
          "
        >
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
        <div
          v-if="
            !$v.mysqlForm.agreeLicenses.numeric &&
              $v.mysqlForm.agreeLicenses.$error
          "
        >
          {{ $i18n.t('common.validations.onlyNumbers') }}
        </div>
      </template>
    </b-field>

    <b-field
      label="Hosts"
      custom-class="is-small"
      v-if="mysqlForm.agreeType === host"
    >
      <b-taginput
        v-model="mysqlForm.agreeHosts"
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

        <template slot="empty">
          There are no hostnames
        </template>
      </b-taginput>
    </b-field>

    <b-field
      label="Clusters"
      custom-class="is-small"
      v-if="mysqlForm.agreeType === cluster"
    >
      <b-taginput
        v-model="mysqlForm.agreeClusters"
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

        <template slot="empty">
          There are no clusternames
        </template>
      </b-taginput>
    </b-field>
  </AdvancedFiltersBase>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { required, numeric } from 'vuelidate/lib/validators'
import toUpper from '@/filters/toUpper.js'
import toLower from '@/filters/toLower.js'
import LicensesAgreementMixin from '@/mixins/licensesAgreement.js'
import AdvancedFiltersBase from '@/components/common/AdvancedFiltersBase.vue'

export default {
  mixins: [LicensesAgreementMixin],
  components: {
    AdvancedFiltersBase
  },
  validations: {
    mysqlForm: {
      agreeType: { required },
      agreeLicenses: { required, numeric },
      agreeNumber: { required, numeric },
      agreeCsi: { required, numeric }
    }
  },
  data() {
    return {
      mysqlForm: {
        licenseID: ''
      },
      host: 'host',
      cluster: 'cluster'
    }
  },
  beforeMount() {
    bus.$on('onResetAction', () => (this.mysqlForm = {}))
    bus.$on('editAgreementMysql', data => {
      bus.$emit('onToggleEdit', true)
      this.editAgreement(data)
    })
  },
  methods: {
    addUpdateAgreement() {
      const mysqlAgreementData = {
        type: toUpper(this.mysqlForm.agreeType),
        agreementID: this.mysqlForm.agreeNumber,
        csi: this.mysqlForm.agreeCsi,
        numberOfLicenses: Number(this.mysqlForm.agreeLicenses),
        clusters:
          this.mysqlForm.agreeType === this.cluster
            ? this.mysqlForm.agreeClusters
            : [],
        hosts:
          this.mysqlForm.agreeType === this.host
            ? this.mysqlForm.agreeHosts
            : []
      }
      if (!this.mysqlForm.licenseID) {
        this.createLicenseAgreement({
          body: mysqlAgreementData,
          type: 'mysql'
        }).then(() => {
          this.mysqlForm = { licenseID: '' }
        })
      } else {
        mysqlAgreementData.id = this.mysqlForm.licenseID
        this.updateLicenseAgreement({
          body: mysqlAgreementData,
          type: 'mysql'
        }).then(() => {
          this.mysqlForm = { licenseID: '' }
        })
      }
    },
    editAgreement(data) {
      this.mysqlForm = {
        licenseID: data.id,
        agreeType: toLower(data.type),
        agreeLicenses: data.numberOfLicenses,
        agreeNumber: data.agreementID,
        agreeCsi: data.csi,
        agreeHosts: data.hosts,
        agreeClusters: data.clusters
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
