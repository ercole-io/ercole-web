<template>
  <article>
    <Loading :isLoading="chartServiceLoading" />

    <SettingsActions
      :reset="resetChartServiceSettings"
      :action="saveChartServiceSettings"
    />

    <div class="columns is-multiline">
      <div class="column is-one-quarter">
        <CustomField label="Remote Endpoint">
          <CustomInput v-model="ChartService.RemoteEndpoint" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Port">
          <CustomInput v-model="ChartService.Port" inputType="number" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Bind IP">
          <CustomInput v-model="ChartService.BindIP" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Log HTTP Request">
          <CustomRadio
            v-model="ChartService.LogHTTPRequest"
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
import Loading from '@/components/common/Loading.vue'

export default {
  mixins: [settings],
  components: {
    SettingsActions,
    Loading,
  },
  data() {
    return {
      chartServiceLoading: false,
    }
  },
  methods: {
    saveChartServiceSettings() {
      this.chartServiceLoading = true

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
            this.chartServiceLoading = false
          }, 1000)
        })
        .then(() => {
          this.successSaveSettings('chartService')
        })
    },
    resetChartServiceSettings() {
      this.bindOriginalChartServiceData()
    },
  },
}
</script>

<style lang="scss" scoped></style>
