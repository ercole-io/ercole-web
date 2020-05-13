<template>
  <section>
    <Filters />
    <HostsTable />
  </section>
</template>

<script>
import Filters from '@/components/common/Filters.vue'
import HostsTable from '@/components/Hosts/HostsTable.vue'

export default {
  components: {
    Filters,
    HostsTable
  }
}
</script>

<style lang="scss" scoped></style>
