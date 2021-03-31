<template>
  <BoxContent :title="$t('dashboard.pageTitle.notificatons')" border>
    <Agents />

    <Alert
      :title="['Licenses', 'dollar-sign']"
      :alertInfo="getFirstAlertByCategory('LICENSE')"
      :alertTotals="getTotalAlertsByCategory('LICENSE')"
    />

    <Alert
      :title="['Ercole Engine', 'tools']"
      :alertInfo="getFirstAlertByCategory('ENGINE')"
      :alertTotals="getTotalAlertsByCategory('ENGINE')"
    />
  </BoxContent>
</template>

<script>
import { mapGetters } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import Agents from '@/components/dashboard/alerts/Agents.vue'
import Alert from '@/components/dashboard/alerts/Alert.vue'

export default {
  components: {
    BoxContent,
    Agents,
    Alert
  },
  async beforeMount() {
    await this.$store.dispatch('getAlertsData', { status: 'NEW' })
  },
  computed: {
    ...mapGetters(['getFirstAlertByCategory', 'getTotalAlertsByCategory'])
  }
}
</script>

<style lang="scss" scoped></style>
