<template>
  <GhostLoading :isLoading="loadingTableStatus" setHeight="30" setWidth="109">
    <b-button
      type="is-danger is-small"
      @click="deleteHost(currentHost)"
      :label="`${$t('views.hostDetails.dismissHost')}`"
      icon-pack="fas"
      icon-left="trash"
    />
  </GhostLoading>
</template>

<script>
import { axiosRequest } from '@/services/services.js'
import { mapActions, mapGetters } from 'vuex'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  name: 'hosts-details-dismisshost-component',
  components: {
    GhostLoading,
  },
  methods: {
    ...mapActions(['getHosts', 'onLoading', 'offLoading']),
    deleteHost(hostname) {
      this.$buefy.dialog.confirm({
        title: this.$i18n.t('views.hostDetails.dismissHost'),
        message: this.$i18n.t('views.hostDetails.dismissMsg', {
          hostname: hostname,
        }),
        confirmText: this.$i18n.t('common.general.yes'),
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.onLoading()
          const config = {
            method: 'delete',
            url: `/hosts/${hostname}`,
          }
          axiosRequest('baseApi', config)
            .then(() => {
              this.getHosts()
            })
            .then(() => {
              this.offLoading()
              this.$router.push({ name: 'hosts' })
            })
            .then(() => {
              this.$buefy.toast.open({
                message: `The host ${hostname} was successfully dismissed!`,
                type: 'is-success',
                duration: 5000,
                position: 'is-bottom',
              })
            })
        },
        cancelText: this.$i18n.t('common.general.no'),
      })
    },
  },
  computed: {
    ...mapGetters(['currentHost', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
