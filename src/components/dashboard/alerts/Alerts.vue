<template>
  <BoxContent :title="$t('dashboard.pageTitle.notificatons')" border>
    <Agents />

    <Alert
      :title="['Licenses', 'dollar-sign']"
      :alertInfo="getFirstAlertByFlag('LICENSE')"
      :alertTotals="getTotalAlertsByFlag('LICENSE')"
    />

    <Alert
      :title="['Ercole Engine', 'tools']"
      :alertInfo="getFirstAlertByFlag('ENGINE')"
      :alertTotals="getTotalAlertsByFlag('ENGINE')"
    />
  </BoxContent>
</template>

<script>
import BoxContent from '@/components/common/BoxContent.vue'
import { mapGetters, mapActions } from 'vuex'
import Agents from '@/components/dashboard/alerts/Agents.vue'
import Alert from '@/components/dashboard/alerts/Alert.vue'

export default {
  components: {
    BoxContent,
    Agents,
    Alert
  },
  async beforeMount() {
    await this.getAlertsData({ status: 'NEW' })
  },
  methods: {
    ...mapActions(['getAlertsData'])
  },
  computed: {
    ...mapGetters(['getFirstAlertByFlag', 'getTotalAlertsByFlag'])
  }
}
</script>

<style lang="scss" scoped></style>
