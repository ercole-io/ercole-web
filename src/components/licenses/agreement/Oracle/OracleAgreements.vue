<template>
  <ShowHideColumn :leftCol="'is-9'" :rightCol="'is-3'">
    <OracleAgreementsList slot="left" />

    <OracleAgreementsForm slot="right" />
  </ShowHideColumn>
</template>

<script>
import { mapActions } from 'vuex'
import ShowHideColumn from '@/components/common/ShowHideColumn.vue'
import OracleAgreementsList from '@/components/licenses/agreement/Oracle/OracleAgreementsList.vue'
import OracleAgreementsForm from '@/components/licenses/agreement/Oracle/OracleAgreementsForm.vue'

export default {
  components: {
    ShowHideColumn,
    OracleAgreementsList,
    OracleAgreementsForm
  },
  async beforeMount() {
    await this.getLicensesAgreement('oracle').then(() => {
      this.getAgreementParts()
    })
  },
  methods: {
    ...mapActions(['getLicensesAgreement', 'getAgreementParts'])
  }
}
</script>

<style lang="scss" scoped></style>
