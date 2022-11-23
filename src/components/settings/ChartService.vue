<template>
  <article>
    <Loading :isLoading="chartServiceLoading" />

    <div class="is-flex is-flex-direction-row is-justify-content-flex-end mb-3">
      <b-button
        type="is-danger"
        size="is-small"
        @click="resetChartService"
        class="mr-2"
      >
        Restore
      </b-button>

      <b-button
        type="is-custom-primary"
        size="is-small"
        @click="saveChartServiceSettings"
      >
        Save
      </b-button>
    </div>

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
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'
import settings from '@/mixins/settings/settings.js'

export default {
  mixins: [settings],
  beforeMount() {
    this.bindOriginalChartServiceData()

    bus.$on('resetAllSettings', () => {
      this.bindOriginalChartServiceData()
    })
  },
  methods: {
    bindOriginalChartServiceData() {
      this.ChartService = {
        RemoteEndpoint: this.getChartService.RemoteEndpoint,
        BindIP: this.getChartService.BindIP,
        Port: this.getChartService.Port,
        LogHTTPRequest: this.getChartService.LogHTTPRequest,
      }
    },
    saveChartServiceSettings() {
      this.chartServiceLoading = true
      this.submitSettings()
    },
    resetChartService() {
      console.log('reset chart service')
      this.bindOriginalChartServiceData()
    },
  },
  computed: {
    ...mapGetters(['getChartService']),
  },
}
</script>

<style lang="scss" scoped>
.customLabel {
  width: 250px !important;
}
</style>
