<template>
  <BoxContent :title="$t('dashboard.pageTitle.notificatons')" border padding>
    <Notification>
      <Agents slot="notify" title="Agents" :agents="agents" />
    </Notification>

    <Notification>
      <Licenses slot="notify" title="Licenses" />
    </Notification>

    <Notification>
      <System slot="notify" title="Ercole Engine" />
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
  },
  props: {
    agents: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
