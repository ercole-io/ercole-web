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
// import { mapActions } from 'vuex'

export default {
  props: ['db', 'host', 'licenseID', 'status'],
  methods: {
    // ...mapActions(['ignoreDatabaseLicense']),
    ignoreLicense() {
      console.log(this.db, this.host, this.licenseID, this.status)
      // this.ignoreDatabaseLicense({
      //   database: db,
      //   hostname: host,
      //   licenseID: licenseTypeID,
      //   status: status,
      // })
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
