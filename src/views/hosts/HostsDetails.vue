<template>
  <section v-if="isMounted">
    <div class="columns">
      <div class="column is-8">
        <NotificationsInfo />
      </div>
      <div class="column is-2 has-text-right">
        <Filesys />
      </div>
      <div class="column is-2 has-text-right">
        <DismissHost :hostname="hostname" />
      </div>
    </div>

    <!-- <HostTags /> -->

    <HostInfo />

    <div class="columns">
      <Databases :activeDB="dbname" />
      <ChartCpu />
    </div>
  </section>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions } from 'vuex'
import NotificationsInfo from '@/components/hosts/hostDetails/NotificationsInfo.vue'
// import HostTags from '@/components/hosts/hostDetails/HostTags.vue'
import HostInfo from '@/components/hosts/hostDetails/HostInfo.vue'
import ChartCpu from '@/components/hosts/hostDetails/ChartCpu.vue'
import Databases from '@/components/hosts/hostDetails/databases/Databases.vue'
import Filesys from '@/components/hosts/hostDetails/Filesys.vue'
import DismissHost from '@/components/hosts/hostDetails/DismissHost.vue'

export default {
  props: {
    hostname: {
      type: String,
      required: true,
      default: ''
    },
    dbname: {
      type: String,
      required: false,
      default: ''
    }
  },
  components: {
    NotificationsInfo,
    // HostTags,
    HostInfo,
    ChartCpu,
    Databases,
    Filesys,
    DismissHost
  },
  data() {
    return {
      isMounted: false
    }
  },
  async beforeMount() {
    await this.getHostByName(this.hostname)
    bus.$emit('dynamicTitle', this.hostname)

    this.isMounted = true
  },
  methods: {
    ...mapActions(['getHostByName'])
  }
}
</script>

<style lang="scss" scoped></style>
