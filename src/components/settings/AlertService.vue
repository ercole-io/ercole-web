<template>
  <article>
    <Loading :isLoading="alertServiceLoading" />

    <BoxContent
      title="Alert Service"
      class="is-size-4 has-text-weight-semibold"
      customStyle="padding: 20px 40px"
      border
    >
      <SettingsActions
        :reset="resetAlertServiceSettings"
        :action="saveAlertServiceSettings"
        slot="customTitle"
      />

      <BoxContent customStyle="padding: 20px 40px" border hasShadow>
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
      </BoxContent>

      <BoxContent
        title="Emailer"
        class="is-size-5 has-text-weight-semibold"
        customStyle="padding: 20px 40px"
        border
        hasShadow
      >
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
      </BoxContent>

      <BoxContent
        title="Emailer Alert Type"
        class="is-size-5 has-text-weight-semibold"
        customStyle="padding: 20px 40px"
        border
        hasShadow
      >
        <div class="columns is-multiline">
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(AlertServiceLabels[17])"
                class="label is-small"
              />
              <CustomRadio
                v-model="AlertService.Emailer.AlertType.NewHost.Enable"
                :options="trueOrFalseOptions"
                customClass="is-justify-content-flex-start"
                customRadioClass="mr-5"
              />
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
                v-model="AlertService.Emailer.AlertType.NewHost.To"
                type="is-primary"
                :on-paste-separators="[]"
                :confirm-keys="['Tab', 'Enter']"
                allow-new
                ellipsis
                :before-adding="beforeAdding"
              >
              </b-taginput>
            </div>
          </div>
        </div>

        <div class="columns is-multiline">
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(AlertServiceLabels[18])"
                class="label is-small"
              />
              <CustomRadio
                v-model="AlertService.Emailer.AlertType.NewDatabase.Enable"
                :options="trueOrFalseOptions"
                customClass="is-justify-content-flex-start"
                customRadioClass="mr-5"
              />
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
                v-model="AlertService.Emailer.AlertType.NewDatabase.To"
                type="is-primary"
                :on-paste-separators="[]"
                :confirm-keys="['Tab', 'Enter']"
                allow-new
                ellipsis
                :before-adding="beforeAdding"
              >
              </b-taginput>
            </div>
          </div>
        </div>

        <div class="columns is-multiline">
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(AlertServiceLabels[19])"
                class="label is-small"
              />
              <CustomRadio
                v-model="AlertService.Emailer.AlertType.NewLicense.Enable"
                :options="trueOrFalseOptions"
                customClass="is-justify-content-flex-start"
                customRadioClass="mr-5"
              />
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
                v-model="AlertService.Emailer.AlertType.NewLicense.To"
                type="is-primary"
                :on-paste-separators="[]"
                :confirm-keys="['Tab', 'Enter']"
                allow-new
                ellipsis
                :before-adding="beforeAdding"
              >
              </b-taginput>
            </div>
          </div>
        </div>

        <div class="columns is-multiline">
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(AlertServiceLabels[20])"
                class="label is-small"
              />
              <CustomRadio
                v-model="AlertService.Emailer.AlertType.NewOption.Enable"
                :options="trueOrFalseOptions"
                customClass="is-justify-content-flex-start"
                customRadioClass="mr-5"
              />
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
                v-model="AlertService.Emailer.AlertType.NewOption.To"
                type="is-primary"
                :on-paste-separators="[]"
                :confirm-keys="['Tab', 'Enter']"
                allow-new
                ellipsis
                :before-adding="beforeAdding"
              >
              </b-taginput>
            </div>
          </div>
        </div>

        <div class="columns is-multiline">
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(AlertServiceLabels[21])"
                class="label is-small"
              />
              <CustomRadio
                v-model="
                  AlertService.Emailer.AlertType.NewUnlistedRunningDatabase
                    .Enable
                "
                :options="trueOrFalseOptions"
                customClass="is-justify-content-flex-start"
                customRadioClass="mr-5"
              />
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
                v-model="
                  AlertService.Emailer.AlertType.NewUnlistedRunningDatabase.To
                "
                type="is-primary"
                :on-paste-separators="[]"
                :confirm-keys="['Tab', 'Enter']"
                allow-new
                ellipsis
                :before-adding="beforeAdding"
              >
              </b-taginput>
            </div>
          </div>
        </div>

        <div class="columns is-multiline">
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(AlertServiceLabels[22])"
                class="label is-small"
              />
              <CustomRadio
                v-model="AlertService.Emailer.AlertType.NewHostCpu.Enable"
                :options="trueOrFalseOptions"
                customClass="is-justify-content-flex-start"
                customRadioClass="mr-5"
              />
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
                v-model="AlertService.Emailer.AlertType.NewHostCpu.To"
                type="is-primary"
                :on-paste-separators="[]"
                :confirm-keys="['Tab', 'Enter']"
                allow-new
                ellipsis
                :before-adding="beforeAdding"
              >
              </b-taginput>
            </div>
          </div>
        </div>

        <div class="columns is-multiline">
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(AlertServiceLabels[23])"
                class="label is-small"
              />
              <CustomRadio
                v-model="
                  AlertService.Emailer.AlertType.MissingPrimaryDatabase.Enable
                "
                :options="trueOrFalseOptions"
                customClass="is-justify-content-flex-start"
                customRadioClass="mr-5"
              />
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
                v-model="
                  AlertService.Emailer.AlertType.MissingPrimaryDatabase.To
                "
                type="is-primary"
                :on-paste-separators="[]"
                :confirm-keys="['Tab', 'Enter']"
                allow-new
                ellipsis
                :before-adding="beforeAdding"
              >
              </b-taginput>
            </div>
          </div>
        </div>

        <div class="columns is-multiline">
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(AlertServiceLabels[24])"
                class="label is-small"
              />
              <CustomRadio
                v-model="AlertService.Emailer.AlertType.MissingDatabase.Enable"
                :options="trueOrFalseOptions"
                customClass="is-justify-content-flex-start"
                customRadioClass="mr-5"
              />
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
                v-model="AlertService.Emailer.AlertType.MissingDatabase.To"
                type="is-primary"
                :on-paste-separators="[]"
                :confirm-keys="['Tab', 'Enter']"
                allow-new
                ellipsis
                :before-adding="beforeAdding"
              >
              </b-taginput>
            </div>
          </div>
        </div>

        <div class="columns is-multiline">
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(AlertServiceLabels[25])"
                class="label is-small"
              />
              <CustomRadio
                v-model="AlertService.Emailer.AlertType.AgentError.Enable"
                :options="trueOrFalseOptions"
                customClass="is-justify-content-flex-start"
                customRadioClass="mr-5"
              />
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
                v-model="AlertService.Emailer.AlertType.AgentError.To"
                type="is-primary"
                :on-paste-separators="[]"
                :confirm-keys="['Tab', 'Enter']"
                allow-new
                ellipsis
                :before-adding="beforeAdding"
              >
              </b-taginput>
            </div>
          </div>
        </div>

        <div class="columns is-multiline">
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(AlertServiceLabels[26])"
                class="label is-small"
              />
              <CustomRadio
                v-model="AlertService.Emailer.AlertType.NoData.Enable"
                :options="trueOrFalseOptions"
                customClass="is-justify-content-flex-start"
                customRadioClass="mr-5"
              />
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
                v-model="AlertService.Emailer.AlertType.NoData.To"
                type="is-primary"
                :on-paste-separators="[]"
                :confirm-keys="['Tab', 'Enter']"
                allow-new
                ellipsis
                :before-adding="beforeAdding"
              >
              </b-taginput>
            </div>
          </div>
        </div>
      </BoxContent>

      <BoxContent
        title="Alert Jobs"
        class="is-size-5 has-text-weight-semibold"
        customStyle="padding: 20px 40px"
        border
        hasShadow
      >
        <div class="columns is-multiline">
          <div class="column is-one-quarter">
            <div class="field">
              <div
                class="is-flex is-flex-direction-row is-justify-content-space-between"
              >
                <label
                  v-html="highlight(AlertServiceLabels[27])"
                  class="label is-small"
                />
                <b-icon
                  pack="fas"
                  icon="circle-info"
                  size="is-small"
                  type="is-info"
                  v-tooltip.top="options(crontabOptions)"
                />
              </div>
              <CustomInput v-model="AlertService.AckAlertJob.Crontab" />
            </div>
          </div>
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(AlertServiceLabels[28])"
                class="label is-small"
              />
              <CustomInput
                v-model="AlertService.AckAlertJob.DueDays"
                inputType="number"
              />
            </div>
          </div>
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(AlertServiceLabels[29])"
                class="label is-small"
              />
              <CustomRadio
                v-model="AlertService.AckAlertJob.RunAtStartup"
                :options="trueOrFalseOptions"
              />
            </div>
          </div>
        </div>

        <div class="columns is-multiline">
          <div class="column is-one-quarter">
            <div class="field">
              <div
                class="is-flex is-flex-direction-row is-justify-content-space-between"
              >
                <label
                  v-html="highlight(AlertServiceLabels[30])"
                  class="label is-small"
                />
                <b-icon
                  pack="fas"
                  icon="circle-info"
                  size="is-small"
                  type="is-info"
                  v-tooltip.top="options(crontabOptions)"
                />
              </div>
              <CustomInput v-model="AlertService.RemoveAlertJob.Crontab" />
            </div>
          </div>
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(AlertServiceLabels[31])"
                class="label is-small"
              />
              <CustomInput
                v-model="AlertService.RemoveAlertJob.DueDays"
                inputType="number"
              />
            </div>
          </div>
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(AlertServiceLabels[32])"
                class="label is-small"
              />
              <CustomRadio
                v-model="AlertService.RemoveAlertJob.RunAtStartup"
                :options="trueOrFalseOptions"
              />
            </div>
          </div>
        </div>
      </BoxContent>
    </BoxContent>
  </article>
</template>

<script>
import settings from '@/mixins/settings/settings.js'
import SettingsActions from '@/components/settings/SettingsActions.vue'

export default {
  name: 'settings-alertservice-component',
  mixins: [settings],
  components: {
    SettingsActions,
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
        .then(() => {
          this.settingsWarning()
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
