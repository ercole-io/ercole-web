<template>
  <b-button
    class="ml-2"
    type="is-danger is-small"
    @click="deleteHost(currentHostName)"
    :label="`${$t('views.hostDetails.dismissHost')}`"
    icon-pack="fas"
    icon-left="trash"
  />
</template>

<script>
import axiosDefault from '@/axios/axios-default.js'
import { mapGetters } from 'vuex'

export default {
  methods: {
    deleteHost(hostname) {
      this.$buefy.dialog.confirm({
        title: this.$i18n.t('views.hostDetails.dismissHost'),
        message: this.$i18n.t('views.hostDetails.dismissMsg', {
          hostname: hostname
        }),
        confirmText: this.$i18n.t('common.general.yes'),
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          axiosDefault
            .delete(`/hosts/${hostname}`)
            .then(() => {
              this.$router.push({ name: 'hosts' })
            })
            .then(() => {
              this.$buefy.toast.open({
                message: `The host ${hostname} was successfully dismissed!`,
                type: 'is-success',
                duration: 5000,
                position: 'is-bottom'
              })
            })
        },
        cancelText: this.$i18n.t('common.general.no')
      })
    }
  },
  computed: {
    ...mapGetters(['currentHostName'])
  }
}
</script>

<style lang="scss" scoped></style>
