<template>
  <article>
    <Loading :isLoading="chartServiceLoading" />

    <SettingsActions
      :reset="resetChartServiceSettings"
      :action="saveChartServiceSettings"
    />

    <div class="columns is-multiline">
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(ChartServiceLabels[0])"
            class="label is-small"
          />
          <CustomInput v-model="ChartService.RemoteEndpoint" />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(ChartServiceLabels[1])"
            class="label is-small"
          />
          <CustomInput v-model="ChartService.Port" inputType="number" />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(ChartServiceLabels[2])"
            class="label is-small"
          />
          <CustomInput v-model="ChartService.BindIP" />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <label
            v-html="highlight(ChartServiceLabels[3])"
            class="label is-small"
          />
          <CustomRadio
            v-model="ChartService.LogHTTPRequest"
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
  mixins: [settings, HighlightSearchMixin],
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
