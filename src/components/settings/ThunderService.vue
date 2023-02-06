<template>
  <article>
    <Loading :isLoading="thunderServiceLoading" />

    <SettingsActions
      :reset="resetThunderServiceSettings"
      :action="saveThunderServiceSettings"
    />

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

    <hr class="my-3" />
    <p class="is-size-6 has-text-weight-semibold">Oci Data Retrieve Job</p>

    <div class="columns is-multiline">
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(ThunderServiceLabels[4])"
            class="label is-small"
          />
          <CustomInput v-model="ThunderService.OciDataRetrieveJob.Crontab" />
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

    <hr class="my-3" />
    <p class="is-size-6 has-text-weight-semibold">
      Oci Remove Old Data Objects Job
    </p>

    <div class="columns is-multiline">
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(ThunderServiceLabels[7])"
            class="label is-small"
          />
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
            v-model="ThunderService.OciRemoveOldDataObjectsJob.DaysThreshold"
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

    <hr class="my-3" />
    <p class="is-size-6 has-text-weight-semibold">Aws Data Retrieve Job</p>

    <div class="columns is-multiline">
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(ThunderServiceLabels[10])"
            class="label is-small"
          />
          <CustomInput v-model="ThunderService.AwsDataRetrieveJob.Crontab" />
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
  </article>
</template>

<script>
import settings from '@/mixins/settings/settings.js'
import SettingsActions from '@/components/settings/SettingsActions.vue'
import Loading from '@/components/common/Loading.vue'

import HighlightSearchMixin from '@/mixins/highlightSearch.js'

export default {
  name: 'settings-thunderservice-component',
  mixins: [settings, HighlightSearchMixin],
  components: {
    SettingsActions,
    Loading,
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
    },
    resetThunderServiceSettings() {
      this.bindOriginalThunderServiceData()
    },
  },
}
</script>

<style lang="scss" scoped></style>
