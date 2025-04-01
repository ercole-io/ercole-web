<template>
  <GhostLoading
    :isLoading="loadingTableStatus"
    setHeight="30"
    setWidth="107"
    class="mr-2"
  >
    <b-button
      label="Clone Host"
      @click="cloneHost"
      type="is-info"
      icon-pack="fas"
      icon-left="clone"
      size="is-small"
      :disabled="hostAlreadyCloned || justCloned"
      v-if="!notCloned"
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
      justCloned: false,
    }
  },
  methods: {
    ...mapActions(['hostCreateDrData']),

    async cloneHostAction() {
      try {
        await this.hostCreateDrData()
        this.justCloned = true
        this.$buefy.dialog.alert({
          title: 'Clone Host',
          message: `<p class="has-text-weight-medium">This Host <span class="has-text-weight-bold">${this.currentHost}</span> was already cloned.</p>
                    <p class="has-text-weight-medium">If you want to clone this host again, go to <span class="has-text-weight-bold">${this.clonedHost}</span> and dismiss it.</p>`,
          type: 'is-success',
          hasIcon: true,
          icon: 'clone',
          iconPack: 'fas',
          confirmText: `Go to ${this.clonedHost}`,
          onConfirm: this.linkToClonedHost,
          canCancel: true,
          cancelText: 'Close',
        })
      } catch (error) {
        if (error.response && error.response.status === 403) {
          this.$buefy.dialog.alert({
            title: 'Clone Host Error',
            message: `<p class="has-text-weight-medium">This Host was already cloned.</p>`,
            confirmText: 'OK',
            type: 'is-danger',
          })
        } else {
          console.error('Error cloning host:', error)
        }
      }
    },

    cloneHost() {
      this.$buefy.dialog.alert({
        title: 'Clone Host',
        message: `<p class="has-text-weight-medium">Are you sure you want to clone the host <span class="has-text-weight-bold">${this.currentHost}</span>?</p>`,
        type: 'is-info',
        hasIcon: true,
        icon: 'clone',
        iconPack: 'fas',
        onConfirm: this.cloneHostAction,
        canCancel: true,
        cancelText: 'Close',
      })
    },

    linkToClonedHost() {
      this.$router.push({
        name: 'hosts-details',
        params: {
          hostname: this.clonedHost,
        },
      })
    },
  },
  computed: {
    ...mapGetters(['currentHost', 'getHostnames', 'loadingTableStatus']),
    clonedHost() {
      return `${this.currentHost}_DR`
    },
    notCloned() {
      return _.includes(this.currentHost, '_DR')
    },

    hostAlreadyCloned() {
      return _.includes(this.getHostnames, this.clonedHost)
    },
  },
}
</script>

<style lang="scss" scoped></style>
