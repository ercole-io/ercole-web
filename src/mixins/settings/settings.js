import _ from 'lodash'
import { mapActions, mapGetters, mapState } from 'vuex'

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
          Types: [],
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
          AlertType: {
            NewHost: null,
            NewDatabase: null,
            NewLicense: null,
            NewOption: null,
            NewUnlistedRunningDatabase: null,
            NewHostCpu: null,
            MissingPrimaryDatabase: null,
            MissingDatabase: null,
            AgentError: null,
            NoData: null,
          },
        },
      },
      ChartService: {
        RemoteEndpoint: null,
        BindIP: null,
        Port: null,
        LogHTTPRequest: null,
      },
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
        LicenseTypeMetricsByEnvironment: {},
      },
      LTMBEchanges: [],
      ResourceFilePath: null,
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
      APIServiceLabels: [
        'Remote Endpoint',
        'Port',
        'Bind IP',
        'Log HTTP Request',
        'ReadOnly',
        'Debug Oracle Database Contracts Assignment Algorithm',
        'Types',
        'Username',
        'Password',
        'Private Key',
        'Public Key',
        'Token Validity Timeout',
        'Host',
        'Port',
        'LDAP Base',
        'LDAP Bind DN',
        'LDAP Bind Password',
        'LDAP User Filter',
      ],
      highlightApiService: false,
      AlertServiceLabels: [
        'Remote Endpoint',
        'Bind IP',
        'Port',
        'Log HTTP Request',
        'Log Messages',
        'Log Alert Throws',
        'Publisher Username',
        'Publisher Password',
        'Queue Buffer Size',
        'Enabled',
        'From',
        'To',
        'SMTP Server',
        'SMTP Port',
        'SMTP Username',
        'SMTP Password',
        'Disable SSL Certificate Validation',
        'New Host',
        'New Database',
        'New License',
        'New Option',
        'New Unlisted Running Database',
        'New Host Cpu',
        'Missing Primary Database',
        'Missing Database',
        'Agent Error',
        'No Data',
      ],
      highlightAlertService: false,
      ChartServiceLabels: [
        'Remote Endpoint',
        'Port',
        'Bind IP',
        'Log HTTP Request',
      ],
      highlightChartService: false,
      DataServiceLabels: [
        'Remote Endpoint',
        'Port',
        'Bind IP',
        'Log HTTP Request',
        'Log Inserting Hostdata',
        'Agent Username',
        'Agent Password',
        'Hour Threshold',
        'License Type Metrics Default',
        'License Type Metrics By Environment',
      ],
      highlightDataService: false,
      ResourceFilePathLabels: ['Resource File Path'],
      highlightResourceFilePath: false,
      ThunderServiceLabels: [
        'Remote Endpoint',
        'Port',
        'Bind IP',
        'Log HTTP Request',
        'Crontab',
        'HourThreshold',
        'Run At Startup',
        'Crontab',
        'HourThreshold',
        'Run At Startup',
        'Crontab',
        'HourThreshold',
        'Run At Startup',
      ],
      highlightThunderService: false,
    }
  },
  beforeMount() {
    setTimeout(() => {
      this.bindOriginalApiServiceData()
      this.bindOriginalResourceFilePathData()
      this.bindOriginalAlertServiceData()
      this.bindOriginalChartServiceData()
      this.bindOriginalDataServiceData()
      this.bindOriginalThunderServiceData()
    }, 500)
  },
  methods: {
    ...mapActions(['saveSettings']),
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
    bindOriginalResourceFilePathData() {
      this.ResourceFilePath = this.getResourceFilePath
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
          AlertType: {
            NewHost: this.getAlertService.Emailer.AlertType.NewHost || false,
            NewDatabase:
              this.getAlertService.Emailer.AlertType.NewDatabase || false,
            NewLicense:
              this.getAlertService.Emailer.AlertType.NewLicense || false,
            NewOption:
              this.getAlertService.Emailer.AlertType.NewOption || false,
            NewUnlistedRunningDatabase:
              this.getAlertService.Emailer.AlertType
                .NewUnlistedRunningDatabase || false,
            NewHostCpu:
              this.getAlertService.Emailer.AlertType.NewHostCpu || false,
            MissingPrimaryDatabase:
              this.getAlertService.Emailer.AlertType.MissingPrimaryDatabase ||
              false,
            MissingDatabase:
              this.getAlertService.Emailer.AlertType.MissingDatabase || false,
            AgentError:
              this.getAlertService.Emailer.AlertType.AgentError || false,
            NoData: this.getAlertService.Emailer.AlertType.NoData || false,
          },
        },
      }
    },
    bindOriginalChartServiceData() {
      this.ChartService = {
        RemoteEndpoint: this.getChartService.RemoteEndpoint,
        BindIP: this.getChartService.BindIP,
        Port: this.getChartService.Port,
        LogHTTPRequest: this.getChartService.LogHTTPRequest,
      }
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

      this.LTMBEchanges = []
      _.map(this.getDataService.LicenseTypeMetricsByEnvironment, (v, k) => {
        this.LTMBEchanges.push({
          name: k,
          items: v,
        })
      })
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
    searchByLabels(e) {
      let searchApiService = []
      let searchAlertService = []
      let searchChartService = []
      let searchDataService = []
      let searchResourceFilePath = []
      let searchThunderService = []

      if (e && e.length > 0) {
        searchApiService = this.filterLabels(this.APIServiceLabels, e)
        searchAlertService = this.filterLabels(this.AlertServiceLabels, e)
        searchChartService = this.filterLabels(this.ChartServiceLabels, e)
        searchDataService = this.filterLabels(this.DataServiceLabels, e)
        searchResourceFilePath = this.filterLabels(
          this.ResourceFilePathLabels,
          e
        )
        searchThunderService = this.filterLabels(this.ThunderServiceLabels, e)
      }

      this.highlightApiService = searchApiService.length > 0 ? true : false
      this.highlightAlertService = searchAlertService.length > 0 ? true : false
      this.highlightChartService = searchChartService.length > 0 ? true : false
      this.highlightDataService = searchDataService.length > 0 ? true : false
      this.highlightResourceFilePath =
        searchResourceFilePath.length > 0 ? true : false
      this.highlightThunderService =
        searchThunderService.length > 0 ? true : false

      return {
        searchApiService,
        searchAlertService,
        searchChartService,
        searchDataService,
        searchResourceFilePath,
        searchThunderService,
      }
    },
    filterLabels(service, therm) {
      return service.filter((label) => {
        return label.toLowerCase().includes(therm.toLowerCase())
      })
    },
    settingsWarning() {
      setTimeout(() => {
        this.$buefy.dialog.alert({
          title: 'Settings Warning',
          message:
            'The new configuration will be active <br /> only after an Ercole Server restart!',
          type: 'is-warning',
          hasIcon: true,
          icon: 'circle-exclamation',
          iconPack: 'fa',
          ariaRole: 'alertdialog',
          ariaModal: true,
        })
      }, 500)
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
