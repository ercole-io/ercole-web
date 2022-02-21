<template>
  <td style="min-width: 0" v-tooltip="options(fileName)">
    <span class="is-block has-text-centered" @click="callAction">
      <b-icon :type="iconSet[0]" :pack="iconSet[1]" :icon="iconSet[2]" />
    </span>
  </td>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { saveAs } from 'file-saver'
import axios from 'axios'
import axiosNoLoading from '@/axios/axios-no-loading.js'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import DownloadingModal from '@/components/common/DownloadingModal.vue'

export default {
  mixins: [TooltipMixin],
  props: {
    fileName: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      required: true,
    },
    iconSet: {
      type: Array,
      required: true,
    },
  },
  methods: {
    callAction() {
      const request = axios.CancelToken.source()
      bus.$on('callCancelExport', () => {
        request.cancel()
      })

      this.$buefy.modal.open({
        component: DownloadingModal,
        hasModalCard: true,
        props: {
          msgTxt: this.$i18n.t('common.general.wait'),
          btText: this.$i18n.t('common.general.cancelRequest'),
          downloadType: `Downloading ${this.fileName}`,
        },
        canCancel: false,
      })

      axiosNoLoading
        .get(this.link, {
          cancelToken: request.token,
          responseType: 'blob',
          onDownloadProgress: (progressEvent) => {
            let currentProgress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            )

            bus.$emit('updateDownloadPerc', currentProgress)
          },
        })
        .then((res) => {
          saveAs(res.data, this.fileName)
        })
        .then(() => {
          bus.$emit('callCloseModal')
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
