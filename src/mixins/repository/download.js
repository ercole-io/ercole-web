import { bus } from '@/helpers/eventBus.js'
import { saveAs } from 'file-saver'
import axios from 'axios'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import DownloadingModal from '@/components/common/DownloadingModal.vue'

export default {
  mixins: [TooltipMixin],
  methods: {
    downloadRepo(downloadUrl, fileName) {
      const request = axios.CancelToken.source()
      bus.$on('callCancelExport', () => {
        request.cancel()
        bus.$emit('callCloseModal')
      })

      this.$buefy.modal.open({
        component: DownloadingModal,
        hasModalCard: true,
        props: {
          msgTxt: this.$i18n.t('common.general.wait'),
          btText: this.$i18n.t('common.general.cancelRequest'),
          exportTitle: `Downloading ${fileName}`,
          exportType: 'download',
        },
        canCancel: false,
      })

      setTimeout(() => {
        axios
          .get(downloadUrl, {
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
            saveAs(res.data, fileName)
          })
          .then(() => {
            bus.$emit('callCloseModal')
          })
      }, 1000)
    },
  },
}
