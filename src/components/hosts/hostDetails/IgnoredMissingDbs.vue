<template>
  <b-tag type="is-warning" class="custom-tag py-1 px-2">
    This host has
    <span class="has-text-weight-bold">
      {{ hostDetails.ignoredMissingDBs.length }}
    </span>
    ignored missing Databases

    <b-icon
      class="is-clickable has-text-white has-background-info"
      icon="plus"
      style="vertical-align: middle"
      @click.native="openIgnoreDbsModal"
      v-tooltip="options('Ignore Missing Databases')"
    />
  </b-tag>
</template>

<script>
import { mapState } from 'vuex'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import IgnoreMissingDbModal from '@/components/hosts/hostDetails/IgnoreMissingDbModal.vue'

export default {
  name: 'hosts-details-databases-ignored-missing-dbs-component',
  mixins: [TooltipMixin],
  methods: {
    openIgnoreDbsModal() {
      this.$buefy.modal.open({
        component: IgnoreMissingDbModal,
        hasModalCard: true,
      })
    },
  },
  computed: {
    ...mapState(['hostDetails']),
  },
}
</script>

<style lang="scss" scoped></style>
