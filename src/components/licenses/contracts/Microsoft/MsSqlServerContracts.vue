<template>
  <ToggleColumns
    getPage="microsoftContracts"
    :leftButton="$t('common.forms.advancedFilters')"
    :rightButton="$t('views.licenses.agreeForm')"
  >
    <MsSqlServerFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </MsSqlServerFilters>

    <MsSqlServerList slot="center" />

    <MsSqlServerForm slot="right">
      <Loading :isLoading="loadingTableStatus" />
    </MsSqlServerForm>
  </ToggleColumns>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import MsSqlServerList from '@/components/licenses/contracts/Microsoft/MsSqlServerList.vue'
import MsSqlServerForm from '@/components/licenses/contracts/Microsoft/MsSqlServerForm.vue'
import MsSqlServerFilters from '@/components/licenses/contracts/Microsoft/MsSqlServerFilters.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  components: {
    ToggleColumns,
    MsSqlServerList,
    MsSqlServerForm,
    MsSqlServerFilters,
    Loading,
  },
  beforeMount() {
    this.microsoftContractsActions({ action: 'get', body: null }).then(() => {
      bus.$emit('data', this.getMicrosoftContracts)
    })
    this.microsoftLicensesTypes()
  },
  methods: {
    ...mapActions(['microsoftContractsActions', 'microsoftLicensesTypes']),
  },
  computed: {
    ...mapGetters(['getMicrosoftContracts', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
