<template>
  <BoxContent title="Ercole Settings" border :mbottom="false">
    <div slot="customTitle">
      <b-button
        type="is-danger"
        size="is-small"
        @click="resetSettings"
        class="mr-2"
      >
        Restore Default
      </b-button>

      <b-button
        type="is-custom-primary"
        size="is-small"
        @click="submitSettings"
      >
        Save Settings
      </b-button>
    </div>
    <Collapse :collapses="collapses">
      <template slot="Api Service">
        <div class="columns is-desktop">
          <div class="column">
            <CustomField label="Remote Endpoint">
              <CustomInput v-model="APIService.RemoteEndpoint" />
            </CustomField>
          </div>
          <div class="column">
            <CustomField label="Port">
              <CustomInput v-model="APIService.Port" inputType="number" />
            </CustomField>
          </div>
          <div class="column">
            <CustomField label="Bind IP">
              <CustomInput
                v-model="APIService.BindIP"
                :inputMask="'#?#?#.#?#?#.#?#?#.#?#?#'"
              />
            </CustomField>
          </div>
          <div class="column">
            <CustomField label="Log HTTP Request">
              <CustomRadio
                v-model="APIService.LogHTTPRequest"
                :options="trueOrFalseOptions"
              />
            </CustomField>
          </div>
        </div>
        <VueJsonPretty :data="getAPIService" />
      </template>

      <template slot="Alert Service">
        <VueJsonPretty :data="getAlertService" />
      </template>

      <template slot="Chart Service">
        <VueJsonPretty :data="getChartService" />
      </template>

      <template slot="Data Service">
        <VueJsonPretty :data="getDataService" />
      </template>

      <template slot="Resource File Path">
        <VueJsonPretty :data="getResourceFilePath" />
      </template>

      <template slot="Thunder Service">
        <VueJsonPretty :data="getThunderService" />
      </template>
    </Collapse>
  </BoxContent>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import Collapse from '@/components/common/Collapse.vue'
import CustomField from '@/components/common/Form/CustomField.vue'
import CustomInput from '@/components/common/Form/CustomInput.vue'
import CustomRadio from '@/components/common/Form/CustomRadio.vue'

import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

export default {
  components: {
    BoxContent,
    Collapse,
    CustomField,
    CustomInput,
    CustomRadio,
    VueJsonPretty,
  },
  data() {
    return {
      collapses: [
        'Api Service',
        'Alert Service',
        'Chart Service',
        'Data Service',
        'Resource File Path',
        'Thunder Service',
      ],
      APIService: {
        RemoteEndpoint: '',
        BindIP: '',
        Port: '',
        LogHTTPRequest: false,
      },
      masks: {
        ip: [],
      },
    }
  },
  async beforeMount() {
    await this.requestSettings()
    this.APIService.RemoteEndpoint = this.getAPIService.RemoteEndpoint
    this.APIService.BindIP = this.getAPIService.BindIP
    this.APIService.Port = this.getAPIService.Port
    this.APIService.LogHTTPRequest = this.getAPIService.LogHTTPRequest
  },
  methods: {
    ...mapActions(['requestSettings']),
    submitSettings() {
      console.log(this.APIService)
      console.log(this.getAPIService)
    },
    resetSettings() {
      this.APIService.RemoteEndpoint = this.getAPIService.RemoteEndpoint
      this.APIService.BindIP = this.getAPIService.BindIP
      this.APIService.Port = this.getAPIService.Port
      this.APIService.LogHTTPRequest = this.getAPIService.LogHTTPRequest
    },
  },
  computed: {
    ...mapGetters([
      'getAllSettings',
      'getDataService',
      'getAlertService',
      'getAPIService',
      'getChartService',
      'getThunderService',
      'getResourceFilePath',
    ]),
    trueOrFalseOptions() {
      return [
        {
          text: this.$i18n.t('common.forms.yes'),
          val: true,
        },
        {
          text: this.$i18n.t('common.forms.no'),
          val: false,
        },
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
.customLabel {
  width: 250px !important;
}
</style>
