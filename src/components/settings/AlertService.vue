<template>
  <article>
    <Loading :isLoading="alertServiceLoading" />

    <SettingsActions
      :reset="resetAlertServiceSettings"
      :action="saveAlertServiceSettings"
    />

    <div class="columns is-multiline">
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(AlertServiceLabels[0])"
            class="label is-small"
          />
          <CustomInput v-model="AlertService.RemoteEndpoint" />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(AlertServiceLabels[1])"
            class="label is-small"
          />
          <CustomInput v-model="AlertService.BindIP" />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(AlertServiceLabels[2])"
            class="label is-small"
          />
          <CustomInput v-model="AlertService.Port" inputType="number" />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(AlertServiceLabels[3])"
            class="label is-small"
          />
          <CustomRadio
            v-model="AlertService.LogHTTPRequest"
            :options="trueOrFalseOptions"
          />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(AlertServiceLabels[4])"
            class="label is-small"
          />
          <CustomRadio
            v-model="AlertService.LogMessages"
            :options="trueOrFalseOptions"
          />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(AlertServiceLabels[5])"
            class="label is-small"
          />
          <CustomRadio
            v-model="AlertService.LogAlertThrows"
            :options="trueOrFalseOptions"
          />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(AlertServiceLabels[6])"
            class="label is-small"
          />
          <CustomInput v-model="AlertService.PublisherUsername" />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(AlertServiceLabels[7])"
            class="label is-small"
          />
          <CustomInput v-model="AlertService.PublisherPassword" />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(AlertServiceLabels[8])"
            class="label is-small"
          />
          <CustomInput
            v-model="AlertService.QueueBufferSize"
            inputType="number"
          />
        </div>
      </div>
    </div>

    <hr class="my-3" />
    <p class="is-size-6 has-text-weight-semibold">Emailer</p>

    <div class="columns is-multiline">
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(AlertServiceLabels[9])"
            class="label is-small"
          />
          <CustomRadio
            v-model="AlertService.Emailer.Enabled"
            :options="trueOrFalseOptions"
          />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(AlertServiceLabels[10])"
            class="label is-small"
          />
          <CustomInput v-model="AlertService.Emailer.From" />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(AlertServiceLabels[11])"
            class="label is-small"
          />
          <b-taginput
            size="is-small"
            v-model="AlertService.Emailer.To"
            type="is-primary"
            :on-paste-separators="[]"
            :confirm-keys="['Tab', 'Enter']"
            allow-new
            ellipsis
            :before-adding="beforeAdding"
          >
          </b-taginput>
          <!--   <CustomInput v-model="AlertService.Emailer.To" /> -->
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(AlertServiceLabels[12])"
            class="label is-small"
          />
          <CustomInput v-model="AlertService.Emailer.SMTPServer" />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(AlertServiceLabels[13])"
            class="label is-small"
          />
          <CustomInput
            v-model="AlertService.Emailer.SMTPPort"
            inputType="number"
          />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(AlertServiceLabels[14])"
            class="label is-small"
          />
          <CustomInput v-model="AlertService.Emailer.SMTPUsername" />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(AlertServiceLabels[15])"
            class="label is-small"
          />
          <CustomInput v-model="AlertService.Emailer.SMTPPassword" />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(AlertServiceLabels[16])"
            class="label is-small"
          />
          <CustomRadio
            v-model="AlertService.Emailer.DisableSSLCertificateValidation"
            :options="trueOrFalseOptions"
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
  name: 'settings-alertservice-component',
  mixins: [settings, HighlightSearchMixin],
  components: {
    SettingsActions,
    Loading,
  },
  data() {
    return {
      alertServiceLoading: false,
    }
  },
  methods: {
    saveAlertServiceSettings() {
      this.alertServiceLoading = true

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
            this.alertServiceLoading = false
          }, 1000)
        })
        .then(() => {
          this.successSaveSettings('alertService')
        })
    },
    resetAlertServiceSettings() {
      this.bindOriginalAlertServiceData()
    },
    beforeAdding(tag) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(tag)
    },
  },
}
</script>

<style lang="scss" scoped></style>
