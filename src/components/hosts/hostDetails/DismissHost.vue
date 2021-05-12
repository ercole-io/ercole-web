<template>
  <b-button
    class="ml-2"
    type="is-danger is-small"
    @click="deleteHost(currentHostName)"
    label="Dismiss Host"
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
        title: 'Dismissing Host',
        message: `Are you sure you want to <b>dismiss</b> the host <b>${hostname}</b>? This action cannot be undone.`,
        confirmText: 'Dismiss Host',
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
        }
      })
    }
  },
  computed: {
    ...mapGetters(['currentHostName'])
  }
}
</script>

<style lang="scss" scoped></style>
