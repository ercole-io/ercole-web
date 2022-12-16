<template>
  <article>
    <Loading :isLoading="dataServiceLoading" />

    <SettingsActions
      :reset="resetApiServiceSettings"
      :action="saveDataServiceSettings"
    />

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
      <div class="column is-half">
        <CustomField label="License Type Metrics Default">
          <DragAndDropList :list="DataService.LicenseTypeMetricsDefault" />
        </CustomField>
      </div>
      <div class="column is-half">
        <CustomField
          label="License Type Metrics By Environment"
          class="is-relative"
        >
          <b-button
            type="is-primary"
            icon-right="plus"
            size="is-small"
            @click="addNewLTMBE"
            class="addNew"
          />
          <div
            class="is-flex is-flex-direction-row"
            v-for="value in Object.entries(LTMBEchanges)"
            :key="value[0]"
          >
            <p class="is-flex is-flex-direction-column is-flex-grow-2">
              <CustomInput v-model="value[1].name" />
              <DragAndDropList :list="value[1].items" />
            </p>
            <b-button
              type="is-danger"
              icon-right="delete"
              size="is-small"
              @click="deleteLTMBE(value[0])"
            />
          </div>
        </CustomField>
      </div>
    </div>
  </article>
</template>

<script>
import _ from 'lodash'
import settings from '@/mixins/settings/settings.js'
import SettingsActions from '@/components/settings/SettingsActions.vue'
import Loading from '@/components/common/Loading.vue'
import DragAndDropList from '@/components/common/DragAndDropList.vue'

export default {
  mixins: [settings],
  components: {
    SettingsActions,
    Loading,
    DragAndDropList,
  },
  data() {
    return {
      dataServiceLoading: false,
    }
  },
  methods: {
    saveDataServiceSettings() {
      this.dataServiceLoading = true

      this.DataService.LicenseTypeMetricsByEnvironment = _.mapValues(
        _.keyBy(this.LTMBEchanges, 'name'),
        'items'
      )

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
            this.dataServiceLoading = false
          }, 1000)
        })
        .then(() => {
          this.successSaveSettings('dataService')
        })
    },
    resetApiServiceSettings() {
      this.bindOriginalDataServiceData()
    },
    addNewLTMBE() {
      const newLTMBE = {
        name: '',
        items: ['Named User Plus Perpetual', 'Processor Perpetual'],
      }
      this.LTMBEchanges.unshift(newLTMBE)
    },
    deleteLTMBE(index) {
      this.LTMBEchanges.splice(index, 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.addNew {
  position: absolute;
  top: -9px;
  right: 0;
}
</style>
