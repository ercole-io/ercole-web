<template>
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
</template>

<script>
import ignoreLicensesMixin from '@/mixins/licenses/ignoreLicensesMixin.js'

export default {
  name: 'LicensesUsedDatabasesIgnoreComponent',
  mixins: [ignoreLicensesMixin],
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
