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
import TooltipMixin from '@/mixins/tooltipMixin.js'
import DownloadingModal from '@/components/common/DownloadingModal.vue'
import { mapGetters } from 'vuex'

export default {
  mixins: [TooltipMixin],
  props: {
    fileName: {
      type: String,
      default: '',
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
        bus.$emit('callCloseModal')
      })

      this.$buefy.modal.open({
        component: DownloadingModal,
        hasModalCard: true,
        props: {
          msgTxt: this.$i18n.t('common.general.wait'),
          btText: this.$i18n.t('common.general.cancelRequest'),
          exportTitle: `Downloading ${this.fileName}`,
          exportType: 'download',
        },
        canCancel: false,
      })

      setTimeout(() => {
        axios
          .get(`${this.getRepoServiceBaseUrl}/all/${this.fileName}`, {
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
      }, 1000)
    },
  },
  computed: {
    ...mapGetters(['getRepoServiceBaseUrl']),
  },
}
</script>

<style lang="scss" scoped></style>
