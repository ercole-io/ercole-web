<template>
  <ToggleColumn :leftCol="9" :rightCol="0" v-if="isMounted">
    <OracleAgreementsFilters slot="before" class="column is-3" />

    <OracleAgreementsList slot="left" />

    <OracleAgreementsForm slot="right" />
  </ToggleColumn>
</template>

<script>
import { mapActions } from 'vuex'
import ToggleColumn from '@/components/common/ToggleColumn.vue'
import OracleAgreementsList from '@/components/licenses/agreement/Oracle/OracleAgreementsList.vue'
import OracleAgreementsForm from '@/components/licenses/agreement/Oracle/OracleAgreementsForm.vue'
import OracleAgreementsFilters from '@/components/licenses/agreement/Oracle/OracleAgreementsFilters.vue'

export default {
  components: {
    ToggleColumn,
    OracleAgreementsList,
    OracleAgreementsForm,
    OracleAgreementsFilters
  },
  data() {
    return {
      isMounted: false
    }
  },
  async beforeMount() {
    await this.getLicensesAgreement('oracle')
      .then(() => {
        this.getAgreementParts()
      })
      .then(() => {
        this.isMounted = true
      })
  },
  methods: {
    ...mapActions(['getLicensesAgreement', 'getAgreementParts'])
  }
}
</script>

<style lang="scss" scoped></style>
