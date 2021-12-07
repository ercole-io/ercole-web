<template>
  <td class="has-text-centered">
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
  props: ['db', 'host', 'licenseID', 'status', 'page'],
  methods: {
    ...mapActions(['ignoreDatabaseLicense', 'getHostByName']),
    ignoreLicense() {
      if (this.status) {
        this.ignoreLicenseDialog('ignoreDbLicense')
      } else {
        this.ignoreLicenseDialog('reactivateDbLicense')
      }
    },
    ignoreLicenseAction() {
      this.ignoreDatabaseLicense({
        database: this.db,
        hostname: this.host,
        licenseID: this.licenseID,
        status: this.status,
        page: this.page,
      }).then(() => {
        if (this.page === 'host-details') {
          this.getHostByName(this.host)
        }
      })
    },
    ignoreLicenseDialog(message) {
      this.$buefy.dialog.confirm({
        title: this.$i18n.t('views.licenses.ignoreLicense'),
        message: this.$i18n.t(`views.licenses.${message}`, {
          license: this.licenseID,
          database: this.db,
          hostname: this.host,
        }),
        confirmText: this.$i18n.t('common.general.yes'),
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.ignoreLicenseAction(),
        cancelText: this.$i18n.t('common.general.no'),
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
