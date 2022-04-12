<template>
  <ToggleColumns
    getPage="oracleAgreements"
    :leftButton="$t('common.forms.advancedFilters')"
    :rightButton="$t('views.licenses.agreeForm')"
    v-if="isMounted"
  >
    <OracleContractsFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </OracleContractsFilters>

    <OracleContractsList slot="center" />

    <OracleContractsForm slot="right">
      <Loading :isLoading="loadingTableStatus" />
    </OracleContractsForm>
  </ToggleColumns>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import OracleContractsList from '@/components/licenses/contracts/Oracle/OracleContractsList.vue'
import OracleContractsForm from '@/components/licenses/contracts/Oracle/OracleContractsForm.vue'
import OracleContractsFilters from '@/components/licenses/contracts/Oracle/OracleContractsFilters.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  components: {
    ToggleColumns,
    OracleContractsList,
    OracleContractsForm,
    OracleContractsFilters,
    Loading,
  },
  data() {
    return {
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getLicensesTypes()
    await this.getLicensesContracts('oracle').then(() => {
      bus.$emit('data', this.returnLicensesContracts('oracle'))
    })
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getLicensesContracts', 'getLicensesTypes']),
  },
  computed: {
    ...mapGetters(['returnLicensesContracts', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
