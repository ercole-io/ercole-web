<template>
  <section v-if="isMounted">
    <div class="columns">
      <div class="column is-8">
        <NotificationsInfo />
      </div>
      <div class="column is-4">
        <div class="buttons is-justify-content-flex-end">
          <FileSysModal />
          <DismissHost :hostname="hostname" />
        </div>
      </div>
    </div>

    <!-- <HostTags /> -->

    <HostInfo />

    <div class="columns">
      <div
        class="column"
        :class="{
          'is-8': databaseType === 'oracle',
          'is-12': databaseType === 'mysql'
        }"
      >
        <Databases :activeDB="dbname" :dbType="databaseType" />
      </div>
      <div class="column is-4">
        <ChartCpu />
      </div>
    </div>
  </section>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapState } from 'vuex'
import NotificationsInfo from '@/components/hosts/hostDetails/NotificationsInfo.vue'
// import HostTags from '@/components/hosts/hostDetails/HostTags.vue'
import HostInfo from '@/components/hosts/hostDetails/HostInfo.vue'
import ChartCpu from '@/components/hosts/hostDetails/ChartCpu.vue'
import Databases from '@/components/hosts/hostDetails/databases/Databases.vue'
import FileSysModal from '@/components/hosts/hostDetails/FileSysModal.vue'
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
    FileSysModal,
    DismissHost
  },
  data() {
    return {
      isMounted: false
    }
  },
  async beforeMount() {
    await this.getHostByName(this.hostname).then(() => {
      this.isMounted = true
    })
    bus.$emit('dynamicTitle', this.hostname)
  },
  methods: {
    ...mapActions(['getHostByName'])
  },
  computed: {
    ...mapState(['hostDetails']),
    databaseType() {
      return this.hostDetails.hostType
    }
  }
}
</script>

<style lang="scss" scoped></style>
