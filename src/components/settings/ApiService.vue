<template>
  <article>
    <Loading :isLoading="apiServiceLoading" />

    <SettingsActions
      :reset="resetApiServiceSettings"
      :action="saveApiServiceSettings"
    />

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
          <b-select
            expanded
            multiple
            native-size="2"
            size="is-small"
            type="is-primary"
            v-model="APIService.AuthenticationProvider.Types"
          >
            <option value="basic">Basic</option>
            <option value="ldap">LDAP</option>
          </b-select>
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
import settings from '@/mixins/settings/settings.js'
import SettingsActions from '@/components/settings/SettingsActions.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  mixins: [settings],
  components: {
    SettingsActions,
    Loading,
  },
  data() {
    return {
      apiServiceLoading: false,
    }
  },
  methods: {
    saveApiServiceSettings() {
      this.apiServiceLoading = true

      const data = {
        APIService: this.APIService,
        AlertService: this.AlertService,
        ChartService: this.ChartService,
        DataService: this.DataService,
        ResourceFilePath: this.ResourceFilePath,
        ThunderService: this.ThunderService,
      }

      this.saveSettings(data)
        .then(() => {
          setTimeout(() => {
            this.apiServiceLoading = false
          }, 1000)
        })
        .then(() => {
          this.successSaveSettings('apiService')
        })
    },
    resetApiServiceSettings() {
      this.bindOriginalApiServiceData()
    },
  },
}
</script>

<style lang="scss" scoped></style>
