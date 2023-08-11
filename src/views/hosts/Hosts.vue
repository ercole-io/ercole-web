<template>
  <ToggleColumns
    getPage="hosts"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <HostsFilters slot="left">
      <Loading :isLoading="loadingTableStatus" v-if="firstLoad" />
    </HostsFilters>

    <HostsTable slot="center" />
  </ToggleColumns>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapActions, mapState } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import getHeadKeys from '@/mixins/dynamicHeadingMixin.js'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import HostsTable from '@/components/hosts/hosts/Table.vue'
import HostsFilters from '@/components/hosts/hosts/Filters.vue'
import formatDate from '@/filters/formatDate.js'
import hostsHead from '@/views/hosts/hosts-head.json'
import hostsMoreInfo from '@/views/hosts/hosts-more-info.json'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import Loading from '@/components/common/Loading.vue'

export default {
  name: 'hosts-page',
  mixins: [localFiltersMixin, hostnameLinkRow, getHeadKeys, TooltipMixin],
  components: {
    ToggleColumns,
    HostsTable,
    HostsFilters,
    Loading,
  },
  data() {
    return {
      hostsHead: hostsHead,
      hostsMoreInfo: hostsMoreInfo,
      isMounted: false,
      firstLoad: true,
    }
  },
  async beforeMount() {
    await this.getHosts().then(() => {
      bus.$emit('data', this.getAllHosts)
      this.firstLoad = false
    })
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getHosts']),
    getHostData() {
      this.getHosts()
    },
    formatDate(date) {
      return formatDate(date)
    },
  },
  computed: {
    ...mapGetters(['getAllHosts', 'loadingTableStatus']),
    ...mapState(['moreInfoToggle']),
  },
}
</script>

<style lang="scss"></style>
