<template>
  <article>
    <Loading :isLoading="alertServiceLoading" />

    <div class="is-flex is-flex-direction-row is-justify-content-flex-end mb-3">
      <b-button
        type="is-danger"
        size="is-small"
        @click="resetAlertService"
        class="mr-2"
      >
        Restore
      </b-button>

      <b-button
        type="is-custom-primary"
        size="is-small"
        @click="saveAlertServiceSettings"
      >
        Save
      </b-button>
    </div>

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
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'
import settings from '@/mixins/settings/settings.js'

export default {
  mixins: [settings],
  beforeMount() {
    this.bindOriginalAlertServiceData()

    bus.$on('resetAllSettings', () => {
      this.bindOriginalAlertServiceData()
    })
  },
  methods: {
    bindOriginalAlertServiceData() {
      this.AlertService = {
        RemoteEndpoint: this.getAlertService.RemoteEndpoint,
        BindIP: this.getAlertService.BindIP,
        Port: this.getAlertService.Port,
        LogHTTPRequest: this.getAlertService.LogHTTPRequest,
        LogMessages: this.getAlertService.LogMessages,
        LogAlertThrows: this.getAlertService.LogAlertThrows,
        PublisherUsername: this.getAlertService.PublisherUsername,
        PublisherPassword: this.getAlertService.PublisherPassword,
        QueueBufferSize: this.getAlertService.QueueBufferSize,
        Emailer: {
          Enabled: this.getAlertService.Emailer.Enabled,
          From: this.getAlertService.Emailer.From,
          To: this.getAlertService.Emailer.To,
          SMTPServer: this.getAlertService.Emailer.SMTPServer,
          SMTPPort: this.getAlertService.Emailer.SMTPPort,
          SMTPUsername: this.getAlertService.Emailer.SMTPUsername,
          SMTPPassword: this.getAlertService.Emailer.SMTPPassword,
          DisableSSLCertificateValidation:
            this.getAlertService.Emailer.DisableSSLCertificateValidation,
        },
      }
    },
    saveAlertServiceSettings() {
      this.alertServiceLoading = true
      this.submitSettings()
    },
    resetAlertService() {
      console.log('reset alert service')
      this.bindOriginalAlertServiceData()
    },
  },
  computed: {
    ...mapGetters(['getAlertService']),
  },
}
</script>

<style lang="scss" scoped>
.customLabel {
  width: 250px !important;
}
</style>
