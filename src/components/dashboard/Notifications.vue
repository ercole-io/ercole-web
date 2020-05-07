<template>
  <BoxContent :title="$t('dashboard.pageTitle.notificatons')">
    <Notification type="agents" title="Agents" :buttons="['inspect']">
    </Notification>

    <Notification type="licenses" title="Licenses" :buttons="['View', 'Close']">
    </Notification>

    <Notification type="system" title="System" :buttons="['View', 'Close']">
    </Notification>
  </BoxContent>
</template>

<script>
import BoxContent from '@/components/common/BoxContent.vue'
import Notification from '@/components/dashboard/Notification.vue'

export default {
  components: {
    BoxContent,
    Notification
  }
}
</script>

<style lang="scss" scoped></style>
