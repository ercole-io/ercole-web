<template>
  <BoxContent :title="$t('views.dashboard.alerts')" border>
    <Agents />

    <Alert
      :title="[$t('views.dashboard.licenses'), 'dollar-sign']"
      alertCategory="LICENSE"
    />

    <Alert
      :title="[$t('views.dashboard.ercoleEngine'), 'tools']"
      alertCategory="ENGINE"
    />
  </BoxContent>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions } from 'vuex'
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
    await this.getAlertsData({ status: 'NEW' }).then(() => {
      bus.$emit('loadAlertsComplete')
    })
  },
  methods: {
    ...mapActions(['getAlertsData'])
  }
}
</script>

<style lang="scss" scoped></style>
