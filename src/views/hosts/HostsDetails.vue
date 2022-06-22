<template>
  <section v-if="isMounted">
    <div class="columns">
      <div class="column is-8">
        <Notifications />
      </div>

      <div class="column is-4">
        <div class="buttons is-justify-content-flex-end">
          <FileSystems />
          <DismissHost />
        </div>
      </div>
    </div>

    <DetailsInfo />

    <DatabasesMain />
  </section>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapMutations } from 'vuex'
import Notifications from '@/components/hosts/hostDetails/Notifications.vue'
import FileSystems from '@/components/hosts/hostDetails/FileSystems.vue'
import DismissHost from '@/components/hosts/hostDetails/DismissHost.vue'
import DetailsInfo from '@/components/hosts/hostDetails/DetailsInfo.vue'
import DatabasesMain from '@/components/hosts/hostDetails/DatabasesMain.vue'

export default {
  props: ['hostname', 'dbname'],
  components: {
    Notifications,
    FileSystems,
    DismissHost,
    DetailsInfo,
    DatabasesMain,
  },
  data() {
    return {
      isMounted: false,
    }
  },
  beforeMount() {
    this.getHostByName({ hostname: this.hostname, loading: true })
    if (this.dbname) {
      this.SET_ACTIVE_DB(this.dbname)
    }

    this.getHostNames()

    bus.$emit('dynamicTitle', this.hostname)
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getHostByName', 'getHostNames']),
    ...mapMutations(['SET_ACTIVE_DB']),
  },
  beforeDestroy() {
    this.SET_ACTIVE_DB('')
  },
}
</script>

<style lang="scss" scoped></style>
