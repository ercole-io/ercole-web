<template>
  <ToggleColumns
    getPage="oracleContracts"
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
    await this.oracleContractsActions({ action: 'get', body: null }).then(
      () => {
        bus.$emit('data', this.getOracleContracts)
      }
    )
    await this.oracleLicensesTypes()
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['oracleContractsActions', 'oracleLicensesTypes']),
  },
  computed: {
    ...mapGetters(['getOracleContracts', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
