<template>
  <article>
    <Loading :isLoading="dataServiceLoading" />

    <div class="is-flex is-flex-direction-row is-justify-content-flex-end mb-3">
      <b-button
        type="is-danger"
        size="is-small"
        @click="resetDataService"
        class="mr-2"
      >
        Restore
      </b-button>

      <b-button
        type="is-custom-primary"
        size="is-small"
        @click="saveDataServiceSettings"
      >
        Save
      </b-button>
    </div>

    <div class="columns is-multiline">
      <div class="column is-one-quarter">
        <CustomField label="Remote Endpoint">
          <CustomInput v-model="DataService.RemoteEndpoint" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Port">
          <CustomInput v-model="DataService.Port" inputType="number" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Bind IP">
          <CustomInput v-model="DataService.BindIP" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Log HTTP Request">
          <CustomRadio
            v-model="DataService.LogHTTPRequest"
            :options="trueOrFalseOptions"
          />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Log Inserting Hostdata">
          <CustomRadio
            v-model="DataService.LogInsertingHostdata"
            :options="trueOrFalseOptions"
          />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Agent Username">
          <CustomInput v-model="DataService.AgentUsername" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Agent Password">
          <CustomInput v-model="DataService.AgentPassword" />
        </CustomField>
      </div>
    </div>

    <hr class="my-3" />
    <p class="is-size-6 has-text-weight-semibold">Current Host Cleaning Job</p>

    <div class="columns is-multiline">
      <div class="column is-one-quarter">
        <CustomField label="Crontab">
          <CustomInput v-model="DataService.CurrentHostCleaningJob.Crontab" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="HourThreshold">
          <CustomInput
            v-model="DataService.CurrentHostCleaningJob.HourThreshold"
            inputType="number"
          />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Run At Startup">
          <CustomRadio
            v-model="DataService.CurrentHostCleaningJob.RunAtStartup"
            :options="trueOrFalseOptions"
          />
        </CustomField>
      </div>
    </div>

    <hr class="my-3" />
    <p class="is-size-6 has-text-weight-semibold">Archived Host Cleaning Job</p>

    <div class="columns is-multiline">
      <div class="column is-one-quarter">
        <CustomField label="Crontab">
          <CustomInput v-model="DataService.ArchivedHostCleaningJob.Crontab" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="HourThreshold">
          <CustomInput
            v-model="DataService.ArchivedHostCleaningJob.HourThreshold"
            inputType="number"
          />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Run At Startup">
          <CustomRadio
            v-model="DataService.ArchivedHostCleaningJob.RunAtStartup"
            :options="trueOrFalseOptions"
          />
        </CustomField>
      </div>
    </div>

    <hr class="my-3" />
    <p class="is-size-6 has-text-weight-semibold">Freshness Check Job</p>

    <div class="columns is-multiline">
      <div class="column is-one-quarter">
        <CustomField label="Crontab">
          <CustomInput v-model="DataService.FreshnessCheckJob.Crontab" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Run At Startup">
          <CustomRadio
            v-model="DataService.FreshnessCheckJob.RunAtStartup"
            :options="trueOrFalseOptions"
          />
        </CustomField>
      </div>
    </div>

    <hr class="my-3" />

    <div class="columns is-multiline">
      <div class="column is-two-quarter">
        <CustomField label="License Type Metrics Default">
          <b-taginput
            v-model="DataService.LicenseTypeMetricsDefault"
            ellipsis
            icon="label"
            placeholder="Add"
            size="is-small"
            type="is-primary"
          />
        </CustomField>
      </div>
      <div class="column is-two-quarter">
        <CustomField label="License Type Metrics By Environment">
          <b-taginput
            v-model="DataService.LicenseTypeMetricsByEnvironment.TEST"
            ellipsis
            icon="label"
            placeholder="Add"
            size="is-small"
            type="is-primary"
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
    this.bindOriginalDataServiceData()

    bus.$on('resetAllSettings', () => {
      this.bindOriginalDataServiceData()
    })
  },
  methods: {
    bindOriginalDataServiceData() {
      this.DataService = {
        RemoteEndpoint: this.getDataService.RemoteEndpoint,
        BindIP: this.getDataService.BindIP,
        Port: this.getDataService.Port,
        LogHTTPRequest: this.getDataService.LogHTTPRequest,
        LogInsertingHostdata: this.getDataService.LogInsertingHostdata,
        AgentUsername: this.getDataService.AgentUsername,
        AgentPassword: this.getDataService.AgentPassword,
        CurrentHostCleaningJob: {
          Crontab: this.getDataService.CurrentHostCleaningJob.Crontab,
          HourThreshold:
            this.getDataService.CurrentHostCleaningJob.HourThreshold,
          RunAtStartup: this.getDataService.CurrentHostCleaningJob.RunAtStartup,
        },
        ArchivedHostCleaningJob: {
          Crontab: this.getDataService.ArchivedHostCleaningJob.Crontab,
          HourThreshold:
            this.getDataService.ArchivedHostCleaningJob.HourThreshold,
          RunAtStartup:
            this.getDataService.ArchivedHostCleaningJob.RunAtStartup,
        },
        FreshnessCheckJob: {
          Crontab: this.getDataService.FreshnessCheckJob.Crontab,
          RunAtStartup: this.getDataService.FreshnessCheckJob.RunAtStartup,
        },
        LicenseTypeMetricsDefault:
          this.getDataService.LicenseTypeMetricsDefault,
        LicenseTypeMetricsByEnvironment:
          this.getDataService.LicenseTypeMetricsByEnvironment,
      }
    },
    saveDataServiceSettings() {
      this.dataServiceLoading = true
      this.submitSettings()
    },
    resetDataService() {
      console.log('reset data service')
      this.bindOriginalDataServiceData()
    },
  },
  computed: {
    ...mapGetters(['getDataService']),
  },
}
</script>

<style lang="scss" scoped>
.customLabel {
  width: 250px !important;
}
</style>
