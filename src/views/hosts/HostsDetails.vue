<template>
  <section v-if="isMounted">
    <div class="columns">
      <div class="column is-8">
        <GhostLoading
          :isLoading="loadingTableStatus"
          setHeight="30"
          setWidth="360"
        >
          <Notifications />
        </GhostLoading>
      </div>

      <div class="column is-4">
        <div class="buttons is-justify-content-flex-end">
          <GhostLoading
            :isLoading="loadingTableStatus"
            setHeight="30"
            setWidth="107"
            class="ml-2"
          >
            <FileSystems />
          </GhostLoading>

          <GhostLoading
            :isLoading="loadingTableStatus"
            setHeight="30"
            setWidth="109"
            class="ml-2"
          >
            <DismissHost />
          </GhostLoading>
        </div>
      </div>
    </div>

    <!-- <HostTags /> -->

    <div class="columns" v-if="loadingTableStatus">
      <div class="column is-one-fifth" v-for="i in 5" :key="i">
        <GhostLoading :isLoading="loadingTableStatus" setHeight="180" />
      </div>
    </div>
    <DetailsInfo v-if="!loadingTableStatus" />

    <div class="columns" v-if="loadingTableStatus">
      <div
        class="column"
        :class="{
          'is-8': currentHostType === 'oracle',
          'is-12': currentHostType === 'mysql',
        }"
      >
        <GhostLoading :isLoading="loadingTableStatus" setHeight="390" />
      </div>
      <div class="column is-4">
        <GhostLoading :isLoading="loadingTableStatus" setHeight="390" />
      </div>
    </div>
    <div class="columns" v-if="!loadingTableStatus && currentHostType">
      <div
        class="column"
        :class="{
          'is-8': currentHostType === 'oracle',
          'is-12': currentHostType === 'mysql',
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
import GhostLoading from '@/components/common/GhostLoading.vue'

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
    // HostTags,
    DetailsInfo,
    Databases,
    ChartCpu,
    DatabasesFilters,
    GhostLoading,
  },
  data() {
    return {
      isMounted: false,
      showDbFilters: false,
    }
  },
  beforeMount() {
    this.getHostByName(this.hostname).then(() => {
      this.SET_ACTIVE_DB(this.dbname)
    })
    this.getAgreementParts()
    this.getLicensesByHostName(this.hostname)

    bus.$emit('dynamicTitle', this.hostname)
    bus.$on('isDbFiltersOpen', (val) => {
      this.showDbFilters = val
    })
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions([
      'getHostByName',
      'getLicensesByHostName',
      'getAgreementParts',
    ]),
    ...mapMutations(['SET_ACTIVE_DB']),
  },
  computed: {
    ...mapGetters(['currentHostType', 'currentHostDBs', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
