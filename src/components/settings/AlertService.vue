<template>
  <article>
    <Loading :isLoading="alertServiceLoading" />

    <SettingsActions formName="alertService" />

    <div class="columns is-multiline">
      <div class="column is-one-quarter">
        <CustomField label="Remote Endpoint">
          <CustomInput v-model="AlertService.RemoteEndpoint" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Bind IP">
          <CustomInput v-model="AlertService.BindIP" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Port">
          <CustomInput v-model="AlertService.Port" inputType="number" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Log HTTP Request">
          <CustomRadio
            v-model="AlertService.LogHTTPRequest"
            :options="trueOrFalseOptions"
          />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Log Messages">
          <CustomRadio
            v-model="AlertService.LogMessages"
            :options="trueOrFalseOptions"
          />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Log Alert Throws">
          <CustomRadio
            v-model="AlertService.LogAlertThrows"
            :options="trueOrFalseOptions"
          />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Publisher Username">
          <CustomInput v-model="AlertService.PublisherUsername" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Publisher Password">
          <CustomInput v-model="AlertService.PublisherPassword" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Queue Buffer Size">
          <CustomInput
            v-model="AlertService.QueueBufferSize"
            inputType="number"
          />
        </CustomField>
      </div>
    </div>

    <hr class="my-3" />
    <p class="is-size-6 has-text-weight-semibold">Emailer</p>

    <div class="columns is-multiline">
      <div class="column is-one-quarter">
        <CustomField label="Enabled">
          <CustomRadio
            v-model="AlertService.Emailer.Enabled"
            :options="trueOrFalseOptions"
          />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="From">
          <CustomInput v-model="AlertService.Emailer.From" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="To">
          <CustomInput v-model="AlertService.Emailer.To" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="SMTP Server">
          <CustomInput v-model="AlertService.Emailer.SMTPServer" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="SMTP Port">
          <CustomInput
            v-model="AlertService.Emailer.SMTPPort"
            inputType="number"
          />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="SMTP Username">
          <CustomInput v-model="AlertService.Emailer.SMTPUsername" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="SMTP Password">
          <CustomInput v-model="AlertService.Emailer.SMTPPassword" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Disable SSL Certificate Validation">
          <CustomRadio
            v-model="AlertService.Emailer.DisableSSLCertificateValidation"
            :options="trueOrFalseOptions"
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
