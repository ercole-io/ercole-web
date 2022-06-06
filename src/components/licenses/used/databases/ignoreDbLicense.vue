<template>
  <td class="has-text-centered p-0">
    <b-button
      type="is-ghost"
      size="is-small"
      class="bt-ignore"
      expanded
      @click="ignoreLicense"
    >
      <b-icon
        :icon="!status ? 'eye-slash' : 'eye'"
        size="is-small"
        pack="fas"
        :type="!status ? 'is-dark' : 'is-info'"
      />
    </b-button>
  </td>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: [
    'db',
    'host',
    'licenseID',
    'description',
    'metric',
    'status',
    'page',
    'type',
    'ignoreComment',
  ],
  methods: {
    ...mapActions([
      'ignoreDatabaseLicense',
      'getHostByName',
      'getLicensesByHostName',
      'getLicensesDatabases',
    ]),
    ignoreLicense() {
      if (this.status) {
        this.ignoreLicenseDialog('ignoreDbLicense')
      } else {
        this.ignoreLicenseDialog('reactivateDbLicense')
      }
    },
    ignoreLicenseDialog(message) {
      this.$buefy.dialog.prompt({
        title: this.$i18n.t('views.licenses.ignoreLicense'),
        message: this.$i18n.t(`views.licenses.${message}`, {
          license: `${this.licenseID} - ${this.description} - ${this.metric}`,
          database: this.db,
          hostname: this.host,
        }),
        inputAttrs: {
          placeholder: 'Leave an ignore comment!',
          value: this.ignoreComment,
          disabled: !this.status ? true : false,
        },
        type: 'is-danger',
        hasIcon: true,
        onConfirm: (value) => this.ignoreLicenseAction(value),
        confirmText: this.$i18n.t('common.general.yes'),
        cancelText: this.$i18n.t('common.general.no'),
      })
    },
    ignoreLicenseAction(message) {
      const data = {
        database: this.db,
        hostname: this.host,
        licenseID: this.licenseID,
        status: this.status,
        page: this.page,
        type: this.type,
        comment: this.status ? message : '',
      }

      this.ignoreDatabaseLicense(data).then(() => {
        if (this.page === 'host-details') {
          this.getHostByName(this.host)
          this.getLicensesByHostName(this.host)
        } else {
          this.getLicensesDatabases()
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
