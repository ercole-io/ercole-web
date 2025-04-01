<template>
  <GhostLoading
    :isLoading="loadingTableStatus"
    setHeight="30"
    setWidth="107"
    v-if="!notCloned"
  >
    <b-button
      label="Clone Host"
      @click="cloneHost"
      type="is-info"
      icon-pack="fas"
      icon-left="clone"
      size="is-small"
      class="mr-2"
    />
  </GhostLoading>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  name: 'hosts-details-create-dr-component',
  components: {
    GhostLoading,
  },
  data() {
    return {
      isModalActive: false,
    }
  },
  methods: {
    ...mapActions(['hostCreateDrData']),
    async cloneHost() {
      try {
        await this.hostCreateDrData()
      } catch (error) {
        if (error.response && error.response.status === 403) {
          this.$buefy.dialog.alert({
            title: 'Clone Host',
            message: `<p class="has-text-weight-medium">This Host <span class="has-text-weight-bold">${this.currentHost}</span> was already cloned.</p>
                      <p class="has-text-weight-medium">If you want to clone this host again, go to <span class="has-text-weight-bold">${this.currentHost}-DR</span> and dismiss it.`,
            confirmText: `Go to ${this.currentHost}-DR`,
            onConfirm: this.linkToCLonedHost,
            canCancel: true,
            cancelText: 'Close',
            type: 'is-success',
          })
        }
      }
    },
    linkToCLonedHost() {
      this.$router.push({
        name: 'hosts-details',
        params: {
          hostname: `${this.currentHost}-DR`,
        },
      })
    },
  },
  computed: {
    ...mapGetters(['currentHost', 'loadingTableStatus']),
    notCloned() {
      return _.includes(this.currentHost, '-DR')
    },
  },
}
</script>

<style lang="scss" scoped></style>
