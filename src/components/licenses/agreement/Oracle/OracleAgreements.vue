<template>
  <ToggleColumns
    getPage="oracleAgreements"
    :leftButton="$t('common.forms.advancedFilters')"
    :rightButton="$t('views.licenses.agreeForm')"
    v-if="isMounted"
  >
    <OracleAgreementsFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </OracleAgreementsFilters>

    <OracleAgreementsList slot="center" />

    <OracleAgreementsForm slot="right">
      <Loading :isLoading="loadingTableStatus" />
    </OracleAgreementsForm>
  </ToggleColumns>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import OracleAgreementsList from '@/components/licenses/agreement/Oracle/OracleAgreementsList.vue'
import OracleAgreementsForm from '@/components/licenses/agreement/Oracle/OracleAgreementsForm.vue'
import OracleAgreementsFilters from '@/components/licenses/agreement/Oracle/OracleAgreementsFilters.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  components: {
    ToggleColumns,
    OracleAgreementsList,
    OracleAgreementsForm,
    OracleAgreementsFilters,
    Loading,
  },
  data() {
    return {
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getAgreementParts()
    await this.getLicensesAgreement('oracle').then(() => {
      bus.$emit('data', this.returnLicensesAgreement('oracle'))
    })
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getLicensesAgreement', 'getAgreementParts']),
  },
  computed: {
    ...mapGetters(['returnLicensesAgreement', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
