<template>
  <GhostLoading
    :isLoading="loadingTableStatus"
    setHeight="30"
    setWidth="107"
    class="mr-2"
  >
    <b-button
      v-if="!notCloned"
      label="Clone Host for DR"
      @click="cloneHostVeritasCheck"
      type="is-info"
      icon-pack="fas"
      icon-left="clone"
      size="is-small"
      :disabled="hostAlreadyCloned || justCloned"
    />
  </GhostLoading>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapGetters, mapState } from 'vuex'

import CloneDrVeritasCheck from '@/components/hosts/hostDetails/CloneDrVeritasCheck.vue'
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

  computed: {
    ...mapState(['hostDetails']),
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

    clusterVeritasNodes() {
      return this.hostDetails.clusterVeritasNodes
    },

    selectedVeritasClusterNodes() {
      return _.map(
        this.hostDetails.selectedClusterVeritasNodes,
        (val) => val.name
      )
    },
  },

  methods: {
    ...mapActions(['hostCreateDrData']),

    cloneHostVeritasCheck() {
      this.$buefy.modal.open({
        parent: this,
        component: CloneDrVeritasCheck,
        hasModalCard: true,
        props: {
          data: this.clusterVeritasNodes,
          action: () => this.cloneHost(),
        },
      })
    },

    cloneHost() {
      this.$buefy.dialog.alert({
        title: 'Clone Host',
        message: `
          <p class="has-text-weight-medium">
            Are you sure you want to clone the host
            <span class="has-text-weight-bold">
              ${this.currentHost}
            </span> 
            for Disaster Recovery?
          </p>
          <p class="has-text-weight-medium">
            Selected Veritas Cluster Node to be cloned: 
            ${this.selectedVeritasClusterNodes.join(', ') || 0} 
          </p>
        `,
        type: 'is-info',
        hasIcon: true,
        icon: 'clone',
        iconPack: 'fas',
        onConfirm: () => this.cloneHostAction(),
        canCancel: true,
        cancelText: 'Close',
      })
    },

    async cloneHostAction() {
      try {
        await this.hostCreateDrData(this.selectedVeritasClusterNodes)
        this.justCloned = true

        this.$buefy.dialog.alert({
          title: 'Clone Host',
          message: `
            <p class="has-text-weight-medium">
              This Host <span class="has-text-weight-bold">${this.currentHost}</span> was already cloned.
            </p>
            <p class="has-text-weight-medium">
              If you want to clone this host again, go to
              <span class="has-text-weight-bold">${this.clonedHost}</span> and dismiss it.
            </p>
          `,
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
        if (error.response?.status === 403) {
          this.$buefy.dialog.alert({
            title: 'Clone Host Error',
            message: `
              <p class="has-text-weight-medium">
                This Host was already cloned.
              </p>
            `,
            confirmText: 'OK',
            type: 'is-danger',
          })
        } else {
          console.error('Error cloning host:', error)
        }
      }
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
}
</script>

<style lang="scss" scoped></style>
