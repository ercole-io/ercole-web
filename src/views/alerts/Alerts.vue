<template>
  <ToggleColumns
    getPage="alerts"
    leftButton="Advanced Filters"
    :centerCol="9"
    v-if="isMounted"
  >
    <AlertsFilters slot="left">
      <Loading :isLoading="loadingTableStatus" v-if="firstLoad" />
    </AlertsFilters>

    <AlertsTable slot="center" />
  </ToggleColumns>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import AlertsFilters from '@/components/alerts/Filters.vue'
import AlertsTable from '@/components/alerts/Table.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  name: 'alerts-page',
  components: {
    ToggleColumns,
    AlertsFilters,
    AlertsTable,
    Loading,
  },
  data() {
    return {
      keys: [
        'alertCategory',
        'date',
        'hostname',
        'alertCode',
        'description',
        'alertSeverity',
      ],
      isMounted: false,
      firstLoad: true,
    }
  },
  async beforeMount() {
    this.SET_SORT_ITEM('date')
    await this.getAlertsData()
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getAlertsData']),
    ...mapMutations(['SET_SORT_ITEM']),
  },
  computed: {
    ...mapGetters(['loadingTableStatus']),
  },
}
</script>

<style lang="scss"></style>
