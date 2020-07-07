<template>
  <div>
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
    ...mapGetters(['getFirstAlertByFlag', 'getTotalAlertsByFlag'])
  }
}
</script>

<style lang="scss" scoped></style>
