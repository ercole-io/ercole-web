<template>
  <ToggleColumns
    getPage="mysqlAgreements"
    :leftButton="$t('common.forms.advancedFilters')"
    :rightButton="$t('views.licenses.agreeForm')"
    v-if="isMounted"
  >
    <MySqlAgreementsFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </MySqlAgreementsFilters>

    <MySqlAgreementsList slot="center" />

    <MySqlAgreementsForm slot="right">
      <Loading :isLoading="loadingTableStatus" />
    </MySqlAgreementsForm>
  </ToggleColumns>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import MySqlAgreementsList from '@/components/licenses/agreement/MySQL/MySqlAgreementsList.vue'
import MySqlAgreementsForm from '@/components/licenses/agreement/MySQL/MySqlAgreementsForm.vue'
import MySqlAgreementsFilters from '@/components/licenses/agreement/MySQL/MySqlAgreementsFilters.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  components: {
    ToggleColumns,
    MySqlAgreementsList,
    MySqlAgreementsForm,
    MySqlAgreementsFilters,
    Loading,
  },
  data() {
    return {
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getLicensesAgreement('mysql').then(() => {
      bus.$emit('data', this.returnLicensesAgreement('mysql'))
    })
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getLicensesAgreement']),
  },
  computed: {
    ...mapGetters(['returnLicensesAgreement', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
