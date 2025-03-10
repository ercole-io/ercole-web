import _ from 'lodash'
import { mapActions, mapGetters, mapState } from 'vuex'

import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import TooltipMixin from '@/mixins/tooltipMixin.js'

import CustomField from '@/components/common/Form/CustomField.vue'
import CustomInput from '@/components/common/Form/CustomInput.vue'
import CustomRadio from '@/components/common/Form/CustomRadio.vue'

import BoxContent from '@/components/common/BoxContent.vue'
import Loading from '@/components/common/Loading.vue'

import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

export default {
  mixins: [HighlightSearchMixin, TooltipMixin],
  components: {
    CustomField,
    CustomInput,
    CustomRadio,
    VueJsonPretty,
    BoxContent,
    Loading,
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
        LocationAlias: null,
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
        OracleDatabasePoliciesAudit: null,
        RoundLicenses: null,
        PGASGASumTargetPercentage: null,
        EnableAwsMenu: null,
        EnableGcpMenu: null,
        EnableOciMenu: null,
        ScopeAsLocation: null,
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
            NewHost: {
              Enable: null,
              To: [],
            },
            NewDatabase: {
              Enable: null,
              To: [],
            },
            NewLicense: {
              Enable: null,
              To: [],
            },
            NewOption: {
              Enable: null,
              To: [],
            },
            NewUnlistedRunningDatabase: {
              Enable: null,
              To: [],
            },
            NewHostCpu: {
              Enable: null,
              To: [],
            },
            MissingPrimaryDatabase: {
              Enable: null,
              To: [],
            },
            MissingDatabase: {
              Enable: null,
              To: [],
            },
            AgentError: {
              Enable: null,
              To: [],
            },
            NoData: {
              Enable: null,
              To: [],
            },
          },
          AlertSeverity: {
            Warning: null,
          },
        },
        AckAlertJob: {
          Crontab: null,
          DueDays: null,
          RunAtStartup: null,
        },
        RemoveAlertJob: {
          Crontab: null,
          DueDays: null,
          RunAtStartup: null,
        },
        ReportAlertJob: {
          Crontab: null,
          RunAtStartup: null,
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
        GcpDataRetrieveJob: {
          AvgCpuPercentage: null,
          AvgCpuUtilizationThreshold: null,
          Crontab: null,
          IopsStoragePercentage: null,
          MaxCpuPercentage: null,
          MaxCpuUtilizationThreshold: null,
          MaxMemPercentage: null,
          MaxMemUtilizationThreshold: null,
          ProjectID: null,
          RunAtStartup: null,
          ThroughputStoragePercentage: null,
        },
      },
      APIServiceLabels: [
        'Remote Endpoint',
        'Port',
        'Bind IP',
        'Log HTTP Request',
        'ReadOnly',
        'Debug Oracle Database Contracts Assignment Algorithm',
        'Location Alias',
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
        'Policy Audit Names to Verify on Databases',
        'Round Decimal Licenses',
        'Threshold Percentage of DB Memory vs Host Memory',
        'Set Licenses Location Scope',
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
        'Enable New Host',
        'Enable New Database',
        'Enable New License',
        'Enable New Option',
        'Enable New Unlisted Running Database',
        'Enable New Host Cpu',
        'Enable Missing Primary Database',
        'Enable Missing Database',
        'Enable Agent Error',
        'Enable No Data',
        'Acknowledge Alerts Crontab',
        'Days Beyond Which to Automatically Acknowledge Alerts',
        'Acknowledge Alerts Older Than',
        'Delete Alerts Crontab',
        'Days Beyond Which to Automatically Delete Alerts',
        'Delete Alerts Older Than',
        'Enable All To',
        'Alert Severity',
        'Report Alert Crontab',
        'Run At Startup',
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
        'Project ID',
        'Average Cpu Percentage',
        'Average Cpu Utilization Threshold',
        'Max Cpu Percentage',
        'Max Cpu Utilization Threshold',
        'Max Memory Percentage',
        'Max Memory Utilization Threshold',
        'Iops Storage Percentage',
        'Throughput Storage Percentage',
        'Show OCI Cloud Advisors on menu?',
        'Show AWS Cloud Advisors on menu?',
        'Show GCP Cloud Advisors on menu?',
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
    }, 1500)
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
        LocationAlias: this.getAPIService.LocationAlias,
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
        OracleDatabasePoliciesAudit:
          this.getAPIService.OracleDatabasePoliciesAudit,
        // never change
        RoundLicenses: this.getAPIService.RoundLicenses,
        PGASGASumTargetPercentage: this.getAPIService.PGASGASumTargetPercentage,
        EnableAwsMenu: this.getAPIService.EnableAwsMenu,
        EnableGcpMenu: this.getAPIService.EnableGcpMenu,
        EnableOciMenu: this.getAPIService.EnableOciMenu,
        ScopeAsLocation: this.getAPIService.ScopeAsLocation,
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
            NewHost: {
              Enable: this.getAlertService.Emailer.AlertType.NewHost.Enable,
              To: this.getAlertService.Emailer.AlertType.NewHost.To,
            },
            NewDatabase: {
              Enable: this.getAlertService.Emailer.AlertType.NewDatabase.Enable,
              To: this.getAlertService.Emailer.AlertType.NewDatabase.To,
            },
            NewLicense: {
              Enable: this.getAlertService.Emailer.AlertType.NewLicense.Enable,
              To: this.getAlertService.Emailer.AlertType.NewLicense.To,
            },
            NewOption: {
              Enable: this.getAlertService.Emailer.AlertType.NewOption.Enable,
              To: this.getAlertService.Emailer.AlertType.NewOption.To,
            },
            NewUnlistedRunningDatabase: {
              Enable:
                this.getAlertService.Emailer.AlertType
                  .NewUnlistedRunningDatabase.Enable,
              To: this.getAlertService.Emailer.AlertType
                .NewUnlistedRunningDatabase.To,
            },
            NewHostCpu: {
              Enable: this.getAlertService.Emailer.AlertType.NewHostCpu.Enable,
              To: this.getAlertService.Emailer.AlertType.NewHostCpu.To,
            },
            MissingPrimaryDatabase: {
              Enable:
                this.getAlertService.Emailer.AlertType.MissingPrimaryDatabase
                  .Enable,
              To: this.getAlertService.Emailer.AlertType.MissingPrimaryDatabase
                .To,
            },
            MissingDatabase: {
              Enable:
                this.getAlertService.Emailer.AlertType.MissingDatabase.Enable,
              To: this.getAlertService.Emailer.AlertType.MissingDatabase.To,
            },
            AgentError: {
              Enable: this.getAlertService.Emailer.AlertType.AgentError.Enable,
              To: this.getAlertService.Emailer.AlertType.AgentError.To,
            },
            NoData: {
              Enable: this.getAlertService.Emailer.AlertType.NoData.Enable,
              To: this.getAlertService.Emailer.AlertType.NoData.To,
            },
          },
          AlertSeverity: {
            Warning: this.getAlertService.Emailer.AlertSeverity.Warning,
          },
        },
        AckAlertJob: {
          Crontab: this.getAlertService.AckAlertJob.Crontab,
          DueDays: this.getAlertService.AckAlertJob.DueDays,
          RunAtStartup: this.getAlertService.AckAlertJob.RunAtStartup,
        },
        RemoveAlertJob: {
          Crontab: this.getAlertService.RemoveAlertJob.Crontab,
          DueDays: this.getAlertService.RemoveAlertJob.DueDays,
          RunAtStartup: this.getAlertService.RemoveAlertJob.RunAtStartup,
        },
        ReportAlertJob: {
          Crontab: this.getAlertService.ReportAlertJob.Crontab,
          RunAtStartup: this.getAlertService.ReportAlertJob.RunAtStartup,
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
        GcpDataRetrieveJob: {
          AvgCpuPercentage:
            this.getThunderService.GcpDataRetrieveJob.AvgCpuPercentage,
          AvgCpuUtilizationThreshold:
            this.getThunderService.GcpDataRetrieveJob
              .AvgCpuUtilizationThreshold,
          Crontab: this.getThunderService.GcpDataRetrieveJob.Crontab,
          IopsStoragePercentage:
            this.getThunderService.GcpDataRetrieveJob.IopsStoragePercentage,
          MaxCpuPercentage:
            this.getThunderService.GcpDataRetrieveJob.MaxCpuPercentage,
          MaxCpuUtilizationThreshold:
            this.getThunderService.GcpDataRetrieveJob
              .MaxCpuUtilizationThreshold,
          MaxMemPercentage:
            this.getThunderService.GcpDataRetrieveJob.MaxMemPercentage,
          MaxMemUtilizationThreshold:
            this.getThunderService.GcpDataRetrieveJob
              .MaxMemUtilizationThreshold,
          ProjectID: this.getThunderService.GcpDataRetrieveJob.ProjectID,
          RunAtStartup: this.getThunderService.GcpDataRetrieveJob.RunAtStartup,
          ThroughputStoragePercentage:
            this.getThunderService.GcpDataRetrieveJob
              .ThroughputStoragePercentage,
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
    roundLicensesOptions() {
      return [
        {
          text: 'for each host',
          val: true,
        },
        {
          text: 'on total count',
          val: false,
        },
      ]
    },
    crontabOptions() {
      return `Available options: </br> @daily </br> @weekly </br> @monthly`
    },
    licensesLocationsOptions() {
      return `To set licenses locations scope </br> use ´comma ( , )´ as separator: </br> loc1, loc2, loc3`
    },
    warningAndCritical() {
      return [
        {
          text: 'warning and critical',
          val: true,
        },
        {
          text: 'critical',
          val: false,
        },
      ]
    },
    enabledOptions() {
      return [
        {
          text: this.$i18n.t('common.forms.yes'),
          val: true,
        },
        {
          text: 'Crontab',
          val: null,
        },
        {
          text: this.$i18n.t('common.forms.no'),
          val: false,
        },
      ]
    },
  },
}
