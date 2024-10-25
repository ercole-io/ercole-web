<template>
  <article>
    <Loading :isLoading="dataServiceLoading" />

    <BoxContent
      title="Data Service"
      class="is-size-4 has-text-weight-semibold"
      customStyle="padding: 20px 40px"
      border
    >
      <SettingsActions
        :reset="resetApiServiceSettings"
        :action="saveDataServiceSettings"
        slot="customTitle"
      />

      <BoxContent customStyle="padding: 20px 40px" border hasShadow>
        <div class="columns is-multiline">
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(DataServiceLabels[0])"
                class="label is-small"
              />
              <CustomInput v-model="DataService.RemoteEndpoint" />
            </div>
          </div>
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(DataServiceLabels[1])"
                class="label is-small"
              />
              <CustomInput v-model="DataService.Port" inputType="number" />
            </div>
          </div>
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(DataServiceLabels[2])"
                class="label is-small"
              />
              <CustomInput v-model="DataService.BindIP" />
            </div>
          </div>
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(DataServiceLabels[3])"
                class="label is-small"
              />
              <CustomRadio
                v-model="DataService.LogHTTPRequest"
                :options="trueOrFalseOptions"
              />
            </div>
          </div>
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(DataServiceLabels[4])"
                class="label is-small"
              />
              <CustomRadio
                v-model="DataService.LogInsertingHostdata"
                :options="trueOrFalseOptions"
              />
            </div>
          </div>
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(DataServiceLabels[5])"
                class="label is-small"
              />
              <CustomInput v-model="DataService.AgentUsername" />
            </div>
          </div>
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(DataServiceLabels[6])"
                class="label is-small"
              />
              <CustomInput v-model="DataService.AgentPassword" />
            </div>
          </div>
        </div>
      </BoxContent>

      <BoxContent
        title="Agent Data Retention"
        class="is-size-5 has-text-weight-semibold"
        customStyle="padding: 20px 40px"
        border
        hasShadow
      >
        <div class="columns is-multiline">
          <div class="column is-one-quarter">
            <div class="field">
              <label
                v-html="highlight(DataServiceLabels[7])"
                class="label is-small"
              />
              <CustomInput
                v-model="DataService.CurrentHostCleaningJob.HourThreshold"
                inputType="number"
              />
            </div>
          </div>
        </div>
      </BoxContent>

      <BoxContent customStyle="padding: 20px 40px" border hasShadow>
        <div class="columns is-multiline">
          <div class="column is-half">
            <div class="field">
              <label
                v-html="highlight(DataServiceLabels[8])"
                class="label is-small"
              />
              <DragAndDropList :list="DataService.LicenseTypeMetricsDefault" />
            </div>
          </div>
          <div class="column is-half">
            <div class="field">
              <label
                v-html="highlight(DataServiceLabels[9])"
                class="label is-small"
              />
              <div class="is-relative">
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
              </div>
            </div>
          </div>
        </div>
      </BoxContent>
    </BoxContent>
  </article>
</template>

<script>
import _ from 'lodash'
import settings from '@/mixins/settings/settings.js'
import SettingsActions from '@/components/settings/SettingsActions.vue'
import DragAndDropList from '@/components/common/DragAndDropList.vue'

export default {
  name: 'settings-dataservice-component',
  mixins: [settings],
  components: {
    SettingsActions,
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

      this.DataService.ArchivedHostCleaningJob.HourThreshold =
        this.DataService.CurrentHostCleaningJob.HourThreshold

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
        .then(() => {
          this.settingsWarning()
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
  top: -33px;
  right: 0;
}
</style>
