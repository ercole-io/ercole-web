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
import { mapState } from 'vuex'
// import exportModal from '@/components/common/exportModal.vue'
// import axios from 'axios'
// import moment from 'moment'
// import { bus } from '@/helpers/eventBus.js'
// import { saveAs } from 'file-saver'
import { mapGetters } from 'vuex'
// import axiosNoLoading from '@/axios/axios-no-loading.js'
import DownloadingModal from '@/components/common/DownloadingModal.vue'

export default {
  props: {
    text: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      default: 'Data',
    },
    url: {
      type: String,
      required: true,
    },
    expName: {
      type: String,
      required: true,
    },
  },
  methods: {
    exportData() {
      const checkType =
        this.type === 'LMS'
          ? `${this.$i18n.t('common.general.exportLms')} ${this.$i18n.t(
              'common.general.inProgress'
            )}`
          : `${this.$i18n.t('common.general.exportData')} ${this.$i18n.t(
              'common.general.inProgress'
            )}`

      this.$buefy.modal.open({
        component: DownloadingModal,
        hasModalCard: true,
        props: {
          exportType: this.type,
          exportUrl: this.url,
          exportName: this.expName,
          exportTitle: checkType,
          glFiltersState: this.globalFilters,
          msgTxt: this.$i18n.t('common.general.wait'),
          btText: this.$i18n.t('common.general.cancelRequest'),
        },
        canCancel: false,
      })
    },
  },
  computed: {
    ...mapState(['globalFilters']),
    ...mapGetters(['getActiveFilters']),
    exportText() {
      return this.text ? this.text : this.$i18n.t('common.general.exportData')
    },
    // bindText() {
    //   const params = {
    //     'older-than': this.getActiveFilters.date,
    //     environment: this.getActiveFilters.environment,
    //     location: this.getActiveFilters.location,
    //   }

    //   axiosNoLoading
    //     .get(`/${this.url}`, {
    //       headers: headers,
    //       responseType: 'blob',
    //       cancelToken: request.token,
    //       params: params,
    //       // onDownloadProgress: progressEvent => {
    //       // let currentProgress = Math.round(
    //       //   (progressEvent.loaded * 100) / progressEvent.total
    //       // )
    //       // console.log(progressEvent)
    //       // vm.percentCompleted = currentProgress
    //       // }
    //     })
    //     .then((res) => {
    //       saveAs(res.data, `${this.expName}-${date}.${extension}`)
    //     })
    //     .then(() => {
    //       bus.$emit('callCloseModal')
    //     })
    // },
  },
}
</script>

<style lang="scss" scoped></style>
