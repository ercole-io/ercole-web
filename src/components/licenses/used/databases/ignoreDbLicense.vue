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
