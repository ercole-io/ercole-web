<template>
  <ToggleColumns
    getPage="mysqlContracts"
    :leftButton="$t('common.forms.advancedFilters')"
    :rightButton="$t('views.licenses.agreeForm')"
  >
    <MySqlContractsFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </MySqlContractsFilters>

    <MySqlContractsList slot="center" />

    <MySqlContractsForm slot="right">
      <Loading :isLoading="loadingTableStatus" />
    </MySqlContractsForm>
  </ToggleColumns>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import MySqlContractsList from '@/components/licenses/contracts/MySQL/MySqlContractsList.vue'
import MySqlContractsForm from '@/components/licenses/contracts/MySQL/MySqlContractsForm.vue'
import MySqlContractsFilters from '@/components/licenses/contracts/MySQL/MySqlContractsFilters.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  components: {
    ToggleColumns,
    MySqlContractsList,
    MySqlContractsForm,
    MySqlContractsFilters,
    Loading,
  },
  beforeMount() {
    this.mysqlContractsActions({ action: 'get', body: null }).then(() => {
      bus.$emit('data', this.getMysqlContracts)
    })
    this.mysqlLicensesTypes()
  },
  methods: {
    ...mapActions(['mysqlContractsActions', 'mysqlLicensesTypes']),
  },
  computed: {
    ...mapGetters(['getMysqlContracts', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
