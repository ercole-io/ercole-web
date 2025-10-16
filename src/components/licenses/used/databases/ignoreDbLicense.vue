<template>
  <td class="has-text-centered p-0">
    <b-button
      type="is-ghost"
      size="is-small"
      class="bt-ignore"
      expanded
      @click="handleIgnoreClick"
    >
      <b-icon
        :icon="status ? 'eye' : 'eye-slash'"
        size="is-small"
        pack="fas"
        :type="status ? 'is-info' : 'is-dark'"
      />
    </b-button>
  </td>
</template>

<script>
import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'LicensesUsedDatabasesIgnoreComponent',
  props: {
    db: String,
    host: String,
    licenseID: String,
    description: String,
    metric: String,
    status: Boolean,
    page: String,
    type: String,
    ignoreComment: String,
  },
  methods: {
    ...mapActions([
      'ignoreDatabaseLicense',
      'getHostByName',
      'getLicensesDatabases',
    ]),
    ...mapMutations([
      'SET_LICENSE_DATABASES_IGNORE_COMMENT',
      'SET_IGNORE_DB_LICENSE',
    ]),
    handleIgnoreClick() {
      const dialogType = this.status ? 'prompt' : 'confirm'
      const messageKey = this.status ? 'ignoreDbLicense' : 'reactivateDbLicense'
      this.showIgnoreDialog(dialogType, messageKey)
    },
    showIgnoreDialog(type, messageKey) {
      const message = this.$i18n.t(`views.licenses.${messageKey}`, {
        license: `${this.licenseID} - ${this.description} - ${this.metric}`,
        database: this.db,
        hostname: this.host,
      })
      const dialogOptions = {
        title: this.$i18n.t('views.licenses.ignoreLicense'),
        message,
        type: 'is-danger',
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
            disabled: !this.status,
          },
        })
      } else {
        this.$buefy.dialog.confirm(dialogOptions)
      }
    },

    async confirmIgnoreAction(comment) {
      const data = {
        database: this.db,
        hostname: this.host,
        licenseID: this.licenseID,
        status: this.status,
        page: this.page,
        type: _.includes(this.licenseID, 'ERC') ? 'oracle' : this.type,
        comment: this.status ? comment : '',
      }

      await this.ignoreDatabaseLicense(data).then((res) => {
        if (res.status === 200) {
          if (this.page === 'host-details') {
            bus.$emit('host-details-ignore-license', data)
            // this.getHostByName({ hostname: this.host, loading: false })
          }

          if (data.page === 'licenses-used') {
            this.SET_IGNORE_DB_LICENSE(data)
            // this.getLicensesDatabases()
          }

          this.$buefy.toast.open({
            message: `Successfully Updated Ignore Comment for ${data.hostname} - ${data.database} - ${data.licenseID}`,
            type: 'is-success',
            duration: 5000,
            position: 'is-bottom',
          })
        } else {
          this.$buefy.toast.open({
            message: `Something Went Wrong Updating Ignore Comment for ${data.hostname} - ${data.database} - ${data.licenseID}`,
            type: 'is-danger',
            duration: 5000,
            position: 'is-bottom',
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.bt-ignore {
  &:focus {
    box-shadow: none;
  }
  &:hover {
    text-decoration: none;
  }
}
</style>
