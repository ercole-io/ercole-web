<template>
  <ShowHideColumn :leftCol="'is-9'" :rightCol="'is-3'">
    <MySqlAgreementsList slot="left" />

    <MySqlAgreementsForm slot="right" />
  </ShowHideColumn>
</template>

<script>
import { mapActions } from 'vuex'
import ShowHideColumn from '@/components/common/ShowHideColumn.vue'
import MySqlAgreementsList from '@/components/licenses/agreement/MySQL/MySqlAgreementsList.vue'
import MySqlAgreementsForm from '@/components/licenses/agreement/MySQL/MySqlAgreementsForm.vue'

export default {
  components: {
    ShowHideColumn,
    MySqlAgreementsList,
    MySqlAgreementsForm
  },
  async beforeMount() {
    await this.getLicensesAgreement('mysql')
  },
  methods: {
    ...mapActions(['getLicensesAgreement'])
  }
}
</script>

<style lang="scss" scoped></style>
