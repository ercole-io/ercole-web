<template>
  <article>
    <Loading :isLoading="thunderServiceLoading" />

    <BoxContent
      title="Thunder Service"
      class="is-size-4 has-text-weight-semibold"
      customStyle="padding: 20px 40px"
      border
    >
      <SettingsActions
        :reset="resetThunderServiceSettings"
        :action="saveThunderServiceSettings"
        slot="customTitle"
      />

      <BoxContent
        title="Service Parameters"
        class="is-size-5 has-text-weight-semibold"
        customStyle="padding: 20px 40px"
        border
        hasShadow
      >
        <div class="columns is-multiline">
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(ThunderServiceLabels[0])"
                class="label is-small"
              />
              <CustomInput v-model="ThunderService.RemoteEndpoint" />
            </div>
          </div>
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(ThunderServiceLabels[1])"
                class="label is-small"
              />
              <CustomInput v-model="ThunderService.Port" inputType="number" />
            </div>
          </div>
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(ThunderServiceLabels[2])"
                class="label is-small"
              />
              <CustomInput v-model="ThunderService.BindIP" />
            </div>
          </div>
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(ThunderServiceLabels[3])"
                class="label is-small"
              />
              <CustomRadio
                v-model="ThunderService.LogHTTPRequest"
                :options="trueOrFalseOptions"
              />
            </div>
          </div>
        </div>
      </BoxContent>

      <BoxContent
        title="Cloud Advisors"
        class="is-size-5 has-text-weight-semibold"
        customStyle="padding: 20px 40px"
        border
        hasShadow
      >
        <div class="columns is-multiline">
          <div class="column is-2">
            <div class="field">
              <label
                v-html="highlight(ThunderServiceLabels[22])"
                class="label is-small"
              />
              <CustomRadio
                v-model="APIService.EnableOciMenu"
                :options="trueOrFalseOptions"
              />
            </div>
          </div>

          <div class="column is-2">
            <div class="field">
              <label
                v-html="highlight(ThunderServiceLabels[23])"
                class="label is-small"
              />
              <CustomRadio
                v-model="APIService.EnableAwsMenu"
                :options="trueOrFalseOptions"
              />
            </div>
          </div>

          <div class="column is-2">
            <div class="field">
              <label
                v-html="highlight(ThunderServiceLabels[24])"
                class="label is-small"
              />
              <CustomRadio
                v-model="APIService.EnableGcpMenu"
                :options="trueOrFalseOptions"
              />
            </div>
          </div>
        </div>
      </BoxContent>

      <BoxContent
        title="Oci Data Retrieve Job"
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
                  v-html="highlight(ThunderServiceLabels[4])"
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
              <CustomInput
                v-model="ThunderService.OciDataRetrieveJob.Crontab"
              />
            </div>
          </div>
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(ThunderServiceLabels[5])"
                class="label is-small"
              />
              <CustomInput
                v-model="ThunderService.OciDataRetrieveJob.DaysThreshold"
                inputType="number"
              />
            </div>
          </div>
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(ThunderServiceLabels[6])"
                class="label is-small"
              />
              <CustomRadio
                v-model="ThunderService.OciDataRetrieveJob.RunAtStartup"
                :options="trueOrFalseOptions"
              />
            </div>
          </div>
        </div>
      </BoxContent>

      <BoxContent
        title="Oci Remove Old Data Objects Job"
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
                  v-html="highlight(ThunderServiceLabels[7])"
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
              <CustomInput
                v-model="ThunderService.OciRemoveOldDataObjectsJob.Crontab"
              />
            </div>
          </div>
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(ThunderServiceLabels[8])"
                class="label is-small"
              />
              <CustomInput
                v-model="
                  ThunderService.OciRemoveOldDataObjectsJob.DaysThreshold
                "
                inputType="number"
              />
            </div>
          </div>
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(ThunderServiceLabels[9])"
                class="label is-small"
              />
              <CustomRadio
                v-model="ThunderService.OciRemoveOldDataObjectsJob.RunAtStartup"
                :options="trueOrFalseOptions"
              />
            </div>
          </div>
        </div>
      </BoxContent>

      <BoxContent
        title="Aws Data Retrieve Job"
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
                  v-html="highlight(ThunderServiceLabels[10])"
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
              <CustomInput
                v-model="ThunderService.AwsDataRetrieveJob.Crontab"
              />
            </div>
          </div>
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(ThunderServiceLabels[11])"
                class="label is-small"
              />
              <CustomInput
                v-model="ThunderService.AwsDataRetrieveJob.DaysThreshold"
                inputType="number"
              />
            </div>
          </div>
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(ThunderServiceLabels[12])"
                class="label is-small"
              />
              <CustomRadio
                v-model="ThunderService.AwsDataRetrieveJob.RunAtStartup"
                :options="trueOrFalseOptions"
              />
            </div>
          </div>
        </div>
      </BoxContent>

      <BoxContent
        title="Gcp Data Retrieve Job"
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
                  v-html="highlight(ThunderServiceLabels[10])"
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
              <CustomInput
                v-model="ThunderService.GcpDataRetrieveJob.Crontab"
              />
            </div>
          </div>
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(ThunderServiceLabels[12])"
                class="label is-small"
              />
              <CustomRadio
                v-model="ThunderService.GcpDataRetrieveJob.RunAtStartup"
                :options="trueOrFalseOptions"
              />
            </div>
          </div>
        </div>

        <div class="columns is-multiline">
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(ThunderServiceLabels[13])"
                class="label is-small"
              />
              <CustomInput
                v-model="ThunderService.GcpDataRetrieveJob.ProjectID"
              />
            </div>
          </div>
        </div>

        <div class="columns is-multiline">
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(ThunderServiceLabels[14])"
                class="label is-small"
              />
              <CustomInput
                v-model="ThunderService.GcpDataRetrieveJob.AvgCpuPercentage"
                inputType="number"
              />
            </div>
          </div>
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(ThunderServiceLabels[15])"
                class="label is-small"
              />
              <CustomInput
                v-model="
                  ThunderService.GcpDataRetrieveJob.AvgCpuUtilizationThreshold
                "
                inputType="number"
              />
            </div>
          </div>
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(ThunderServiceLabels[16])"
                class="label is-small"
              />
              <CustomInput
                v-model="ThunderService.GcpDataRetrieveJob.MaxCpuPercentage"
                inputType="number"
              />
            </div>
          </div>
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(ThunderServiceLabels[17])"
                class="label is-small"
              />
              <CustomInput
                v-model="
                  ThunderService.GcpDataRetrieveJob.MaxCpuUtilizationThreshold
                "
                inputType="number"
              />
            </div>
          </div>
        </div>

        <div class="columns is-multiline">
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(ThunderServiceLabels[18])"
                class="label is-small"
              />
              <CustomInput
                v-model="ThunderService.GcpDataRetrieveJob.MaxMemPercentage"
                inputType="number"
              />
            </div>
          </div>
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(ThunderServiceLabels[19])"
                class="label is-small"
              />
              <CustomInput
                v-model="
                  ThunderService.GcpDataRetrieveJob.MaxMemUtilizationThreshold
                "
                inputType="number"
              />
            </div>
          </div>
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(ThunderServiceLabels[20])"
                class="label is-small"
              />
              <CustomInput
                v-model="
                  ThunderService.GcpDataRetrieveJob.IopsStoragePercentage
                "
                inputType="number"
              />
            </div>
          </div>
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(ThunderServiceLabels[21])"
                class="label is-small"
              />
              <CustomInput
                v-model="
                  ThunderService.GcpDataRetrieveJob.ThroughputStoragePercentage
                "
                inputType="number"
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
  name: 'settings-thunderservice-component',
  mixins: [settings],
  components: {
    SettingsActions,
  },
  data() {
    return {
      thunderServiceLoading: false,
    }
  },
  methods: {
    saveThunderServiceSettings() {
      this.thunderServiceLoading = true

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
            this.thunderServiceLoading = false
          }, 1000)
        })
        .then(() => {
          this.successSaveSettings('thunderService')
        })
        .then(() => {
          this.settingsWarning()
        })
    },
    resetThunderServiceSettings() {
      this.bindOriginalThunderServiceData()
    },
  },
}
</script>

<style lang="scss" scoped></style>
