<template>
  <BoxContent
    title="Add or Modify an MySql Agreement"
    style="min-height: calc(100vh - 263px);"
  >
    <form @submit.prevent="createUpdateAgreement">
      <b-field
        label="Type *"
        custom-class="is-small"
        :type="{
          'is-danger': $v.mysqlForm.agreementType.$error
        }"
        :message="{
          'This field is required':
            !$v.mysqlForm.agreementType.required &&
            $v.mysqlForm.agreementType.$error
        }"
      >
        <b-select
          @blur="$v.mysqlForm.agreementType.$touch()"
          @input="$v.mysqlForm.agreementType.$touch()"
          size="is-small"
          placeholder="Select"
          v-model="mysqlForm.agreementType"
          expanded
        >
          <option value="host">Host</option>
          <option value="cluster">Cluster</option>
        </b-select>
      </b-field>

      <b-field
        label="Number of Licenses *"
        custom-class="is-small"
        expanded
        :type="{
          'is-danger': $v.mysqlForm.agreementNumber.$error
        }"
        :message="{
          'This field is required':
            !$v.mysqlForm.agreementNumber.required &&
            $v.mysqlForm.agreementNumber.$error,
          'This field accepts only numbers':
            !$v.mysqlForm.agreementNumber.numeric &&
            $v.mysqlForm.agreementNumber.$error
        }"
      >
        <b-input
          @blur="$v.mysqlForm.agreementNumber.$touch()"
          @input="$v.mysqlForm.agreementNumber.$touch()"
          size="is-small"
          type="number"
          v-model="mysqlForm.agreementNumber"
        />
      </b-field>

      <b-field
        label="Hosts"
        custom-class="is-small"
        v-if="mysqlForm.agreementType === 'host'"
      >
        <b-taginput
          v-model="mysqlForm.agreementHosts"
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
              v-for="(host, index) in props.tags"
              :key="index"
              type="is-primary"
              :tabstop="false"
              closable
              attached
              close-type="is-light"
              @close="$refs.hostTag.removeTag(index, $event)"
            >
              {{ host }}
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
        v-if="mysqlForm.agreementType === 'cluster'"
      >
        <b-taginput
          v-model="mysqlForm.agreementClusters"
          :data="filteredClusterTags"
          ref="clusterTag"
          autocomplete
          icon="label"
          placeholder="Add a clustername"
          @typing="
            getAutocompleteData(
              $event,
              'clusterTags',
              clusternames.clusternames
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
              v-for="(cluster, index) in props.tags"
              :key="index"
              type="is-primary"
              :tabstop="false"
              closable
              attached
              close-type="is-light"
              @close="$refs.clusterTag.removeTag(index, $event)"
            >
              {{ cluster }}
            </b-tag>
          </template>

          <template slot="empty">
            There are no clusternames
          </template>
        </b-taginput>
      </b-field>

      <ActionButtons
        :isDisabled="$v.$invalid"
        :applyText="mysqlForm.licenseID ? 'Edit Agreement' : 'Add Agreement'"
        cancelText="Cancel"
      />
    </form>
  </BoxContent>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { required, numeric } from 'vuelidate/lib/validators'
import LicensesAgreementMixin from '@/mixins/licensesAgreement.js'
import BoxContent from '@/components/common/BoxContent.vue'
import ActionButtons from '@/components/common/Form/ActionButtons.vue'

export default {
  mixins: [LicensesAgreementMixin],
  components: {
    BoxContent,
    ActionButtons
  },
  validations: {
    mysqlForm: {
      agreementType: { required },
      agreementNumber: { required, numeric }
    }
  },
  data() {
    return {
      mysqlForm: {
        licenseID: ''
      }
    }
  },
  beforeMount() {
    bus.$on('onResetAction', () => (this.mysqlForm = []))
    bus.$on('editAgreement', data => {
      this.editAgreement(data)
    })
  },
  methods: {
    createUpdateAgreement() {
      let mysqlAgreementData = {
        type: this.mysqlForm.agreementType,
        numberOfLicenses: Number(this.mysqlForm.agreementNumber),
        hosts: this.mysqlForm.agreementHosts || [],
        clusters: this.mysqlForm.agreementClusters || []
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
        agreementType: data.type,
        agreementNumber: data.numberOfLicenses,
        agreementHosts: data.hosts,
        agreementClusters: data.clusters
      }
      this.mysqlForm.licenseID = data.id
    }
  }
}
</script>

<style lang="scss" scoped></style>
