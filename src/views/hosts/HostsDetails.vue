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

    <CollapseSimple
      :isOpen="false"
      collapseID="capacityByOs"
      collapseTitle="OS Capacity"
    >
      <CapacityByOs
        class="p-5 pb-0"
        :capacityDataOS="hostDetailsCapacityByOs"
        :capacityDailyDataOS="hostDetailsCapacityDailyByOs"
        :hasMax="false"
      />
    </CollapseSimple>

    <DatabasesMain />
  </section>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapMutations, mapGetters } from 'vuex'
import Notifications from '@/components/hosts/hostDetails/Notifications.vue'
import FileSystems from '@/components/hosts/hostDetails/FileSystems.vue'
import DismissHost from '@/components/hosts/hostDetails/DismissHost.vue'
import DetailsInfo from '@/components/hosts/hostDetails/DetailsInfo.vue'
import DatabasesMain from '@/components/hosts/hostDetails/DatabasesMain.vue'
import CollapseSimple from '@/components/common/CollapseSimple.vue'
import CapacityByOs from '@/components/databases/oracle/capacity/CapacityByOS.vue'

export default {
  name: 'host-details-page',
  props: ['hostname', 'dbname'],
  components: {
    Notifications,
    FileSystems,
    DismissHost,
    DetailsInfo,
    DatabasesMain,
    CollapseSimple,
    CapacityByOs,
  },
  data() {
    return {
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getHostByName({ hostname: this.hostname, loading: true }).then(
      () => {
        this.getHostNames()
      }
    )
    if (this.dbname) {
      this.SET_ACTIVE_DB(this.dbname)
    }

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
  computed: {
    ...mapGetters([
      'currentHostType',
      'hostDetailsCapacityByOs',
      'hostDetailsCapacityDailyByOs',
    ]),
  },
}
</script>

<style lang="scss" scoped></style>
