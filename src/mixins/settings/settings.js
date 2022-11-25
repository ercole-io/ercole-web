import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapState } from 'vuex'

import Loading from '@/components/common/Loading.vue'
import CustomField from '@/components/common/Form/CustomField.vue'
import CustomInput from '@/components/common/Form/CustomInput.vue'
import CustomRadio from '@/components/common/Form/CustomRadio.vue'

import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

// masks: {
//   ip: [],
// },
// :inputMask="'#?#?#.#?#?#.#?#?#.#?#?#'"

export default {
  components: {
    Loading,
    CustomField,
    CustomInput,
    CustomRadio,
    VueJsonPretty,
  },
  data() {
    return {
      APIService: {
        RemoteEndpoint: null,
        Port: null,
        BindIP: null,
        LogHTTPRequest: null,
        ReadOnly: null,
        DebugOracleDatabaseContractsAssignmentAlgorithm: null,
        AuthenticationProvider: {
          Types: null,
          Username: null,
          Password: null,
          PrivateKey: null,
          PublicKey: null,
          TokenValidityTimeout: null,
          Host: null,
          Port: null,
          LDAPBase: null,
          LDAPBindDN: null,
          LDAPBindPassword: null,
          LDAPUserFilter: null,
        },
        OperatingSystemAggregationRules: null,
        DefaultDatabaseTags: null,
      },
      apiServiceLoading: false,
      AlertService: {
        RemoteEndpoint: null,
        BindIP: null,
        Port: null,
        LogHTTPRequest: null,
        LogMessages: null,
        LogAlertThrows: null,
        PublisherUsername: null,
        PublisherPassword: null,
        QueueBufferSize: null,
        Emailer: {
          Enabled: null,
          From: null,
          To: null,
          SMTPServer: null,
          SMTPPort: null,
          SMTPUsername: null,
          SMTPPassword: null,
          DisableSSLCertificateValidation: null,
        },
      },
      alertServiceLoading: false,
      ChartService: {
        RemoteEndpoint: null,
        BindIP: null,
        Port: null,
        LogHTTPRequest: null,
      },
      chartServiceLoading: null,
      DataService: {
        RemoteEndpoint: null,
        BindIP: null,
        Port: null,
        LogHTTPRequest: null,
        LogInsertingHostdata: null,
        AgentUsername: null,
        AgentPassword: null,
        CurrentHostCleaningJob: {
          Crontab: null,
          HourThreshold: null,
          RunAtStartup: null,
        },
        ArchivedHostCleaningJob: {
          Crontab: null,
          HourThreshold: null,
          RunAtStartup: null,
        },
        FreshnessCheckJob: {
          Crontab: null,
          RunAtStartup: null,
        },
        LicenseTypeMetricsDefault: null,
        LicenseTypeMetricsByEnvironment: null,
      },
      dataServiceLoading: null,
      ResourceFilePath: null,
      resourceFilePathLoading: false,
    }
  },
  methods: {
    ...mapActions(['saveSettings']),
    submitSettings() {
      const data = {
        APIService: this.APIService,
        AlertService: this.AlertService,
        ChartService: this.ChartService,
        DataService: this.DataService,
        ResourceFilePath: this.ResourceFilePath,
        ThunderService: this.ThunderService,
      }
      this.saveSettings(data).then(() => {
        this.apiServiceLoading = false
        this.alertServiceLoading = false
        this.chartServiceLoading = false
        this.dataServiceLoading = false
        this.resourceFilePathLoading = false
      })
    },
    resetAllSettings() {
      console.log('resetAll')
      bus.$emit('resetAllSettings')
    },
  },
  computed: {
    ...mapState(['settings']),
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
