<template>
  <ToggleColumns
    getPage="mysqlAgreements"
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
    <MySqlAgreementsFilters v-if="!loadingTableStatus" slot="left" />

    <MySqlAgreementsList slot="center" />

    <GhostLoading
      v-if="loadingTableStatus"
      :isLoading="loadingTableStatus"
      setHeight="640"
      slot="right"
    />
    <MySqlAgreementsForm v-if="!loadingTableStatus" slot="right" />
  </ToggleColumns>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import MySqlAgreementsList from '@/components/licenses/agreement/MySQL/MySqlAgreementsList.vue'
import MySqlAgreementsForm from '@/components/licenses/agreement/MySQL/MySqlAgreementsForm.vue'
import MySqlAgreementsFilters from '@/components/licenses/agreement/MySQL/MySqlAgreementsFilters.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  components: {
    ToggleColumns,
    MySqlAgreementsList,
    MySqlAgreementsForm,
    MySqlAgreementsFilters,
    GhostLoading,
  },
  data() {
    return {
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getLicensesAgreement('mysql')
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getLicensesAgreement']),
  },
  computed: {
    ...mapGetters(['loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
