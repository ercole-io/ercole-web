<template>
  <ToggleColumns
    getPage="oracleAgreements"
    :leftButton="$t('common.forms.advancedFilters')"
    :rightButton="$t('views.licenses.agreeForm')"
    v-if="isMounted"
  >
    <GhostLoading
      v-if="loadingTableStatus"
      :isLoading="loadingTableStatus"
      setHeight="640"
      slot="left"
    />
    <OracleAgreementsFilters v-if="!loadingTableStatus" slot="left" />

    <OracleAgreementsList slot="center" />

    <GhostLoading
      v-if="loadingTableStatus"
      :isLoading="loadingTableStatus"
      setHeight="640"
      slot="right"
    />
    <OracleAgreementsForm v-if="!loadingTableStatus" slot="right" />
  </ToggleColumns>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import OracleAgreementsList from '@/components/licenses/agreement/Oracle/OracleAgreementsList.vue'
import OracleAgreementsForm from '@/components/licenses/agreement/Oracle/OracleAgreementsForm.vue'
import OracleAgreementsFilters from '@/components/licenses/agreement/Oracle/OracleAgreementsFilters.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  components: {
    ToggleColumns,
    OracleAgreementsList,
    OracleAgreementsForm,
    OracleAgreementsFilters,
    GhostLoading,
  },
  data() {
    return {
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getLicensesAgreement('oracle')
    await this.getAgreementParts()
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getLicensesAgreement', 'getAgreementParts']),
  },
  computed: {
    ...mapGetters(['loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
