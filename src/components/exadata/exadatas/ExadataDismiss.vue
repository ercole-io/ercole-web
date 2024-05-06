<template>
  <GhostLoading
    :isLoading="loadingTableStatus"
    setHeight="30"
    setWidth="109"
    class="ml-2"
  >
    <b-button
      type="is-danger is-small"
      @click="dismissExadata"
      label="Dismiss Exadata"
      icon-pack="fas"
      icon-left="trash"
      style="margin-left: auto"
      class="is-block"
    />
  </GhostLoading>
</template>

<script>
import { axiosRequest } from '@/services/services.js'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  name: 'hosts-details-dismisshost-component',
  props: {
    exadata: {
      type: String,
      required: true,
    },
    rackID: {
      type: String,
      required: true,
    },
  },
  components: {
    GhostLoading,
  },
  methods: {
    ...mapActions([
      'getExadataList',
      'getSelectedExadata',
      'onLoading',
      'offLoading',
    ]),
    ...mapMutations(['SET_EXADATA_LIST']),
    dismissExadata() {
      this.$buefy.dialog.confirm({
        title: this.$i18n.t('views.hostDetails.dismissExadata'),
        message: this.$i18n.t('views.hostDetails.dismissExadataMsg', {
          exadata: this.exadata,
        }),
        confirmText: this.$i18n.t('common.general.yes'),
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.onLoading()
          const config = {
            method: 'patch',
            url: `/exadata/${this.rackID}/hide`,
          }
          axiosRequest('baseApi', config)
            .then(() => {
              this.offLoading()
              this.$buefy.toast.open({
                message: `The Exadata ${this.exadata} was successfully dismissed!`,
                type: 'is-success',
                duration: 5000,
                position: 'is-bottom',
              })
            })
            .then(() => {
              this.$router.go()
            })
        },
        cancelText: this.$i18n.t('common.general.no'),
      })
    },
  },
  computed: {
    ...mapGetters(['loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
