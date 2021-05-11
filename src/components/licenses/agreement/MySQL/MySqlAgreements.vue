<template>
  <ShowHideColumn :leftCol="6" :rightCol="3" v-if="isMounted">
    <MySqlAgreementsFilters slot="before" class="column is-3" />

    <MySqlAgreementsList slot="left" />

    <MySqlAgreementsForm slot="right" />
  </ShowHideColumn>
</template>

<script>
import { mapActions } from 'vuex'
import ShowHideColumn from '@/components/common/ShowHideColumn.vue'
import MySqlAgreementsList from '@/components/licenses/agreement/MySQL/MySqlAgreementsList.vue'
import MySqlAgreementsForm from '@/components/licenses/agreement/MySQL/MySqlAgreementsForm.vue'
import MySqlAgreementsFilters from '@/components/licenses/agreement/MySQL/MySqlAgreementsFilters.vue'

export default {
  components: {
    ShowHideColumn,
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
