import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapMutations } from 'vuex'
import { findLicenseType } from '@/helpers/licenses.js'

export default {
  data() {
    return {
      isIgnoreLicenses: false,
      isReactivateLicenses: false,
      selectedLicenses: [],
    }
  },
  methods: {
    ...mapActions([
      'ignoreDatabaseLicense',
      'ignoreDatabaseLicensesByGroup',
      'getHostByName',
      'getLicensesDatabases',
    ]),
    ...mapMutations([
      'SET_LICENSE_DATABASES_IGNORE_COMMENT',
      'SET_IGNORE_DB_LICENSE',
      'SET_IGNORE_DB_LICENSE_BY_GROUP',
    ]),

    handleSelectedLicenses(data) {
      const index = _.findIndex(
        this.selectedLicenses,
        (license) =>
          license.hostname === data.hostname &&
          license.dbName === data.dbName &&
          license.licenseTypeID === data.licenseTypeID
      )

      if (index > -1) {
        this.selectedLicenses.splice(index, 1)
      } else {
        this.selectedLicenses = [...this.selectedLicenses, data]
      }
    },
    prepareSelectedLicensesToSave() {
      this.selectedLicenses = _.map(this.selectedLicenses, (val) => {
        return {
          database: val.dbName,
          hostname: val.hostname,
          licenseID: val.licenseTypeID,
          status: !val.ignored,
          page: this.$route.name,
          type: findLicenseType(val.description),
          comment: val.ignoredComment,
        }
      })

      this.handleIgnoreClick()
    },
    handleIgnoreClick() {
      const hasSelectedLicenses =
        this.selectedLicenses && this.selectedLicenses.length > 0

      const getMessages = () => {
        if (hasSelectedLicenses) {
          return {
            ignoreMsg: 'Are you sure you want to ignore this licenses group?',
            reactivateMsg:
              'Are you sure you want to reactivate this licenses group?',
          }
        } else {
          const licenseDetails = `${this.licenseID} - ${this.description} - ${this.metric}`
          return {
            ignoreMsg: this.$i18n.t('views.licenses.ignoreDbLicense', {
              license: licenseDetails,
              database: this.db,
              hostname: this.host,
            }),
            reactivateMsg: this.$i18n.t('views.licenses.reactivateDbLicense', {
              license: licenseDetails,
              database: this.db,
              hostname: this.host,
            }),
          }
        }
      }

      const { ignoreMsg, reactivateMsg } = getMessages()

      let dialogType, messageKey, title

      if (hasSelectedLicenses) {
        dialogType = this.isIgnoreLicenses ? 'prompt' : 'confirm'
        messageKey = this.isIgnoreLicenses ? ignoreMsg : reactivateMsg
        title = this.isIgnoreLicenses
          ? 'Ignore Licenses'
          : 'Reactivate Licenses'
      } else {
        dialogType = this.status ? 'prompt' : 'confirm'
        messageKey = this.status ? ignoreMsg : reactivateMsg
        title = this.status ? 'Ignore License' : 'Reactivate License'
      }

      this.showIgnoreDialog(dialogType, messageKey, title)
    },
    showIgnoreDialog(type, message, title) {
      const dialogOptions = {
        title: title,
        message,
        type: 'is-warning',
        hasIcon: true,
        confirmText: this.$i18n.t('common.general.yes'),
        cancelText: this.$i18n.t('common.general.no'),
        focusOn: 'confirm',
        trapFocus: false,
        closeOnConfirm: true,
        onConfirm: (value) => this.confirmIgnoreAction(value),
      }

      if (type === 'prompt') {
        this.$buefy.dialog.prompt({
          ...dialogOptions,
          inputAttrs: {
            placeholder: 'Leave an ignore comment!',
            value: this.ignoreComment,
          },
        })
      } else {
        this.$buefy.dialog.confirm(dialogOptions)
      }
    },
    async confirmIgnoreAction(comment) {
      let data
      if (this.selectedLicenses && this.selectedLicenses.length > 0) {
        data = _.map(this.selectedLicenses, (val) => {
          const getTech = _.includes(val.licenseID, 'ERC') ? 'oracle' : val.type

          return {
            hostname: val.hostname,
            database: val.database,
            licenseID: val.licenseID,
            status: val.status,
            type: this.checkTechnology(getTech),
            comment: val.status ? comment : '',
            page: val.page,
          }
        })
      } else {
        const getTech = _.includes(this.licenseID, 'ERC') ? 'oracle' : this.type

        data = {
          hostname: this.host,
          database: this.db,
          licenseID: this.licenseID,
          status: this.status,
          type: getTech,
          comment: this.status ? comment : '',
          page: this.page,
        }
      }

      await this.onSaveIgnoreLicense(data)
    },
    async onSaveIgnoreLicense(data) {
      if (_.isArray(data)) {
        const organizeData = _.map(data, (val) => {
          return {
            technology: val.type,
            hostname: val.hostname,
            databaseName: val.database,
            licenseTypeID: val.licenseID,
            ignored: val.status,
            ignoredComment: val.comment,
          }
        })

        await this.ignoreDatabaseLicensesByGroup(organizeData).then((res) => {
          if (res.status === 200) {
            if (res.data.updated) {
              if (data[0].page === 'hosts-details') {
                bus.$emit(
                  'host-details-ignore-license-by-group',
                  res.data.updated
                )
              }

              if (data[0].page === 'licenses-used') {
                this.SET_IGNORE_DB_LICENSE_BY_GROUP(res.data.updated)
              }

              this.$buefy.toast.open({
                message: `Successfully Ignored/Reativated Licenses by Group`,
                type: 'is-success',
                duration: 5000,
                position: 'is-bottom',
              })

              this.isIgnoreLicenses = false
              this.isReactivateLicenses = false
              this.selectedLicenses = []
            }

            if (res.data.error) {
              this.$buefy.toast.open({
                message: `Some Licenses could not be Ignored/Reativated`,
                type: 'is-danger',
                duration: 5000,
                position: 'is-top',
              })
            }
          } else {
            this.$buefy.toast.open({
              message: `Something Went Wrong Ignoring/Reativating License by Group!`,
              type: 'is-danger',
              duration: 5000,
              position: 'is-bottom',
            })
          }
        })
      } else {
        await this.ignoreDatabaseLicense(data).then((res) => {
          if (res.status === 200) {
            if (this.page === 'host-details') {
              bus.$emit('host-details-ignore-license', data)
            }

            if (data.page === 'licenses-used') {
              this.SET_IGNORE_DB_LICENSE(data)
            }

            this.$buefy.toast.open({
              message: `Successfully Ignore/Reativate License for ${data.hostname} - ${data.database} - ${data.licenseID}`,
              type: 'is-success',
              duration: 5000,
              position: 'is-bottom',
            })
          } else {
            this.$buefy.toast.open({
              message: `Something Went Wrong Ignoring/Reativating License for ${data.hostname} - ${data.database} - ${data.licenseID}`,
              type: 'is-danger',
              duration: 5000,
              position: 'is-bottom',
            })
          }
        })
      }
    },
    hostDetailsIgnoreLicense(data) {
      const toggleLicense = (item) => {
        const license = _.find(
          this.getLicenses,
          (val) =>
            val.dbName === item.database &&
            val.licenseTypeID === item.licenseID &&
            val.hostname === item.hostname
        )

        if (license) {
          license.ignored = !license.ignored
          license.ignoredComment = item.comment
        }
      }

      toggleLicense(data)
    },
    hostDetailsIgnoreLicenseByGroup(data) {
      const toggleLicense = (item) => {
        const license = _.find(
          this.getLicenses,
          (val) =>
            val.dbName === item.databaseName &&
            val.licenseTypeID === item.licenseTypeID &&
            val.hostname === item.hostname
        )

        if (license) {
          license.ignored = item.ignored
          license.ignoredComment = item.ignoredComment
        }
      }

      _.forEach(data, toggleLicense)
    },
    findLicenseType(desc) {
      return findLicenseType(desc)
    },
    showCheckboxes(status) {
      return (
        (this.isIgnoreLicenses && !status) ||
        (this.isReactivateLicenses && status)
      )
    },
    checkTechnology(val) {
      if (val === 'oracle') return 'Oracle/Database'
      if (val === 'mysql') return 'Oracle/MySQL'
      if (val === 'microsoft') return 'Microsoft/SQLServer'
    },
  },
  computed: {
    showSaveButton() {
      return (
        (this.selectedLicenses.length > 0 && this.isIgnoreLicenses) ||
        (this.selectedLicenses.length > 0 && this.isReactivateLicenses)
      )
    },
    showSaveLabel() {
      return this.isIgnoreLicenses
        ? 'Save Ignore Licenses'
        : 'Save Reactivate Licenses'
    },
  },
  watch: {
    isIgnoreLicenses(val) {
      if (val) {
        this.isReactivateLicenses = false
        this.selectedLicenses = []
      }
    },
    isReactivateLicenses(val) {
      if (val) {
        this.isIgnoreLicenses = false
        this.selectedLicenses = []
      }
    },
  },
}
