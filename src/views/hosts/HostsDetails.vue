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
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Notifications from '@/components/hosts/hostDetails/Notifications.vue'
import FileSystems from '@/components/hosts/hostDetails/FileSystems.vue'
import DismissHost from '@/components/hosts/hostDetails/DismissHost.vue'
import DetailsInfo from '@/components/hosts/hostDetails/DetailsInfo.vue'
import DatabasesMain from '@/components/hosts/hostDetails/DatabasesMain.vue'

export default {
  props: {
    hostname: {
      type: String,
      required: true,
      default: '',
    },
    dbname: {
      type: String,
      required: false,
      default: '',
    },
  },
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
    this.getHostByName(this.hostname)
    this.getLicensesByHostName(this.hostname)
    this.getDbGrantsByHostName(this.hostname)

    this.SET_ACTIVE_DB(this.dbname)

    bus.$emit('dynamicTitle', this.hostname)

    if (this.$route.name === 'hosts-details') {
      this.getHostNames()
    } else if (this.$route.name === 'cluster-details') {
      this.getClusterNames()
    }
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions([
      'getHostByName',
      'getDbGrantsByHostName',
      'getLicensesByHostName',
      'getHostNames',
      'getClusterNames',
    ]),
    ...mapMutations(['SET_ACTIVE_DB', 'SET_HOSTNAMES', 'SET_CLUSTERNAMES']),
  },
  computed: {
    ...mapGetters(['currentHostType']),
  },
}
</script>

<style lang="scss" scoped></style>
