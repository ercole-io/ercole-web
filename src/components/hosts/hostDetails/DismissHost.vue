<template>
  <b-button
    class="ml-2"
    type="is-danger is-small"
    @click="deleteHost(hostname)"
    label="Dismiss Host"
    icon-pack="fas"
    icon-left="trash"
  />
</template>

<script>
import axiosDefault from '@/axios/axios-default.js'

export default {
  props: {
    hostname: {
      type: String,
      required: true
    }
  },
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
  }
}
</script>

<style lang="scss" scoped></style>
