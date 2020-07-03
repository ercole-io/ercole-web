<template>
  <div>
    <Agents />

    <Alert
      :title="['Licenses', 'dollar-sign']"
      :alertInfo="getFirstLicenseAlert"
      :alertTotals="getTotalLicensesAlerts"
    />

    <Alert
      :title="['Ercole Engine', 'tools']"
      :alertInfo="getFirstEngineAlert"
      :alertTotals="getTotalEnginesAlerts"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Agents from '@/components/dashboard/alerts/Agents.vue'
import Alert from '@/components/dashboard/alerts/Alert.vue'

export default {
  components: {
    Agents,
    Alert
  },
  async beforeMount() {
    await this.getAlertsData()
  },
  methods: {
    ...mapActions(['getAlertsData'])
  },
  computed: {
    ...mapGetters([
      'getFirstLicenseAlert',
      'getTotalLicensesAlerts',
      'getFirstEngineAlert',
      'getTotalEnginesAlerts'
    ])
  }
}
</script>

<style lang="scss" scoped></style>
