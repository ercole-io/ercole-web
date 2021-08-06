<template>
  <ToggleColumns
    leftButton="Advanced Filters"
    rightButton="Agreement form"
    v-if="isMounted"
  >
    <MySqlAgreementsFilters slot="left" />
    <MySqlAgreementsList slot="center" />
    <MySqlAgreementsForm slot="right" />
  </ToggleColumns>
</template>

<script>
import { mapActions } from 'vuex'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import MySqlAgreementsList from '@/components/licenses/agreement/MySQL/MySqlAgreementsList.vue'
import MySqlAgreementsForm from '@/components/licenses/agreement/MySQL/MySqlAgreementsForm.vue'
import MySqlAgreementsFilters from '@/components/licenses/agreement/MySQL/MySqlAgreementsFilters.vue'

export default {
  components: {
    ToggleColumns,
    MySqlAgreementsList,
    MySqlAgreementsForm,
    MySqlAgreementsFilters
  },
  data() {
    return {
      isMounted: false
    }
  },
  async beforeMount() {
    await this.getLicensesAgreement('mysql').then(() => {
      this.isMounted = true
    })
  },
  methods: {
    ...mapActions(['getLicensesAgreement'])
  }
}
</script>

<style lang="scss" scoped></style>
