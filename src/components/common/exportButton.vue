<template>
  <b-button
    type="is-primary"
    size="is-small"
    @click="exportData()"
    data-export-button
    class="mb-0"
  >
    {{ bindText }}
  </b-button>
</template>

<script>
import { mapState } from 'vuex'
import exportModal from '@/components/common/exportModal.vue'

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
      const checkType =
        this.type === 'LMS'
          ? `${this.$i18n.t('common.general.exportLms')} ${this.$i18n.t(
              'common.general.inProgress'
            )}`
          : `${this.$i18n.t('common.general.exportData')} ${this.$i18n.t(
              'common.general.inProgress'
            )}`

      this.$buefy.modal.open({
        component: exportModal,
        hasModalCard: true,
        props: {
          exportType: this.type,
          exportUrl: this.url,
          exportName: this.expName,
          exportTitle: checkType,
          glFiltersState: this.globalFilters,
          msgTxt: this.$i18n.t('common.general.wait'),
          btText: this.$i18n.t('common.general.cancelRequest')
        },
        canCancel: false
      })
    }
  },
  computed: {
    ...mapState(['globalFilters']),
    bindText() {
      return this.text ? this.text : this.$i18n.t('common.general.exportData')
    }
  }
}
</script>

<style lang="scss" scoped></style>
