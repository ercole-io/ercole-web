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

    <!-- <HostTags /> -->

    <DetailsInfo />

    <div class="columns">
      <div
        class="column"
        :class="{
          'is-8': currentHostType === 'oracle',
          'is-12': currentHostType === 'mysql'
        }"
      >
        <Databases
          v-if="
            currentHostDBs.length > 0 &&
              (currentHostType === 'oracle' || currentHostType === 'mysql')
          "
        />
      </div>
      <div class="column is-4">
        <ChartCpu
          v-show="
            currentHostDBs.length > 0 &&
              currentHostType === 'oracle' &&
              !showDbFilters
          "
        />
        <DatabasesFilters v-show="showDbFilters" />
      </div>
    </div>
  </section>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Notifications from '@/components/hosts/hostDetails/Notifications.vue'
import FileSystems from '@/components/hosts/hostDetails/FileSystems.vue'
import DismissHost from '@/components/hosts/hostDetails/DismissHost.vue'
// import HostTags from '@/components/hosts/hostDetails/HostTags.vue'
import DetailsInfo from '@/components/hosts/hostDetails/DetailsInfo.vue'
import Databases from '@/components/hosts/hostDetails/databases/Databases.vue'
import ChartCpu from '@/components/hosts/hostDetails/ChartCpu.vue'
import DatabasesFilters from '@/components/hosts/hostDetails/databases/DatabasesFilters.vue'

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
    Notifications,
    FileSystems,
    DismissHost,
    // HostTags,
    DetailsInfo,
    Databases,
    ChartCpu,
    DatabasesFilters
  },
  data() {
    return {
      isMounted: false,
      showDbFilters: false
    }
  },
  async beforeMount() {
    await this.getHostByName(this.hostname)
      .then(() => {
        this.SET_ACTIVE_DB(this.dbname)
      })
      .then(() => {
        this.isMounted = true
      })
    bus.$emit('dynamicTitle', this.hostname)
    bus.$on('isDbFiltersOpen', val => {
      this.showDbFilters = val
    })
  },
  methods: {
    ...mapActions(['getHostByName']),
    ...mapMutations(['SET_ACTIVE_DB'])
  },
  computed: {
    ...mapGetters(['currentHostType', 'currentHostDBs'])
  }
}
</script>

<style lang="scss" scoped></style>
