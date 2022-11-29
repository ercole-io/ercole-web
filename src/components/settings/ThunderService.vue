<template>
  <article>
    <Loading :isLoading="thunderServiceLoading" />

    <SettingsActions formName="thunderService" />

    <div class="columns is-multiline">
      <div class="column is-one-quarter">
        <CustomField label="Remote Endpoint">
          <CustomInput v-model="ThunderService.RemoteEndpoint" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Port">
          <CustomInput v-model="ThunderService.Port" inputType="number" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Bind IP">
          <CustomInput v-model="ThunderService.BindIP" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Log HTTP Request">
          <CustomRadio
            v-model="ThunderService.LogHTTPRequest"
            :options="trueOrFalseOptions"
          />
        </CustomField>
      </div>
    </div>

    <hr class="my-3" />
    <p class="is-size-6 has-text-weight-semibold">Oci Data Retrieve Job</p>

    <div class="columns is-multiline">
      <div class="column is-one-quarter">
        <CustomField label="Crontab">
          <CustomInput v-model="ThunderService.OciDataRetrieveJob.Crontab" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="HourThreshold">
          <CustomInput
            v-model="ThunderService.OciDataRetrieveJob.DaysThreshold"
            inputType="number"
          />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Run At Startup">
          <CustomRadio
            v-model="ThunderService.OciDataRetrieveJob.RunAtStartup"
            :options="trueOrFalseOptions"
          />
        </CustomField>
      </div>
    </div>

    <hr class="my-3" />
    <p class="is-size-6 has-text-weight-semibold">
      Oci Remove Old Data Objects Job
    </p>

    <div class="columns is-multiline">
      <div class="column is-one-quarter">
        <CustomField label="Crontab">
          <CustomInput
            v-model="ThunderService.OciRemoveOldDataObjectsJob.Crontab"
          />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="HourThreshold">
          <CustomInput
            v-model="ThunderService.OciRemoveOldDataObjectsJob.DaysThreshold"
            inputType="number"
          />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Run At Startup">
          <CustomRadio
            v-model="ThunderService.OciRemoveOldDataObjectsJob.RunAtStartup"
            :options="trueOrFalseOptions"
          />
        </CustomField>
      </div>
    </div>

    <hr class="my-3" />
    <p class="is-size-6 has-text-weight-semibold">Aws Data Retrieve Job</p>

    <div class="columns is-multiline">
      <div class="column is-one-quarter">
        <CustomField label="Crontab">
          <CustomInput v-model="ThunderService.AwsDataRetrieveJob.Crontab" />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="HourThreshold">
          <CustomInput
            v-model="ThunderService.AwsDataRetrieveJob.DaysThreshold"
            inputType="number"
          />
        </CustomField>
      </div>
      <div class="column is-one-quarter">
        <CustomField label="Run At Startup">
          <CustomRadio
            v-model="ThunderService.AwsDataRetrieveJob.RunAtStartup"
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

export default {
  mixins: [settings],
  components: {
    SettingsActions,
  },
}
</script>

<style lang="scss" scoped></style>
