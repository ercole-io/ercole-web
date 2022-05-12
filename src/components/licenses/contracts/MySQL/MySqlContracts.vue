<template>
  <ToggleColumns
    getPage="mysqlContracts"
    :leftButton="$t('common.forms.advancedFilters')"
    :rightButton="$t('views.licenses.agreeForm')"
    v-if="isMounted"
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
  data() {
    return {
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getLicensesContracts('mysql').then(() => {
      bus.$emit('data', this.returnLicensesContracts('mysql'))
    })
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getLicensesContracts']),
  },
  computed: {
    ...mapGetters(['returnLicensesContracts', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
