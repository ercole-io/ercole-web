<template>
  <article>
    <Loading :isLoading="apiServiceLoading" />

    <div class="is-flex is-flex-direction-row is-justify-content-flex-end mb-3">
      <b-button
        type="is-danger"
        size="is-small"
        @click="resetApiService"
        class="mr-2"
      >
        Restore
      </b-button>

      <b-button
        type="is-custom-primary"
        size="is-small"
        @click="saveApiServiceSettings"
      >
        Save
      </b-button>
    </div>

    <div class="columns is-multiline">
      <div class="column is-one-quarter">
        <CustomField label="Remote Endpoint">
          <CustomInput v-model="APIService.RemoteEndpoint" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Port">
          <CustomInput v-model="APIService.Port" inputType="number" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Bind IP">
          <CustomInput v-model="APIService.BindIP" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Log HTTP Request">
          <CustomRadio
            v-model="APIService.LogHTTPRequest"
            :options="trueOrFalseOptions"
          />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="ReadOnly">
          <CustomRadio
            v-model="APIService.ReadOnly"
            :options="trueOrFalseOptions"
          />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField
          label="Debug Oracle Database Contracts Assignment Algorithm"
        >
          <CustomRadio
            v-model="APIService.DebugOracleDatabaseContractsAssignmentAlgorithm"
            :options="trueOrFalseOptions"
          />
        </CustomField>
      </div>
    </div>

    <hr class="my-3" />
    <p class="is-size-6 has-text-weight-semibold">Authentication Provider</p>

    <div class="columns is-multiline">
      <div class="column is-one-quarter">
        <CustomField label="Types">
          <b-taginput
            v-model="APIService.AuthenticationProvider.Types"
            ellipsis
            icon="label"
            placeholder="Add a type"
            size="is-small"
            type="is-primary"
          />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Username">
          <CustomInput v-model="APIService.AuthenticationProvider.Username" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Password">
          <CustomInput v-model="APIService.AuthenticationProvider.Password" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Private Key">
          <CustomInput v-model="APIService.AuthenticationProvider.PrivateKey" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Public Key">
          <CustomInput v-model="APIService.AuthenticationProvider.PublicKey" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Token Validity Timeout">
          <CustomInput
            v-model="APIService.AuthenticationProvider.TokenValidityTimeout"
            inputType="number"
          />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Host">
          <CustomInput v-model="APIService.AuthenticationProvider.Host" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Port">
          <CustomInput
            v-model="APIService.AuthenticationProvider.Port"
            inputType="number"
          />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="LDAP Base">
          <CustomInput v-model="APIService.AuthenticationProvider.LDAPBase" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="LDAP Bind DN">
          <CustomInput v-model="APIService.AuthenticationProvider.LDAPBindDN" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="LDAP Bind Password">
          <CustomInput
            v-model="APIService.AuthenticationProvider.LDAPBindPassword"
          />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="LDAP User Filter">
          <CustomInput
            v-model="APIService.AuthenticationProvider.LDAPUserFilter"
          />
        </CustomField>
      </div>
    </div>
  </article>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'
import settings from '@/mixins/settings/settings.js'

export default {
  mixins: [settings],
  beforeMount() {
    this.bindOriginalApiServiceData()

    bus.$on('resetAllSettings', () => {
      this.bindOriginalApiServiceData()
    })
  },
  methods: {
    bindOriginalApiServiceData() {
      this.APIService = {
        RemoteEndpoint: this.getAPIService.RemoteEndpoint,
        Port: this.getAPIService.Port,
        BindIP: this.getAPIService.BindIP,
        LogHTTPRequest: this.getAPIService.LogHTTPRequest,
        ReadOnly: this.getAPIService.ReadOnly,
        DebugOracleDatabaseContractsAssignmentAlgorithm:
          this.getAPIService.DebugOracleDatabaseContractsAssignmentAlgorithm,
        AuthenticationProvider: {
          Types: this.getAPIService.AuthenticationProvider.Types,
          Username: this.getAPIService.AuthenticationProvider.Username,
          Password: this.getAPIService.AuthenticationProvider.Password,
          PrivateKey: this.getAPIService.AuthenticationProvider.PrivateKey,
          PublicKey: this.getAPIService.AuthenticationProvider.PublicKey,
          TokenValidityTimeout:
            this.getAPIService.AuthenticationProvider.TokenValidityTimeout,
          Host: this.getAPIService.AuthenticationProvider.Host,
          Port: this.getAPIService.AuthenticationProvider.Port,
          LDAPBase: this.getAPIService.AuthenticationProvider.LDAPBase,
          LDAPBindDN: this.getAPIService.AuthenticationProvider.LDAPBindDN,
          LDAPBindPassword:
            this.getAPIService.AuthenticationProvider.LDAPBindPassword,
          LDAPUserFilter:
            this.getAPIService.AuthenticationProvider.LDAPUserFilter,
        },
        // never change
        OperatingSystemAggregationRules:
          this.getAPIService.OperatingSystemAggregationRules,
        DefaultDatabaseTags: this.getAPIService.DefaultDatabaseTags,
        // never change
      }
    },
    saveApiServiceSettings() {
      this.apiServiceLoading = true
      this.submitSettings()
    },
    resetApiService() {
      console.log('reset api service')
      this.bindOriginalApiServiceData()
    },
  },
  computed: {
    ...mapGetters(['getAPIService']),
  },
}
</script>

<style lang="scss" scoped>
.customLabel {
  width: 250px !important;
}
</style>
