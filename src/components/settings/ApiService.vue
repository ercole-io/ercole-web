<template>
  <article>
    <Loading :isLoading="apiServiceLoading" />

    <SettingsActions formName="apiService" />

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
import settings from '@/mixins/settings/settings.js'
import SettingsActions from '@/components/settings/SettingsActions.vue'

export default {
  mixins: [settings],
  components: {
    SettingsActions,
  },
}
</script>

<style lang="scss" scoped></style>
