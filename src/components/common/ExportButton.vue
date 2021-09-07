<template>
  <b-button
    type="is-primary"
    size="is-small"
    @click="exportData()"
    data-export-button
    class="mb-0"
  >
    {{ exportText }}
  </b-button>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { bus } from '@/helpers/eventBus.js'
import { saveAs } from 'file-saver'
import { mapGetters } from 'vuex'
import axiosNoLoading from '@/axios/axios-no-loading.js'
import DownloadingModal from '@/components/common/DownloadingModal.vue'

const exportAll = {
  Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
}
const exportLms = {
  Accept: 'application/vnd.oracle.lms+vnd.ms-excel.sheet.macroEnabled.12'
}

export default {
  props: {
    text: {
      type: String,
      required: false
    },
    type: {
      type: String,
      default: 'Data'
    },
    url: {
      type: String,
      required: true
    },
    expName: {
      type: String,
      required: true
    }
  },
  methods: {
    exportData() {
      const checkType = this.type && this.type === 'LMS' ? true : false
      const headers = checkType ? exportLms : exportAll
      const extension = checkType ? 'xlsm' : 'xlsx'
      const date = moment().format('YYYYMMDD')

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
          downloadType: checkType
            ? `${this.$i18n.t('common.general.exportLms')} ${this.$i18n.t(
                'common.general.inProgress'
              )}`
            : `${this.$i18n.t('common.general.exportData')} ${this.$i18n.t(
                'common.general.inProgress'
              )}`
        },
        canCancel: false
      })

      const params = {
        'older-than': this.getActiveFilters.date,
        environment: this.getActiveFilters.environment,
        location: this.getActiveFilters.location
      }

      axiosNoLoading
        .get(`/${this.url}`, {
          headers: headers,
          responseType: 'blob',
          cancelToken: request.token,
          params: params
          // onDownloadProgress: progressEvent => {
          // let currentProgress = Math.round(
          //   (progressEvent.loaded * 100) / progressEvent.total
          // )
          // console.log(progressEvent)
          // vm.percentCompleted = currentProgress
          // }
        })
        .then(res => {
          saveAs(res.data, `${this.expName}-${date}.${extension}`)
        })
        .then(() => {
          bus.$emit('callCloseModal')
        })
    }
  },
  computed: {
    ...mapGetters(['getActiveFilters']),
    exportText() {
      return this.text ? this.text : this.$i18n.t('common.general.exportData')
    }
  }
}
</script>

<style lang="scss" scoped></style>
