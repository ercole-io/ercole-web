<template>
  <b-tag type="is-danger" class="custom-tag mb-1 py-2 px-2">
    This host has
    <span class="has-text-weight-bold">
      {{ hostDetails.isMissingDBs.length }}
    </span>
    missing Databases:
    <span
      v-for="(db, i) in hostDetails.isMissingDBs"
      :key="db"
      class="has-text-weight-bold"
    >
      {{ db }}<span v-if="i !== hostDetails.isMissingDBs.length - 1">,</span>
    </span>
  </b-tag>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'hosts-details-databases-is-missing-dbs-component',
  computed: {
    ...mapState(['hostDetails']),
  },
}
</script>

<style lang="scss" scoped></style>
