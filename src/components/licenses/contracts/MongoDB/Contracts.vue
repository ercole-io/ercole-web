<template>
  <ToggleColumns
    getPage="oracleContracts"
    :leftButton="$t('common.forms.advancedFilters')"
    :rightButton="$t('views.licenses.agreeForm')"
  >
    <MongodbContractsFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </MongodbContractsFilters>

    <MongodbContractsList slot="center" />

    <MongodbContractsForm slot="right">
      <Loading :isLoading="loadingTableStatus" />
    </MongodbContractsForm>
  </ToggleColumns>
</template>

<script>
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import MongodbContractsList from '@/components/licenses/contracts/MongoDB/List.vue'
import MongodbContractsForm from '@/components/licenses/contracts/MongoDB/Form.vue'
import MongodbContractsFilters from '@/components/licenses/contracts/MongoDB/Filters.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  name: 'licenses-contracts-mongodb-main-component',
  components: {
    ToggleColumns,
    MongodbContractsList,
    MongodbContractsForm,
    MongodbContractsFilters,
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
