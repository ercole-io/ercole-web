<template>
  <b-button
    type="is-ercole-blue"
    size="is-small"
    icon-left="download"
    @click="exportData()"
    data-export-button
    class="mb-0 has-text-weight-bold"
  >
    {{ exportText }}
  </b-button>
</template>

<script>
import { mapState } from 'vuex'
import DownloadingModal from '@/components/common/DownloadingModal.vue'

export default {
  name: 'commom-exportbutton-component',
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
    api: {
      type: String,
      default: 'baseApi',
    },
    expName: {
      type: String,
      required: true,
    },
    extension: {
      type: String,
      default: 'xlsx',
    },
  },
  methods: {
    exportData() {
      let checkType
      if (this.type === 'LMS') {
        checkType = `${this.$i18n.t('common.general.exportLms')} ${this.$i18n.t(
          'common.general.inProgress'
        )}`
      } else if (this.type === 'LMS-MYSQL') {
        checkType = `${this.$i18n.t(
          'common.general.exportLmsMysql'
        )} ${this.$i18n.t('common.general.inProgress')}`
      } else if (this.type === 'ALL-HOSTS') {
        checkType = `Export All Hosts ${this.$i18n.t(
          'common.general.inProgress'
        )}`
      } else {
        checkType = `${this.$i18n.t(
          'common.general.exportData'
        )} ${this.$i18n.t('common.general.inProgress')}`
      }

      this.$buefy.modal.open({
        component: DownloadingModal,
        hasModalCard: true,
        props: {
          exportType: this.type,
          exportUrl: this.url,
          exportApi: this.api,
          exportName: this.expName,
          exportTitle: checkType,
          exportExtension: this.extension,
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
    exportText() {
      return this.text ? this.text : this.$i18n.t('common.general.exportData')
    },
  },
}
</script>

<style lang="scss" scoped></style>
