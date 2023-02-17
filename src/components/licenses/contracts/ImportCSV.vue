<template>
  <b-button
    type="is-ercole-blue"
    size="is-small"
    icon-left="upload"
    @click="importCsvModal"
    data-import-button
    class="mb-0 has-text-weight-bold"
  >
    {{ importText }}
  </b-button>
</template>

<script>
import { mapActions } from 'vuex'
import ImportCSVmodal from '@/components/licenses/contracts/ImportCSVmodal.vue'

export default {
  props: {
    contractType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isModalActive: false,
    }
  },
  methods: {
    ...mapActions([
      'oracleContractsActions',
      'mysqlContractsActions',
      'microsoftContractsActions',
    ]),
    importCsvModal() {
      let callUpdate = null
      if (this.contractType === 'oracle') {
        callUpdate = this.oracleContractsActions
      } else if (this.contractType === 'mysql') {
        callUpdate = this.mysqlContractsActions
      } else if (this.contractType === 'sqlserver') {
        callUpdate = this.microsoftContractsActions
      }

      this.$buefy.modal.open({
        component: ImportCSVmodal,
        hasModalCard: true,
        props: {
          type: this.contractType,
          updateTable: callUpdate,
        },
        canCancel: false,
      })
    },
  },
  computed: {
    importText() {
      return this.$i18n.t('common.general.importData')
    },
  },
}
</script>

<style lang="scss" scoped></style>
