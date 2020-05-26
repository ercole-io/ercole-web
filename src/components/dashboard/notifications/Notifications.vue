<template>
  <BoxContent :title="$t('dashboard.pageTitle.notificatons')" border padding>
    <Notification>
      <Agents slot="notify" title="Agents" />
    </Notification>

    <Notification>
      <Licenses slot="notify" title="Licenses" />
    </Notification>

    <Notification>
      <System slot="notify" title="System" />
    </Notification>
  </BoxContent>
</template>

<script>
import BoxContent from '@/components/common/BoxContent.vue'
import Notification from '@/components/dashboard/notifications/Notification.vue'
import Agents from '@/components/dashboard/notifications/Agents.vue'
import Licenses from '@/components/dashboard/notifications/Licenses.vue'
import System from '@/components/dashboard/notifications/System.vue'

export default {
  components: {
    BoxContent,
    Notification,
    Agents,
    Licenses,
    System
  }
}
</script>

<style lang="scss" scoped></style>
