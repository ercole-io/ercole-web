<template>
  <article>
    <Loading :isLoading="apiServiceLoading" />

    <SettingsActions
      :reset="resetApiServiceSettings"
      :action="saveApiServiceSettings"
    />

    <div class="columns is-multiline">
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(APIServiceLabels[0])"
            class="label is-small"
          />
          <CustomInput v-model="APIService.RemoteEndpoint" />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(APIServiceLabels[1])"
            class="label is-small"
          />
          <CustomInput v-model="APIService.Port" inputType="number" />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(APIServiceLabels[2])"
            class="label is-small"
          />
          <CustomInput v-model="APIService.BindIP" />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(APIServiceLabels[3])"
            class="label is-small"
          />
          <CustomRadio
            v-model="APIService.LogHTTPRequest"
            :options="trueOrFalseOptions"
          />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(APIServiceLabels[4])"
            class="label is-small"
          />
          <CustomRadio
            v-model="APIService.ReadOnly"
            :options="trueOrFalseOptions"
          />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(APIServiceLabels[5])"
            class="label is-small"
          />
          <CustomRadio
            v-model="APIService.DebugOracleDatabaseContractsAssignmentAlgorithm"
            :options="trueOrFalseOptions"
          />
        </div>
      </div>
    </div>

    <hr class="my-3" />
    <p class="is-size-6 has-text-weight-semibold">Authentication Provider</p>

    <div class="columns is-multiline">
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(APIServiceLabels[6])"
            class="label is-small"
          />
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
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(APIServiceLabels[7])"
            class="label is-small"
          />
          <CustomInput v-model="APIService.AuthenticationProvider.Username" />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(APIServiceLabels[8])"
            class="label is-small"
          />
          <CustomInput v-model="APIService.AuthenticationProvider.Password" />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(APIServiceLabels[9])"
            class="label is-small"
          />
          <CustomInput v-model="APIService.AuthenticationProvider.PrivateKey" />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(APIServiceLabels[10])"
            class="label is-small"
          />
          <CustomInput v-model="APIService.AuthenticationProvider.PublicKey" />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(APIServiceLabels[11])"
            class="label is-small"
          />
          <CustomInput
            v-model="APIService.AuthenticationProvider.TokenValidityTimeout"
            inputType="number"
          />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(APIServiceLabels[12])"
            class="label is-small"
          />
          <CustomInput v-model="APIService.AuthenticationProvider.Host" />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(APIServiceLabels[13])"
            class="label is-small"
          />
          <CustomInput
            v-model="APIService.AuthenticationProvider.Port"
            inputType="number"
          />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(APIServiceLabels[14])"
            class="label is-small"
          />
          <CustomInput v-model="APIService.AuthenticationProvider.LDAPBase" />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(APIServiceLabels[15])"
            class="label is-small"
          />
          <CustomInput v-model="APIService.AuthenticationProvider.LDAPBindDN" />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(APIServiceLabels[16])"
            class="label is-small"
          />
          <CustomInput
            v-model="APIService.AuthenticationProvider.LDAPBindPassword"
          />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(APIServiceLabels[17])"
            class="label is-small"
          />
          <CustomInput
            v-model="APIService.AuthenticationProvider.LDAPUserFilter"
          />
        </div>
      </div>
    </div>

    <hr class="my-3" />
    <p class="is-size-6 has-text-weight-semibold">
      Oracle Database Policies Audit
    </p>

    <div class="columns is-multiline">
      <div class="column is-4">
        <div class="field" style="width: 50%">
          <label
            v-html="highlight(APIServiceLabels[18])"
            class="label is-small"
          />
          <b-taginput
            size="is-small"
            v-model="APIService.OracleDatabasePoliciesAudit"
            type="is-primary"
            :on-paste-separators="[]"
            :confirm-keys="['Tab', 'Enter']"
            allow-new
            ellipsis
          >
          </b-taginput>
        </div>
      </div>
    </div>

    <hr class="my-3" />
    <p class="is-size-6 has-text-weight-semibold">
      Oracle Database Memory Usage
    </p>

    <div class="columns is-multiline">
      <div class="column is-2">
        <div class="field">
          <label
            v-html="highlight(APIServiceLabels[20])"
            class="label is-small"
          />
          <CustomInput
            v-model="APIService.PGASGASumTargetPercentage"
            inputType="number"
          />
        </div>
      </div>
    </div>

    <hr class="my-3" />
    <p class="is-size-6 has-text-weight-semibold">Licenses Calculation</p>

    <div class="columns is-multiline">
      <div class="column is-2">
        <div class="field">
          <label
            v-html="highlight(APIServiceLabels[19])"
            class="label is-small"
          />
          <CustomRadio
            v-model="APIService.RoundLicenses"
            :options="roundLicensesOptions"
          />
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import settings from '@/mixins/settings/settings.js'
import SettingsActions from '@/components/settings/SettingsActions.vue'
import Loading from '@/components/common/Loading.vue'

import HighlightSearchMixin from '@/mixins/highlightSearch.js'

export default {
  name: 'settings-apiservice-component',
  mixins: [settings, HighlightSearchMixin],
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
        .then(() => {
          this.settingsWarning()
        })
    },
    resetApiServiceSettings() {
      this.bindOriginalApiServiceData()
    },
  },
}
</script>

<style lang="scss" scoped></style>
