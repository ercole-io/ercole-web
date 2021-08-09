<template>
  <ToggleColumns
    getPage="oracleAgreements"
    :leftButton="$t('common.forms.advancedFilters')"
    :rightButton="$t('views.licenses.agreeForm')"
    v-if="isMounted"
  >
    <OracleAgreementsFilters slot="left" />
    <OracleAgreementsList slot="center" />
    <OracleAgreementsForm slot="right" />
  </ToggleColumns>
</template>

<script>
import { mapActions } from 'vuex'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import OracleAgreementsList from '@/components/licenses/agreement/Oracle/OracleAgreementsList.vue'
import OracleAgreementsForm from '@/components/licenses/agreement/Oracle/OracleAgreementsForm.vue'
import OracleAgreementsFilters from '@/components/licenses/agreement/Oracle/OracleAgreementsFilters.vue'

export default {
  components: {
    ToggleColumns,
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
