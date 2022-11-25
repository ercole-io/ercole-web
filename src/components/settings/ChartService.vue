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
        @click="submitSettings('chartService')"
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
import settings from '@/mixins/settings/settings.js'

export default {
  mixins: [settings],
}
</script>

<style lang="scss" scoped></style>
