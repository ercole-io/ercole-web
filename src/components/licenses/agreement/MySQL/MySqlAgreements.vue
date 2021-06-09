<template>
  <ToggleColumn :leftCol="9" :rightCol="0" v-if="isMounted">
    <MySqlAgreementsFilters slot="before" class="column is-3" />

    <MySqlAgreementsList slot="left" />

    <MySqlAgreementsForm slot="right" />
  </ToggleColumn>
</template>

<script>
import { mapActions } from 'vuex'
import ToggleColumn from '@/components/common/ToggleColumn.vue'
import MySqlAgreementsList from '@/components/licenses/agreement/MySQL/MySqlAgreementsList.vue'
import MySqlAgreementsForm from '@/components/licenses/agreement/MySQL/MySqlAgreementsForm.vue'
import MySqlAgreementsFilters from '@/components/licenses/agreement/MySQL/MySqlAgreementsFilters.vue'

export default {
  components: {
    ToggleColumn,
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
