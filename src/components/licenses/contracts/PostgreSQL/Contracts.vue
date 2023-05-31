<template>
  <ToggleColumns
    getPage="oracleContracts"
    :leftButton="$t('common.forms.advancedFilters')"
    :rightButton="$t('views.licenses.agreeForm')"
  >
    <PostgreContractsFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </PostgreContractsFilters>

    <PostgreContractsList slot="center" />

    <PostgreContractsForm slot="right">
      <Loading :isLoading="loadingTableStatus" />
    </PostgreContractsForm>
  </ToggleColumns>
</template>

<script>
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import PostgreContractsList from '@/components/licenses/contracts/PostgreSQL/List.vue'
import PostgreContractsForm from '@/components/licenses/contracts/PostgreSQL/Form.vue'
import PostgreContractsFilters from '@/components/licenses/contracts/PostgreSQL/Filters.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  name: 'licenses-contracts-postgre-main-component',
  components: {
    ToggleColumns,
    PostgreContractsList,
    PostgreContractsForm,
    PostgreContractsFilters,
    Loading,
  },
  data() {
    return {
      loadingTableStatus: false,
    }
  },
}
</script>

<style lang="scss" scoped></style>
