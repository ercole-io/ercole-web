import { mapActions, mapGetters, mapState } from 'vuex'

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
      isMounted: false,
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
      ThunderService: {
        RemoteEndpoint: null,
        BindIP: null,
        Port: null,
        LogHTTPRequest: null,
        OciDataRetrieveJob: {
          Crontab: null,
          DaysThreshold: null,
          RunAtStartup: null,
        },
        OciRemoveOldDataObjectsJob: {
          Crontab: null,
          DaysThreshold: null,
          RunAtStartup: null,
        },
        AwsDataRetrieveJob: {
          Crontab: null,
          DaysThreshold: null,
          RunAtStartup: null,
        },
      },
      thunderServiceLoading: false,
    }
  },
  async beforeMount() {
    await this.requestSettings().then(() => {
      this.isMounted = true
    })

    this.bindoOriginalData()
  },
  methods: {
    ...mapActions(['requestSettings', 'saveSettings']),
    bindoOriginalData() {
      this.bindOriginalApiServiceData()
      this.bindOriginalAlertServiceData()
      this.bindOriginalChartServiceData()
      this.bindOriginalDataServiceData()
      this.bindOriginalResourceFilePathData()
      this.bindOriginalThunderServiceData()
    },
    submitSettings(type) {
      this.loadingStatus(type, true)

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
          this.loadingStatus(type, false)
        })
        .then(() => {
          this.successSaveSettings(type)
        })
    },
    loadingStatus(type, action) {
      switch (type) {
        case 'apiService':
          this.apiServiceLoading = action
          break
        case 'alertService':
          this.alertServiceLoading = action
          break
        case 'chartService':
          this.chartServiceLoading = action
          break
        case 'dataService':
          this.dataServiceLoading = action
          break
        case 'resourceFilePath':
          this.resourceFilePathLoading = action
          break
        case 'thunderService':
          this.thunderServiceLoading = action
          break
        default:
          break
      }
    },
    successSaveSettings(type) {
      let message = ''

      switch (type) {
        case 'apiService':
          message = 'Api Service'
          break
        case 'alertService':
          message = 'Alerts Service'
          break
        case 'chartService':
          message = 'Chart Service'
          break
        case 'dataService':
          message = 'Data Service'
          break
        case 'resourceFilePath':
          message = 'Resource File Path'
          break
        case 'thunderService':
          message = 'Thunder Service'
          break
        default:
          break
      }

      this.$buefy.toast.open({
        message: `The ${message} settings was successfully saved!`,
        type: 'is-success',
        duration: 5000,
        position: 'is-bottom',
      })
    },
    bindOriginalApiServiceData() {
      this.APIService = {
        RemoteEndpoint: this.getAPIService.RemoteEndpoint,
        Port: this.getAPIService.Port,
        BindIP: this.getAPIService.BindIP,
        LogHTTPRequest: this.getAPIService.LogHTTPRequest,
        ReadOnly: this.getAPIService.ReadOnly,
        DebugOracleDatabaseContractsAssignmentAlgorithm:
          this.getAPIService.DebugOracleDatabaseContractsAssignmentAlgorithm,
        AuthenticationProvider: {
          Types: this.getAPIService.AuthenticationProvider.Types,
          Username: this.getAPIService.AuthenticationProvider.Username,
          Password: this.getAPIService.AuthenticationProvider.Password,
          PrivateKey: this.getAPIService.AuthenticationProvider.PrivateKey,
          PublicKey: this.getAPIService.AuthenticationProvider.PublicKey,
          TokenValidityTimeout:
            this.getAPIService.AuthenticationProvider.TokenValidityTimeout,
          Host: this.getAPIService.AuthenticationProvider.Host,
          Port: this.getAPIService.AuthenticationProvider.Port,
          LDAPBase: this.getAPIService.AuthenticationProvider.LDAPBase,
          LDAPBindDN: this.getAPIService.AuthenticationProvider.LDAPBindDN,
          LDAPBindPassword:
            this.getAPIService.AuthenticationProvider.LDAPBindPassword,
          LDAPUserFilter:
            this.getAPIService.AuthenticationProvider.LDAPUserFilter,
        },
        // never change
        OperatingSystemAggregationRules:
          this.getAPIService.OperatingSystemAggregationRules,
        DefaultDatabaseTags: this.getAPIService.DefaultDatabaseTags,
        // never change
      }
    },
    resetApiService() {
      this.bindOriginalApiServiceData()
    },
    bindOriginalResourceFilePathData() {
      this.ResourceFilePath = this.getResourceFilePath
    },
    resetResourceFilePath() {
      this.bindOriginalResourceFilePathData()
    },
    bindOriginalAlertServiceData() {
      this.AlertService = {
        RemoteEndpoint: this.getAlertService.RemoteEndpoint,
        BindIP: this.getAlertService.BindIP,
        Port: this.getAlertService.Port,
        LogHTTPRequest: this.getAlertService.LogHTTPRequest,
        LogMessages: this.getAlertService.LogMessages,
        LogAlertThrows: this.getAlertService.LogAlertThrows,
        PublisherUsername: this.getAlertService.PublisherUsername,
        PublisherPassword: this.getAlertService.PublisherPassword,
        QueueBufferSize: this.getAlertService.QueueBufferSize,
        Emailer: {
          Enabled: this.getAlertService.Emailer.Enabled,
          From: this.getAlertService.Emailer.From,
          To: this.getAlertService.Emailer.To,
          SMTPServer: this.getAlertService.Emailer.SMTPServer,
          SMTPPort: this.getAlertService.Emailer.SMTPPort,
          SMTPUsername: this.getAlertService.Emailer.SMTPUsername,
          SMTPPassword: this.getAlertService.Emailer.SMTPPassword,
          DisableSSLCertificateValidation:
            this.getAlertService.Emailer.DisableSSLCertificateValidation,
        },
      }
    },
    resetAlertService() {
      this.bindOriginalAlertServiceData()
    },
    bindOriginalChartServiceData() {
      this.ChartService = {
        RemoteEndpoint: this.getChartService.RemoteEndpoint,
        BindIP: this.getChartService.BindIP,
        Port: this.getChartService.Port,
        LogHTTPRequest: this.getChartService.LogHTTPRequest,
      }
    },
    resetChartService() {
      this.bindOriginalChartServiceData()
    },
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
    resetDataService() {
      this.bindOriginalDataServiceData()
    },
    bindOriginalThunderServiceData() {
      this.ThunderService = {
        RemoteEndpoint: this.getThunderService.RemoteEndpoint,
        BindIP: this.getThunderService.BindIP,
        Port: this.getThunderService.Port,
        LogHTTPRequest: this.getThunderService.LogHTTPRequest,
        OciDataRetrieveJob: {
          Crontab: this.getThunderService.OciDataRetrieveJob.Crontab,
          DaysThreshold:
            this.getThunderService.OciDataRetrieveJob.DaysThreshold,
          RunAtStartup: this.getThunderService.OciDataRetrieveJob.RunAtStartup,
        },
        OciRemoveOldDataObjectsJob: {
          Crontab: this.getThunderService.OciRemoveOldDataObjectsJob.Crontab,
          DaysThreshold:
            this.getThunderService.OciRemoveOldDataObjectsJob.DaysThreshold,
          RunAtStartup:
            this.getThunderService.OciRemoveOldDataObjectsJob.RunAtStartup,
        },
        AwsDataRetrieveJob: {
          Crontab: this.getThunderService.AwsDataRetrieveJob.Crontab,
          DaysThreshold:
            this.getThunderService.AwsDataRetrieveJob.DaysThreshold,
          RunAtStartup: this.getThunderService.AwsDataRetrieveJob.RunAtStartup,
        },
      }
    },
    resetThunderService() {
      this.bindOriginalThunderServiceData()
    },
  },
  computed: {
    ...mapState(['settings']),
    ...mapGetters([
      'getAPIService',
      'getAlertService',
      'getChartService',
      'getDataService',
      'getResourceFilePath',
      'getThunderService',
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
